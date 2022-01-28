import {
    ROOT_CONTEXT_PATH,
    REQUEST_VAT_LIST_PENDING,
    REQUEST_VAT_LIST_SUCCESS,
    REQUEST_VAT_LIST_FAILED,
    REQUEST_VAT_PENDING,
    REQUEST_VAT_SUCCESS,
    REQUEST_VAT_FAILED,
    CREATE_VAT_PENDING,
    CREATE_VAT_SUCCESS,
    CREATE_VAT_FAILED,
    UPDATE_VAT_PENDING,
    UPDATE_VAT_SUCCESS,
    UPDATE_VAT_FAILED,
    DELETE_VAT_PENDING,
    DELETE_VAT_SUCCESS,
    DELETE_VAT_FAILED,
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchVatList = () => (dispatch) => {
    dispatch({ type: REQUEST_VAT_LIST_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vat`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_VAT_LIST_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_VAT_LIST_FAILED, payload: error }))
}

export const fetchVat = (id) => (dispatch) => {
    dispatch({ type: REQUEST_VAT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vat/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_VAT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_VAT_FAILED, payload: error }))
}

export const createVat = (vat) => (dispatch) => {
    dispatch({ type: CREATE_VAT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vat`, dataApi('post', vat))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_VAT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_VAT_FAILED, payload: error }))
}

export const updateVat = (vat) => (dispatch) => {
    dispatch({ type: UPDATE_VAT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vat`, dataApi('put', vat))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_VAT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_VAT_FAILED, payload: error }))
}

export const deleteVat = (id) => (dispatch) => {
    dispatch({ type: DELETE_VAT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/vat/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_VAT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_VAT_FAILED, payload: error }))
}