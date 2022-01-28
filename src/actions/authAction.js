import {
    ROOT_CONTEXT_PATH,
    REQUEST_LOGIN_PENDING,
    REQUEST_LOGIN_SUCCESS,
    REQUEST_LOGIN_FAILED,
    REQUEST_LOG_OUT,
} from '../constants';

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