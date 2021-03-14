import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { signin } from '../services/firebase';
import { RiErrorWarningFill } from 'react-icons/ri';

const loginBgUrl =
  'https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Styles>
      <div className='login'>
        <div className='overlay'>
          <div className='container mx-auto'>
            <div className='form_container max-w-2xl mx-auto'>
              <div className='form-wrapper'>
                <form onSubmit={handleLogin} className='text-white max-w-lg mx-auto p-5'>
                  <h1 className='mb-3 text-2xl'>Sign In</h1>
                  {error && (
                    <div
                      className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3 flex items-center'
                      role='alert'>
                      <span>
                        <RiErrorWarningFill size='1.5rem' />
                      </span>
                      <span className='block sm:inline'>{error}</span>
                    </div>
                  )}
                  <div className='mb-5'>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full text-black p-3 rounded outline-none'
                      type='text'
                      placeholder='Email address'
                    />
                  </div>
                  <div className='mb-5'>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className='w-full text-black p-3 rounded outline-none'
                      type='password'
                      placeholder='Password'
                    />
                  </div>
                  <button className='bg-teal-900 w-full p-3 rounded' type='submit'>
                    {loading ? 'Login in...' : ' Log In'}
                  </button>
                  <div className='py-5'>
                    <p>
                      Don't have an account yet?
                      <Link className='mx-4 underline' to='/signup'>
                        Sign up now
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default Login;

const Styles = styled.div`
  .login {
    background: url(${loginBgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  .form-wrapper {
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
    border-radius: 10px;
  }

  .form_container {
    display: flex;
    justify-content: center;
    justify-items: center;
    flex-direction: column;
    height: 100vh;
  }
`;
