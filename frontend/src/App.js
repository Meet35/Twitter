import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import React from 'react';

import Auth from './components/Auth/Auth';
import Tweet from './components/Tweet/Tweet';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';

const App = () => {

  return (
    // <HashRouter>
    <BrowserRouter>
      <Container maxWidth="lg">
      {/* <Route path="/auth" exact component={Auth} />
      <Route path="/tweet" exact component={Tweet} />
      <Route path="/" exact component={Home} />
      <Route exact path="/profile/:userid" render={() => (
              <Profile />
          )} /> */}
      
        {/* {/* <Clock /> */}
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => (
            localStorage.getItem('profile') ? (
              <Home />
            ) : 
              <Redirect to="/auth" /> 
           )}
          />
          <Route path="/auth" exact component={Auth} />
          <Route exact path="/tweet" render={() => (
            localStorage.getItem('profile') ? (
              <Tweet />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/profile/:userid" render={() => (
            localStorage.getItem('/profile/:userid') ? (
              <View />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          
          
        </Switch>
      </Container>
      </BrowserRouter>
  )
};

export default App;