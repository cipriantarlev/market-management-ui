import {
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOG_OUT,
  REQUEST_USERS_PENDING,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAILED,
  REQUEST_USER_PENDING,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILED,
  REQUEST_ROLES_PENDING,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAILED
} from './constants';

const initialStateLogin = {
  isPeding: false,
  response: {},
  error: false,
  user: localStorage.getItem('user') ? true : false
}

export const requestLogin = (state = initialStateLogin, action = {}) => {
  switch (action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { response: action.payload, isPeding: false, user: localStorage.getItem('user') });
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    default:
      return state;
  }
}

const initialStateLogout = {
  user: localStorage.getItem('user')
}

export const requestLogout = (state = initialStateLogout, action = {}) => {
  switch (action.type) {
    case REQUEST_LOG_OUT:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}

const initialStateUsers = {
  isPeding: false,
  users: [],
  error: false,
  user: {},
  roles: []
}

export const fetchUsers = (state = initialStateUsers, action = {}) => {
  switch (action.type) {
    case REQUEST_USERS_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload, isPeding: false });
    case REQUEST_USERS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case REQUEST_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false })
    case REQUEST_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case REQUEST_ROLES_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.payload, isPeding: false });
    case REQUEST_ROLES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false })
    default:
      return state;
  }
}