import {
    ROOT_CONTEXT_PATH,
    REQUEST_DOCUMENT_TYPES_PENDING,
    REQUEST_DOCUMENT_TYPES_SUCCESS,
    REQUEST_DOCUMENT_TYPES_FAILED,
    REQUEST_DOCUMENT_TYPE_PENDING,
    REQUEST_DOCUMENT_TYPE_SUCCESS,
    REQUEST_DOCUMENT_TYPE_FAILED,
    CREATE_DOCUMENT_TYPE_PENDING,
    CREATE_DOCUMENT_TYPE_SUCCESS,
    CREATE_DOCUMENT_TYPE_FAILED,
    UPDATE_DOCUMENT_TYPE_PENDING,
    UPDATE_DOCUMENT_TYPE_SUCCESS,
    UPDATE_DOCUMENT_TYPE_FAILED,
    DELETE_DOCUMENT_TYPE_PENDING,
    DELETE_DOCUMENT_TYPE_SUCCESS,
    DELETE_DOCUMENT_TYPE_FAILED,
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchDocumentTypes = () => (dispatch) => {
    dispatch({ type: REQUEST_DOCUMENT_TYPES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/document-types`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_DOCUMENT_TYPES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_DOCUMENT_TYPES_FAILED, payload: error }))
}

export const fetchDocumentType = (id) => (dispatch) => {
    dispatch({ type: REQUEST_DOCUMENT_TYPE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/document-types/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_DOCUMENT_TYPE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const createDocumentType = (documentType) => (dispatch) => {
    dispatch({ type: CREATE_DOCUMENT_TYPE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/document-types`, dataApi('post', documentType))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_DOCUMENT_TYPE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const updateDocumentType = (documentType) => (dispatch) => {
    dispatch({ type: UPDATE_DOCUMENT_TYPE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/document-types`, dataApi('put', documentType))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_DOCUMENT_TYPE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const deleteDocumentType = (id) => (dispatch) => {
    dispatch({ type: DELETE_DOCUMENT_TYPE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/document-types/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_DOCUMENT_TYPE_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_DOCUMENT_TYPE_FAILED, payload: error }))
}