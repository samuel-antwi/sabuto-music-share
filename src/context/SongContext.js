import React, { createContext, useReducer, useEffect, useState } from 'react';
import { useSubscription } from '@apollo/client';
import { GET_SONGS } from '../graphql/subscriptions';
import songReducer from './songReducer';

const initialState = {
  queue: [],
  isPlaying: false,
  song: {
    id: '3397e9dc-6590-4c67-8dab-d4b3aaec62b4',
    title: 'VOSSI BOP',
    artist: 'STORMZY',
    thumbnail: 'https://img.youtube.com/vi/9ClYy0MxsU0/0.jpg',
    url: 'https://www.youtube.com/watch?v=9ClYy0MxsU0',
    duration: 205,
  },
};

export const SongContext = createContext();

const SongContextProvider = ({ children }) => {
  const { data, loading, error } = useSubscription(GET_SONGS);
  const [state, dispatch] = useReducer(songReducer, initialState);

  useEffect(() => {
    localStorage.setItem('queueSongs', JSON.stringify(state.queue));
  }, [state.queue]);

  return (
    <SongContext.Provider value={{ state, dispatch, data, loading, error }}>
      {children}
    </SongContext.Provider>
  );
};

export default SongContextProvider;
