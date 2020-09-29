import React from 'react';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Queue from './components/Queue';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/playlist' component={Queue} />
      </Switch>
    </div>
  );
};

export default App;
