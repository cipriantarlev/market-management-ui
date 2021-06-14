import React from "react";
import Login from '../Login/Login';
import Box from '@material-ui/core/Box';

import Copyright from '../../common/Copyright';

import './App.css';


const App = (props) => {

  return (
    <div>
      <Login />
      <div className="footerCopyright">
        <Box >
          <Copyright />
        </Box>
      </div>
    </div>
  );
}

export default App;
