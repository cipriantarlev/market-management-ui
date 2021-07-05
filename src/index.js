import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import App from './containers/App/App';
import reportWebVitals from './reportWebVitals';

import { 
  requestLogin, 
  requestLogout, 
  fetchUsers, 
  manageMyOrganizations,
  manageVendors
 } from './containers/reducers';
import './index.css';
import 'tachyons';
import 'bootstrap/dist/css/bootstrap.min.css';

const logger = createLogger();
const rootReducer = combineReducers({
  requestLogin, 
  requestLogout, 
  fetchUsers, 
  manageMyOrganizations,
  manageVendors
});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));


ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
