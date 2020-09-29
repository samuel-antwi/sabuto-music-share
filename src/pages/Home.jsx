import React, { useContext } from 'react';
import styled from 'styled-components';
import SongBanner from '../components/SongBanner';
import SongPlayer from '../components/SongPlayer';
import AddSong from '../components/AddSong';
import SongList from '../components/SongList';
import { UserAuthContext } from '../context/UserAuthContext';
import Login from './Login';

const Home = () => {
  const { user } = useContext(UserAuthContext);

  if (!user) {
    return <Login />;
  }

  return (
    <Styles>
      <div className='home'>
        <AddSong />
        <SongBanner />
        <SongList />
        <SongPlayer />
      </div>
    </Styles>
  );
};

export default Home;

const Styles = styled.div`
  padding-top: 100px;
`;
