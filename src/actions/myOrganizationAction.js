import {
    ROOT_CONTEXT_PATH,
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
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchMyOrganizations = () => (dispatch) => {
    dispatch({ type: REQUEST_MY_ORGANIZATIONS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_MY_ORGANIZATIONS_SUCCESS, dispatch))
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
        .then(data => checkStatusCode(data, CREATE_MY_ORGANIZATION_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const updateMyOrganization = (myOrg) => (dispatch) => {
    dispatch({ type: UPDATE_MY_ORGANIZATION_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, dataApi('put', myOrg))
        .then(respone => respone.json())
        .then(data => checkStatusCode(data, UPDATE_MY_ORGANIZATION_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const deleteMyOrganization = (id) => (dispatch) => {
    dispatch({ type: DELETE_MY_ORGANIZATION_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/my-organizations/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_MY_ORGANIZATION_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_MY_ORGANIZATION_FAILED, payload: error }))
}