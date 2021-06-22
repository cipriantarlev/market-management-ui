import React from "react";
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
  BrowserRouter as Router,

  Redirect,

  Route,
  Switch
} from 'react-router-dom';

import Login from '../Login/Login';
import Home from '../Home/Home';
import NotFound from "../NotFound/NotFound";
import Copyright from '../../common/Copyright';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.requestLogin.user
  }
}

const App = (props) => {

  const { loggedIn } = props;

  console.log('loggedIn ', loggedIn)

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {!loggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Box style={{
        position: "fixed",
        bottom: "20px",
        left: 0,
        right: 0
      }}>
        <Copyright />
      </Box>
    </Router>
  )
}

export default connect(mapStateToProps)(App);
