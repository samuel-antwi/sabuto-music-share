import React, { useContext } from 'react';
import styled from 'styled-components';
import { SongContext } from '../context/SongContext';

const SongBanner = () => {
  const { state } = useContext(SongContext);

  return (
    <Styles>
      <div className='container mx-auto'>
        <div className='card p-5 flex flex-wrap items-center'>
          <img
            className='mr-5'
            src={state.song.thumbnail}
            alt='song thumbnail'
          />
          <div className='text-white'>
            <h1 className='text-3xl'>{state.song.title}</h1>
            <h2>{state.song.artist}</h2>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default SongBanner;

const Styles = styled.div`
  background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);

  @media (max-width: 600px) {
    h1 {
      font-size: 1.3rem;
    }
  }
`;
