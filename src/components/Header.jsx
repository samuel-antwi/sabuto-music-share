import React, { useContext } from 'react';
import { BiHeadphone } from 'react-icons/bi';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserAuthContext } from '../context/UserAuthContext';
import { signOut } from '../services/firebase';
import { SongContext } from '../context/SongContext';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';

const Header = () => {
  const { user } = useContext(UserAuthContext);
  const { state } = useContext(SongContext);
  const [sideNav, setSideNav] = React.useState(false);

  const toggleSideNav = () => {
    setSideNav((prevNav) => !prevNav);
  };
  return (
    <Styles>
      <nav className='text-white bg-purple-700 flex items-center p-5 justify-between'>
        <Link to='/' className='logo flex items-center'>
          <BiHeadphone size='1.6rem' className='mr-3' />
          <div>
            <span className='uppercase font-bold'>Sabuto</span> Music Share
          </div>
        </Link>
        <div className='flex items-center'>
          <div className='flex right-nav items-center'>
            {user && <Link to='playlist'>Playlist ({state.queue.length})</Link>}
            {user && (
              <div className='flex items-center'>
                <FaUser className='mr-1' />
                {user.displayName}
              </div>
            )}
            {!user && <Link to='/login'>Login</Link>}
            {user && (
              <Link onClick={signOut} to='/'>
                Log Out
              </Link>
            )}
          </div>
          <div className='cursor-pointer menu-control' onClick={toggleSideNav}>
            {sideNav ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
        {/* Side nav links */}
        <div
          onClick={toggleSideNav}
          style={{ left: sideNav ? '0' : null }}
          className='side-nav'>
          <div className=' side-nav-links items-center'>
            {user && <Link to='playlist'>Playlist ({state.queue.length})</Link>}
            {user && (
              <div className='flex items-center my-3'>
                <FaUser className='mr-1' />
                {user.displayName}
              </div>
            )}
            {!user && <Link to='/login'>Login</Link>}
            {user && (
              <Link onClick={signOut} to='/'>
                Log Out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </Styles>
  );
};

export default Header;

const Styles = styled.div`
  nav {
    position: fixed;
    width: 100%;
    z-index: 2;
  }
  .right-nav > * {
    margin: 0 20px;
  }
  .hidden {
    display: none;
  }

  .side-nav {
    position: absolute;
    left: -300px;
    top: 65px;
    background: #6c47c0;
    height: 100vh;
    width: 300px;
    padding: 30px;
    transition: all 0.4s ease-in-out;
  }

  @media (max-width: 768px) {
    .right-nav {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .side-nav,
    .menu-control {
      display: none;
    }
  }
`;
