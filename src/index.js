import React from 'react';
import ReactDOM from 'react-dom';
import 'aos/dist/aos.css';
import './assets/main.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import SongContextProvider from './context/SongContext';
import UserAuthContextProvider from './context/UserAuthContext';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <SongContextProvider>
          <UserAuthContextProvider>
            <App />
          </UserAuthContextProvider>
        </SongContextProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
