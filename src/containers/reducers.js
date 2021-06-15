import { 
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOG_OUT
} from './constants';

const initialStateLogin = {
  isPeding: false,
  response: {},
  error: {},
  user: localStorage.getItem('user')
}

export const requestLogin = (state = initialStateLogin, action = {}) => {
  switch(action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { response: action.payload, isPeding: false, user: localStorage.getItem('user')});
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false});
    default:
      return state;
  }
}

const initialStateLogout = {
  user: localStorage.getItem('user')
}

export const requestLogout = (state = initialStateLogout, action = {}) => {
  switch(action.type) {
    case REQUEST_LOG_OUT:
      return Object.assign({}, state, { user: action.payload});
    default:
      return state;
  }
}