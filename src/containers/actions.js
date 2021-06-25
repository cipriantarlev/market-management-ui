import { 
  authorizationData,
  ROOT_CONTEXT_PATH,
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

export const handleLogin = (username, password) => (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_PENDING});
  fetch(`${ROOT_CONTEXT_PATH}/login`, {
    headers: {'Authorization': `Basic ${window.btoa(username + ':' + password)}`}
  })
  .then(respone => respone.json())
  .then(data => { 
    localStorage.setItem('user', `Basic ${window.btoa(username + ':' + password)}`)
    dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data})
  })
  .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error}))
}

export const handleLogout = () => (dispatch) => {
  dispatch({
    type: REQUEST_LOG_OUT,
    payload: localStorage.removeItem('user')
  })
}

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: REQUEST_USERS_PENDING});
  fetch(`${ROOT_CONTEXT_PATH}/users`, authorizationData())
  .then(response => response.json())
  .then(data => dispatch({ type: REQUEST_USERS_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error}))
}

export const fetchUser = (id) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING});
  fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, authorizationData())
  .then(respone => respone.json())
  .then(data => dispatch({ type: REQUEST_USER_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: REQUEST_USER_FAILED, payload: error }))
}

export const fetchRoles = () => (dispatch) => {
  dispatch({ type: REQUEST_ROLES_PENDING});
  fetch(`${ROOT_CONTEXT_PATH}/roles`, authorizationData())
  .then(respone => respone.json())
  .then(data => dispatch({ type: REQUEST_ROLES_SUCCESS, payload: data}))
  .catch(error => dispatch({ type: REQUEST_ROLES_FAILED, payload: error}))
}
