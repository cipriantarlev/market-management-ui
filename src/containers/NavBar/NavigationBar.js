import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';

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

const NavigationBar = (props) => {

  const { onHandleLogout } = props;

  const onLogout = () => {
    onHandleLogout();
    window.location.reload();
  }

  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <Navbar.Brand><Link className="white hover-mid-gray no-underline" to="/">My Market</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item><Link className="black hover-dark-gray no-underline" to="/users">Users</Link></NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <Button variant="secondary" onClick={onLogout}>Log out</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);