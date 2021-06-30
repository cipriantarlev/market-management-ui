import {
  authorizationData,
  dataApi,
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

export const handleLogin = (username, password) => (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/login`, {
    headers: { 'Authorization': `Basic ${window.btoa(username + ':' + password)}` }
  })
    .then(respone => respone.json())
    .then(data => {
      localStorage.setItem('user', `Basic ${window.btoa(username + ':' + password)}`)
      dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data })
    })
    .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }))
}

export const handleLogout = () => (dispatch) => {
  dispatch({
    type: REQUEST_LOG_OUT,
    payload: localStorage.removeItem('user')
  })
}

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: REQUEST_USERS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_USERS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error }))
}

export const fetchUser = (id) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, authorizationData())
    .then(respone => respone.json())
    .then(data => dispatch({ type: REQUEST_USER_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_USER_FAILED, payload: error }))
}

export const createUser = (user) => (dispatch) => {
  dispatch({ type: CREATE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('post', user))
    .then(respone => respone.json())
    .then(data => dispatch({ type: CREATE_USER_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: CREATE_USER_FAILED, payload: error }))
}

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: UPDATE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('put', user))
    .then(respone => respone.json())
    .then(data => dispatch({ type: UPDATE_USER_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UPDATE_USER_FAILED, payload: error }))
}

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_USER_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_USER_FAILED, payload: error }))
}

export const fetchRoles = () => (dispatch) => {
  dispatch({ type: REQUEST_ROLES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/roles`, authorizationData())
    .then(respone => respone.json())
    .then(data => dispatch({ type: REQUEST_ROLES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_ROLES_FAILED, payload: error }))
}

export const fetchMyOrganizations = () => (dispatch) => {
  dispatch({ type: REQUEST_MY_ORGANIZATIONS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MY_ORGANIZATIONS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_MY_ORGANIZATIONS_FAILED, payload: error }))
}

export const fetchMyOrganization = (id) => (dispatch) => {
  dispatch({ type: REQUEST_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MY_ORGANIZATION_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_MY_ORGANIZATION_FAILED, payload: error }))
}

export const createMyOrganization = (myOrg) => (dispatch) => {
  dispatch({ type: CREATE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, dataApi('post', myOrg))
    .then(respone => respone.json())
    .then(data => dispatch({ type: CREATE_MY_ORGANIZATION_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: CREATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const updateMyOrganization = (myOrg) => (dispatch) => {
  dispatch({ type: UPDATE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, dataApi('put', myOrg))
    .then(respone => respone.json())
    .then(data => dispatch({ type: UPDATE_MY_ORGANIZATION_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UPDATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const deleteMyOrganization = (id) => (dispatch) => {
  dispatch({ type: DELETE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_MY_ORGANIZATION_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_MY_ORGANIZATION_FAILED, payload: error }))
}

