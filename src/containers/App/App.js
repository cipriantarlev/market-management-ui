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
import Users from '../Users/Users';
import User from '../Users/User';
import MyOrganizations from "../MyOrganizations/MyOrganizations";
import MyOrganization from "../MyOrganizations/MyOrganization";
import Vendors from "../Vendors/Vendors";
import Vendor from "../Vendors/Vendor";
import Categories from "../Categories/Categories";
import Category from '../Categories/Category';
import NotFound from "../NotFound/NotFound";
import Copyright from '../../common/Copyright';
import NavigationBar from '../NavBar/NavigationBar';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.requestLogin.user
  }
}

const App = ({ loggedIn }) => {
  return (
    <Router>
      {loggedIn ? <NavigationBar /> : null}
      <Switch>
        <Route exact path="/" >
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/users" >
          {loggedIn ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/users/:id" >
          {loggedIn ? <User /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/my-organizations" >
          {loggedIn ? <MyOrganizations /> : <Redirect to="/login" />}
        </Route>
        <Route path="/my-organizations/:id" >
          {loggedIn ? <MyOrganization /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/vendors" >
          {loggedIn ? <Vendors /> : <Redirect to="/login" />}
        </Route>
        <Route path="/vendors/:id" >
          {loggedIn ? <Vendor /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/categories" >
          {loggedIn ? <Categories /> : <Redirect to="/login" />}
        </Route>
        <Route path="/categories/:id" >
          {loggedIn ? <Category /> : <Redirect to="/login" />}
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
