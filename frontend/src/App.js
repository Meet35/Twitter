import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import React from 'react';

import Auth from './components/Auth/Auth';

const App = () => {

  return (
    <HashRouter>
      <Container maxWidth="lg">
      <Route path="/auth" exact component={Auth} />
        {/* <Clock />
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => (
            localStorage.getItem('profile') ? (
              <Home />
            ) : ( */}
              {/* <Redirect to="/auth" /> */}
            {/* )
          )} />
          // <Route path="/auth" exact component={Auth} />
          <Route exact path="/triggers" render={() => (
            localStorage.getItem('profile') ? (
              <DataTrigger />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/view/:symbol" render={() => (
            localStorage.getItem('profile') ? (
              <View />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
          <Route exact path="/about" render={() => (
            <About />
          )} />
          <Route exact path="/contact" render={() => (
            localStorage.getItem('profile') ? (
              <Contact />
            ) : (
              <Redirect to="/auth" />
            )
          )} />
        </Switch>
        <Footer /> */}
      </Container>
    </HashRouter>
  )
};

export default App;