export const ROOT_CONTEXT_PATH = 'http://localhost:8080/api'
export const authorizationData = () => {
  return {headers: {'Authorization': localStorage.getItem('user')}}
}

export const dataApi = (method, data) => {
  if(method === 'delete') {
    return {
      method: method,
      headers: {
        'Authorization': localStorage.getItem('user')
      }
    }
  } else {
    return {
      method: method,
      headers: {
        'Authorization': localStorage.getItem('user'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }
}

export const REQUEST_LOGIN_PENDING = 'REQUEST_LOGIN_PENDING';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILED = 'REQUEST_LOGIN_FAILED';

export const REQUEST_LOG_OUT = 'REQUEST_LOG_OUT';

export const REQUEST_USERS_PENDING = 'REQUEST_USERS_PENDING';
export const REQUEST_USERS_SUCCESS = 'REQUEST_USERS_SUCCESS';
export const REQUEST_USERS_FAILED = 'REQUEST_USERS_FAILED';

export const REQUEST_USER_PENDING = 'REQUEST_USER_PENDING';
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS';
export const REQUEST_USER_FAILED = 'REQUEST_USER_FAILED';

export const CREATE_USER_PENDING = 'CREATE_USER_PENDING';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const UPDATE_USER_PENDING = 'UPDATE_USER_PENDING';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

export const REQUEST_ROLES_PENDING = 'REQUEST_ROLES_PENDING';
export const REQUEST_ROLES_SUCCESS = 'REQUEST_ROLES_SUCCESS';
export const REQUEST_ROLES_FAILED = 'REQUEST_ROLES_FAILED';

export const REQUEST_MY_ORGANIZATIONS_PENDING = 'REQUEST_MY_ORGANIZATIONS_PENDING';
export const REQUEST_MY_ORGANIZATIONS_SUCCESS = 'REQUEST_MY_ORGANIZATIONS_SUCCESS';
export const REQUEST_MY_ORGANIZATIONS_FAILED = 'REQUEST_MY_ORGANIZATIONS_FAILED';