import React, { useContext } from 'react';
import styled from 'styled-components';
import { SongContext } from '../context/SongContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SongPlayer from './SongPlayer';

const Queue = () => {
  const { state } = useContext(SongContext);

  return (
    <QueueStyles>
      <div className='container mx-auto'>
        {state.queue.length === 0 ? (
          <div className='text-center text-white empty-queue flex justify-content items-center flex-col'>
            <h1 className='text-3xl mb-4'>Your playlist is currently empty</h1>
            <Link className='btn px-5 py-2 rounded bg-teal-600' to='/'>
              Add Songs
            </Link>
          </div>
        ) : (
          <div>
            {state.queue.map((song) => (
              <QueueList key={song.id} song={song} />
            ))}
          </div>
        )}
      </div>
      <SongPlayer />
    </QueueStyles>
  );
};

const QueueList = ({ song }) => {
  const { state, dispatch } = useContext(SongContext);
  const handleAddToQueue = () => {
    const isInQueue = state.queue.find((queue) => queue.id === song.id);
    const newSong = isInQueue
      ? state.queue.filter((queue) => queue.id !== song.id)
      : [...state.queue, song];
    dispatch({
      type: 'ADD_TO_QUEUE',
      payload: { song: newSong },
    });
  };

  const description = (overview) => {
    if (overview?.length > 10) {
      return overview.substring(0, 50) + '...';
    } else {
      return overview;
    }
  };

  return (
    <Styles>
      <div className='song-details text-white flex items-center justify-between px-3'>
        <div className='flex items-center py-2'>
          <img src={song.thumbnail} alt='Avatar' />
          <span className='mx-4'>
            <h1>{description(song.title)}</h1>
            <h1>{song.artist}</h1>
          </span>
        </div>
        <FaTrash
          onClick={handleAddToQueue}
          size='1.5rem'
          className='cursor-pointer text-red-500'
        />
      </div>
    </Styles>
  );
};

export default Queue;

const Styles = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const QueueStyles = styled.div`
  padding-top: 100px;
  .btn {
    border: 1px solid #fff;
  }
`;
