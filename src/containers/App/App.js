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
import Subcategories from "../Subcategories/Subcategories";
import VatList from "../Vat/VatList";
import MeasuringUnits from '../MeasuringUnits/MeasuringUnits';
import Products from "../Products/Products";
import Product from "../Products/Product";
import DocumentTypes from "../DocumentTypes/DocumentTypes";
import Invoices from "../Invoices/Invoices";
import NotFound from "../NotFound/NotFound";
import Copyright from '../../common/Copyright';
import NavigationBar from '../NavBar/NavigationBar';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.requestLogin.user,
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
        <Route exact path="/subcategories" >
          {loggedIn ? <Subcategories /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/vat" >
          {loggedIn ? <VatList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/measuring-units" >
          {loggedIn ? <MeasuringUnits /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/products" >
          {loggedIn ? <Products /> : <Redirect to="/login" />}
        </Route>
        <Route path="/products/:id" >
          {loggedIn ? <Product /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/document-types" >
          {loggedIn ? <DocumentTypes /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/invoices" >
          {loggedIn ? <Invoices /> : <Redirect to="/login" />}
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
