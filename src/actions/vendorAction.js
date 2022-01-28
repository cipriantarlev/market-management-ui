import {
    ROOT_CONTEXT_PATH,
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
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchVendors = () => (dispatch) => {
    dispatch({ type: REQUEST_VENDORS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vendors`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_VENDORS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_VENDORS_FAILED, payload: error }))
}

export const fetchVendor = (id) => (dispatch) => {
    dispatch({ type: REQUEST_VENDOR_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vendors/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_VENDOR_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_VENDOR_FAILED, payload: error }))
}

export const createVendor = (vendor) => (dispatch) => {
    dispatch({ type: CREATE_VENDOR_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('post', vendor))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_VENDOR_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_VENDOR_FAILED, payload: error }))
}

export const updateVendor = (vendor) => (dispatch) => {
    dispatch({ type: UPDATE_VENDOR_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('put', vendor))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_VENDOR_SUCCESS, dispatch))
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
        .then(data => checkStatusCode(data, REQUEST_REGIONS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_REGIONS_FAILED, payload: error }))
}