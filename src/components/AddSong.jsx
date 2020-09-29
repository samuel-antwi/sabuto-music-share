import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { ADD_SONG } from '../graphql/mutation';
import { useMutation } from '@apollo/client';
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import ReactPlayer from 'react-player';
import { Button } from '@material-ui/core';
import { AddBoxOutlined } from '@material-ui/icons';

const DEFAULT_SONG = {
  title: '',
  artist: '',
  thumbnail: '',
  duration: 0,
};

const AddSong = () => {
  const [modal, setModal] = useState(false);
  const [addSong] = useMutation(ADD_SONG);
  const [song, setSong] = useState(DEFAULT_SONG);
  const [url, setUrl] = useState('');
  const [playable, setPlayable] = useState(false);

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const isPlayable =
      SoundCloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
    setPlayable(isPlayable);
  }, [url]);

  // Edit song function
  const handleEditSong = async ({ player }) => {
    const nestedPlayer = player.player.player;
    let songData;
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer);
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundCloudInfo(nestedPlayer);
    }
    setSong({ ...songData, url });
  };

  // Get youtube song
  const getYoutubeInfo = (player) => {
    const duration = player.getDuration();
    const { title, video_id, author } = player.getVideoData();
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`;
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    };
  };

  // Get Soundcloud Info
  const getSoundCloudInfo = (player) => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          });
        }
      });
    });
  };

  // Handle song change
  const handleChange = (e) => {
    setSong({
      ...song,
      [e.target.name]: e.target.values,
    });
  };

  // Handle add song
  const handleAddSong = async () => {
    try {
      const { title, artist, thumbnail, duration } = song;
      await addSong({
        variables: {
          url,
          thumbnail,
          duration,
          title,
          artist,
        },
      });
      closeModal();
      setSong(DEFAULT_SONG);
      setUrl('');
    } catch (error) {
      console.log('Error adding song', error);
    }
  };

  return (
    <Styles>
      <div className='container mx-auto p-4 w-full'>
        {modal && (
          <Modal
            handleAddSong={handleAddSong}
            modal={modal}
            closeModal={closeModal}
            song={song}
            setSong={setSong}
            handleChange={handleChange}
          />
        )}
        <div className=' flex'>
          <input
            type='url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className='bg-transparent w-full text-white'
            type='text'
            placeholder='Add Soundcloud or Youtube url'
          />
          <Button
            className='ml-2'
            endIcon={<AddBoxOutlined className='end-icon' />}
            onClick={() => setModal(true)}
            disabled={!playable}
            color='primary'
            variant='contained'>
            ADD
          </Button>
        </div>
        <ReactPlayer url={url} hidden onReady={handleEditSong} />
      </div>
    </Styles>
  );
};

export default AddSong;

const Styles = styled.div`
  input {
    border-bottom: 4px solid teal;
    &:focus {
      outline: none;
    }
  }

  @media (max-width: 600px) {
    .end-icon {
      display: none;
    }
  }
`;
