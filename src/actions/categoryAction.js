import {
    ROOT_CONTEXT_PATH,
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
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchCategories = () => (dispatch) => {
    dispatch({ type: REQUEST_CATEGORIES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/categories`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_CATEGORIES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_CATEGORIES_FAILED, payload: error }))
}

export const fetchCategory = (id) => (dispatch) => {
    dispatch({ type: REQUEST_CATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_CATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_CATEGORY_FAILED, payload: error }))
}

export const createCategory = (category) => (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('post', category))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_CATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_CATEGORY_FAILED, payload: error }))
}

export const updateCategory = (category) => (dispatch) => {
    dispatch({ type: UPDATE_CATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('put', category))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_CATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_CATEGORY_FAILED, payload: error }))
}

export const deleteCategory = (id) => (dispatch) => {
    dispatch({ type: DELETE_CATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_CATEGORY_FAILED, payload: error }))
}