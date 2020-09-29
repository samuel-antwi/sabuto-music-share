import React from 'react';
import styled from 'styled-components';
import { Slider } from '@material-ui/core';
import {
  MdPlayArrow,
  MdPause,
  MdSkipNext,
  MdSkipPrevious,
} from 'react-icons/md';
import { SongContext } from '../context/SongContext';
import ReactPlayer from 'react-player';

const SongPlayer = () => {
  const reactPlayerRef = React.useRef();
  const { state, dispatch } = React.useContext(SongContext);
  const [played, setPlayed] = React.useState(0);
  const [playedSeconds, setPlayedSeconds] = React.useState(0);
  const [seeking, setSeeking] = React.useState(false);
  const [positionInQueue, setPositionInQueue] = React.useState(0);
  const { song } = state;

  React.useEffect(() => {
    const songIndex = state.queue.findIndex(
      (song) => song.id === state.song.id
    );
    setPositionInQueue(songIndex);
  }, [state.queue, state.song.id]);

  React.useEffect(() => {
    const nextSong = state.queue[positionInQueue + 1];
    if (played >= 0.99 && nextSong) {
      setPlayed(0);
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } });
    }
  }, [state.queue, played, dispatch, positionInQueue]);

  function handlePlayNextSong() {
    const nextSong = state.queue[positionInQueue + 1];
    if (nextSong) {
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } });
    }
  }

  function handlePlayPrevSong() {
    const prevSong = state.queue[positionInQueue - 1];
    if (prevSong) {
      dispatch({ type: 'SET_SONG', payload: { song: prevSong } });
    }
  }

  const handlePlaySong = () => {
    dispatch({
      type: state.isPlaying ? 'PAUSE_SONG' : 'PLAY_SONG',
    });
  };

  const handleProgressChange = (event, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = () => {
    setSeeking(false);
    reactPlayerRef.current.seekTo(played);
  };

  const formatDuration = (seconds) => {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  };

  return (
    <Styles>
      <div className='song-player w-full text-white'>
        <div className='container mx-5'>
          <div className='grid-container grid grid-cols-2'>
            <div className='song-details flex p-4'>
              <img
                className='object-cover mr-5'
                src={song.thumbnail}
                alt='avatar'
              />
              <div>
                <h1 className='title'>{song.title}</h1>
                <p className='artist'>{song.artist}</p>
              </div>
            </div>
            <div className='w-full'>
              <div className='controls flex items-center justify-center'>
                <button onClick={handlePlayPrevSong}>
                  <MdSkipPrevious size='2.5rem' />
                </button>
                <button onClick={handlePlaySong}>
                  {state.isPlaying ? (
                    <MdPause size='2.5rem' />
                  ) : (
                    <MdPlayArrow size='2.5rem' />
                  )}
                </button>
                <button onClick={handlePlayNextSong}>
                  <MdSkipNext size='2.5rem' />
                </button>
                <span>{formatDuration(playedSeconds)}</span>
              </div>
              <Slider
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                onChange={handleProgressChange}
                value={played}
                type='range'
                min={0}
                max={1}
                step={0.01}
              />
            </div>
            <ReactPlayer
              ref={reactPlayerRef}
              onProgress={({ played, playedSeconds }) => {
                if (!seeking) {
                  setPlayed(played);
                  setPlayedSeconds(playedSeconds);
                }
              }}
              url={state.song.url}
              playing={state.isPlaying}
              hidden
            />
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default SongPlayer;

const Styles = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  .song-player {
    background: #282828;
  }
  .song-details {
    img {
      width: 100px;
    }
  }
  .controls > * {
    margin: 10px;
    cursor: pointer;
  }

  .title {
    font-size: 1.4rem;
  }

  .artist {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
    .title {
      font-size: 16px;
    }
  }
  @media (max-width: 500px) {
    .song-details {
      display: none;
    }
  }
`;
