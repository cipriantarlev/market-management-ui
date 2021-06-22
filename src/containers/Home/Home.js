import React from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions';

import Button from '@material-ui/core/Button';

const mapStateToProps = (state) => {
  return {
    user: state.requestLogout.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHandleLogout: () => dispatch(handleLogout())
  }
}

const Home = (props) => {

  const { onHandleLogout } = props;

  const onLogout = () => {
    onHandleLogout();
    window.location.reload();
  }
  return (
    <div>
      Home
      <Button
        variant="contained"
        color="primary"
        onClick={onLogout}
      >
        Log out
      </Button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);