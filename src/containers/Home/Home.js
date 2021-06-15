import React from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions';

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

  return(
    <div>
      Home
      <button onClick={onLogout}>Log out</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);