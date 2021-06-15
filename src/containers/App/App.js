import React from "react";
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';

import Login from '../Login/Login';
import Home from '../Home/Home';
import Copyright from '../../common/Copyright';

import './App.css';

const mapStateToProps = (state) => {
  return {
    userAuthenticationStatus: state.requestLogin.user
  }
}

const App = (props) => {

  const { userAuthenticationStatus } = props;

  console.log('userAuthenticationStatus',userAuthenticationStatus)

  return !userAuthenticationStatus ? 
  (
    <div>
      <Login />
      <div className="footerCopyright">
        <Box >
          <Copyright />
        </Box>
      </div>
    </div> 
  )
  : 
  (
    <div>
      <Home />
      <div className="footerCopyright">
        <Box >
          <Copyright />
        </Box>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
