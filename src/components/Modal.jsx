import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = ({ closeModal, handleChange, song, handleAddSong }) => {
  const { title, artist, thumbnail } = song;
  return (
    <Styles>
      <div className='modal text-white p-12 rounded mx-auto'>
        <h1 className='text-2xl text-center'>Edit Song</h1>
        <img src={thumbnail} alt='Song thumbnail' />

        <div className='flex flex-col py-2'>
          <label>Title</label>
          <input
            name='title'
            onChange={handleChange}
            className=' bg-transparent'
            type='text'
            value={title}
          />
        </div>
        <div className='flex flex-col py-2'>
          <label>Artist</label>
          <input
            onChange={handleChange}
            name='artist'
            className=' bg-transparent'
            type='text'
            value={artist}
          />
        </div>
        <div className='flex flex-col py-2'>
          <label>Thumbnail</label>
          <input
            name='thumbnail'
            onChange={handleChange}
            className=' bg-transparent'
            type='text'
            value={thumbnail}
          />
        </div>
        <div className='py-3'>
          <button
            onClick={closeModal}
            type='button'
            className='  mr-4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded'>
            CANCEL
          </button>
          <button
            onClick={handleAddSong}
            type='submit'
            className='bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-700 hover:border-transparent rounded'>
            ADD
          </button>
        </div>
      </div>
    </Styles>
  );
};

export default Modal;

const Styles = styled.div`
  background: red;
  .modal {
    background: #424242;
    box-shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
    max-width: 600px;
    position: absolute;
    top: 140px;
    left: 30%;
    z-index: 10;
  }

  @media (max-width: 600px) {
    .modal {
      left: 0;
      right: 0;
      top: 70px;
    }
  }
`;
