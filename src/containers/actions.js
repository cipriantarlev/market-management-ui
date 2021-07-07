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
  REQUEST_VENDORS_PENDING,
  REQUEST_VENDORS_SUCCESS,
  REQUEST_VENDORS_FAILED,
  REQUEST_VENDOR_PENDING,
  REQUEST_VENDOR_SUCCESS,
  REQUEST_VENDOR_FAILED,
  CREATE_VENDOR_PENDING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILED,
  UPDATE_VENDOR_PENDING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILED,
  DELETE_VENDOR_PENDING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILED,
  REQUEST_REGIONS_PENDING,
  REQUEST_REGIONS_SUCCESS,
  REQUEST_REGIONS_FAILED,
  REQUEST_CATEGORIES_PENDING,
  REQUEST_CATEGORIES_SUCCESS,
  REQUEST_CATEGORIES_FAILED,
  REQUEST_CATEGORY_PENDING,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILED,
  CREATE_CATEGORY_PENDING,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_PENDING,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  DELETE_CATEGORY_PENDING,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILED,
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

export const fetchVendors = () => (dispatch) => {
  dispatch({ type: REQUEST_VENDORS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_VENDORS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_VENDORS_FAILED, payload: error }))
}

export const fetchVendor = (id) => (dispatch) => {
  dispatch({ type: REQUEST_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_VENDOR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_VENDOR_FAILED, payload: error }))
}

export const createVendor = (vendor) => (dispatch) => {
  dispatch({ type: CREATE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('post', vendor))
    .then(response => response.json())
    .then(data => dispatch({ type: CREATE_VENDOR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: CREATE_VENDOR_FAILED, payload: error }))
}

export const updateVendor = (vendor) => (dispatch) => {
  dispatch({ type: UPDATE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('put', vendor))
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_VENDOR_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UPDATE_VENDOR_FAILED, payload: error }))
}

export const deleteVendor = (id) => (dispatch) => {
  dispatch({ type: DELETE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_VENDOR_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_VENDOR_FAILED, payload: error }))
}

export const fetchRegions = () => (dispatch) => {
  dispatch({ type: REQUEST_REGIONS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/regions`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_REGIONS_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_REGIONS_FAILED, payload: error }))
}

export const fetchCategories = () => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORIES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CATEGORIES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CATEGORIES_FAILED, payload: error }))
}

export const fetchCategory = (id) => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_CATEGORY_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_CATEGORY_FAILED, payload: error }))
}

export const createCategory = (category) => (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('post', category))
    .then(response => response.json())
    .then(data => dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: CREATE_CATEGORY_FAILED, payload: error }))
}

export const updateCategory = (category) => (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('put', category))
    .then(response => response.json())
    .then(data => dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UPDATE_CATEGORY_FAILED, payload: error }))
}

export const deleteCategory = (id) => (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_CATEGORY_FAILED, payload: error }))
}