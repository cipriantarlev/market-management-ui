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
  REQUEST_ROLES_FAILED,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
  REQUEST_MY_ORGANIZATIONS_PENDING,
  REQUEST_MY_ORGANIZATIONS_SUCCESS,
  REQUEST_MY_ORGANIZATIONS_FAILED,
  REQUEST_MY_ORGANIZATION_PENDING,
  REQUEST_MY_ORGANIZATION_SUCCESS,
  REQUEST_MY_ORGANIZATION_FAILED,
  CREATE_MY_ORGANIZATION_PENDING,
  CREATE_MY_ORGANIZATION_SUCCESS,
  CREATE_MY_ORGANIZATION_FAILED,
  UPDATE_MY_ORGANIZATION_PENDING,
  UPDATE_MY_ORGANIZATION_SUCCESS,
  UPDATE_MY_ORGANIZATION_FAILED,
  DELETE_MY_ORGANIZATION_PENDING,
  DELETE_MY_ORGANIZATION_SUCCESS,
  DELETE_MY_ORGANIZATION_FAILED,
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
  roles: [],
  status: ''
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
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case REQUEST_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case REQUEST_ROLES_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.payload, isPeding: false });
    case REQUEST_ROLES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case CREATE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case CREATE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case UPDATE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case UPDATE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case DELETE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPeding: false });
    case DELETE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    default:
      return state;
  }
}

const initialStateMyOrganizations = {
  isPending: false,
  myOrganizations: [],
  error: false,
  myOrganization: {},
  status: ''
}

export const manageMyOrganizations = (state = initialStateMyOrganizations, action = {}) => {
  switch (action.type) {
    case REQUEST_MY_ORGANIZATIONS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MY_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, { myOrganizations: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATIONS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case CREATE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case UPDATE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  }
}