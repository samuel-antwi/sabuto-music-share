import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SongContext } from '../context/SongContext';
import { PlayArrow, Save, Pause } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import AOS from 'aos';

AOS.init();

const Song = ({ song }) => {
  const { state, dispatch, queue } = useContext(SongContext);
  const stateSongId = state.song.id;
  const { title, artist, thumbnail, duration, id } = song;
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const currentlyPlaying = state.isPlaying && id === stateSongId;
    setPlay(currentlyPlaying);
  }, [id, stateSongId, state.isPlaying]);

  const handlePlaySong = () => {
    window.scrollTo(0, 0);
    dispatch({
      type: 'RESET_SONG',
      payload: { song },
    });
    dispatch({
      type: state.isPlaying ? 'PAUSE_SONG' : 'PLAY_SONG',
    });
  };

  const handleAddToQueue = () => {
    const isInQueue = state.queue.find((song) => song.id === id);
    const newSong = isInQueue
      ? state.queue.filter((song) => song.id !== id)
      : [...state.queue, song];
    dispatch({
      type: 'ADD_TO_QUEUE',
      payload: { song: newSong },
    });
  };

  return (
    <Styles>
      <div
        data-aos='fade-up'
        data-aos-duration='1000'
        className='song flex items-center justify-between '>
        <div className='flex items-center'>
          <img src={thumbnail} alt='Avatar' />
          <span className='ml-3'>
            <h1>{title}</h1>
            <h1>{artist}</h1>
          </span>
        </div>
        <div className='flex'>
          <IconButton onClick={handlePlaySong} color='primary' size='medium'>
            {play ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton onClick={handleAddToQueue}>
            <Save color='secondary' />
          </IconButton>
        </div>
      </div>
    </Styles>
  );
};

export default Song;

const Styles = styled.div`
  .song {
    background: #424242;
  }
  img {
    width: 100px;
  }

  @media (max-width: 600px) {
    img {
      width: 70px;
    }
  }
`;
