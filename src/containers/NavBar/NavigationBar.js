import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

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
  let history = useHistory();

  const onLogout = () => {
    onHandleLogout();
    window.location.reload();
  }

  const onClickDropdownList = (event) => {
    switch (event.target.id) {
      case "users":
        history.push("/users");
        break;
      case "myOrganization":
        history.push("/my-organizations");
        break;
      case "vendors":
        history.push("/vendors");
        break;
      case "categories":
        history.push("/categories");
        break;
      case "subcategories":
        history.push("/subcategories");
        break;
      case "vat":
        history.push("/vat");
        break;
      default:
        history.push("/");
        break;
    }
  }

  return (
    <Navbar bg="secondary" variant="dark" expand="lg">
      <Navbar.Brand><Link className="white hover-mid-gray no-underline" to="/">My Market</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Settings" id="basic-nav-dropdown" className="white hover-dark-gray">
            <NavDropdown.Item id="users" onClick={onClickDropdownList}>Users</NavDropdown.Item>
            <NavDropdown.Item id="myOrganization" onClick={onClickDropdownList}>My Organizations</NavDropdown.Item>
            <NavDropdown.Item id="vendors" onClick={onClickDropdownList}>Vendors</NavDropdown.Item>
            <NavDropdown.Item id="categories" onClick={onClickDropdownList}>Categories</NavDropdown.Item>
            <NavDropdown.Item id="subcategories" onClick={onClickDropdownList}>Subcategories</NavDropdown.Item>
            <NavDropdown.Item id="vat" onClick={onClickDropdownList}>VAT Settings</NavDropdown.Item>
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