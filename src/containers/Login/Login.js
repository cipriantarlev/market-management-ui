import React, { useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { useStyles } from './style';

import { handleLogin } from '../actions';

const mapStateToProps = (state) => {
  return {
    isPeding: state.requestLogin.isPeding,
    response: state.requestLogin.response,
    loginError: state.requestLogin.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleLogin: (username, password) => dispatch(handleLogin(username, password))
  }
}

const Login = (props) => {
  const classes = useStyles();

  const {
    onHandleLogin,
    loginError
  } = props;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [credentialsError, setCredentialsError] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSignin = () => {
    if (username && password) {
      console.log(`username ${username} with password ${password}`);
      onHandleLogin(username, password)
      setCredentialsError(false);
      setPassword('');
      setUsername('');
    } else {
      setCredentialsError(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {loginError ? <h2 style={{color: 'red'}}>Incorrect Username or password!!!</h2> : null}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            error={credentialsError}
            helperText="Field must not be empty"
            onChange={handleUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            error={credentialsError}
            helperText="Field must not be empty"
            onChange={handlePassword}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignin}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);