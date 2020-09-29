import React, { useContext } from 'react';
import styled from 'styled-components';
import Song from './Song';
import { SongContext } from '../context/SongContext';

const SongList = () => {
  const { data, error, loading } = useContext(SongContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching songs</div>;
  }
  return (
    <Styles className='text-white px-4'>
      <div className='container mx-auto'>
        <div className='grid-container'>
          <div className='song-list'>
            {data.songs.map((song, index) => (
              <Song key={index} song={song} />
            ))}
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default SongList;

const Styles = styled.div`
  .grid-container {
    display: grid;
    /* grid-template-columns: 2fr 1fr; */
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .song-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
  }
`;
