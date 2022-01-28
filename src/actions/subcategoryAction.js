import {
    ROOT_CONTEXT_PATH,
    REQUEST_SUBCATEGORIES_PENDING,
    REQUEST_SUBCATEGORIES_SUCCESS,
    REQUEST_SUBCATEGORIES_FAILED,
    REQUEST_SUBCATEGORY_PENDING,
    REQUEST_SUBCATEGORY_SUCCESS,
    REQUEST_SUBCATEGORY_FAILED,
    CREATE_SUBCATEGORY_PENDING,
    CREATE_SUBCATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_FAILED,
    UPDATE_SUBCATEGORY_PENDING,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAILED,
    DELETE_SUBCATEGORY_PENDING,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAILED,
    REQUEST_SUBCATEGORIES_CATEGORY_PENDING,
    REQUEST_SUBCATEGORIES_CATEGORY_SUCCESS,
    REQUEST_SUBCATEGORIES_CATEGORY_FAILED,
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchSubcategories = () => (dispatch) => {
    dispatch({ type: REQUEST_SUBCATEGORIES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_SUBCATEGORIES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_SUBCATEGORIES_FAILED, payload: error }))
}

export const fetchSubcategoriesCategory = (categoryId) => (dispatch) => {
    dispatch({ type: REQUEST_SUBCATEGORIES_CATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories/category/${categoryId}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_SUBCATEGORIES_CATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_SUBCATEGORIES_CATEGORY_FAILED, payload: error }))
}

export const fetchSubcategory = (id) => (dispatch) => {
    dispatch({ type: REQUEST_SUBCATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_SUBCATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_SUBCATEGORY_FAILED, payload: error }))
}

export const createSubcategory = (subcategory) => (dispatch) => {
    dispatch({ type: CREATE_SUBCATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories`, dataApi('post', subcategory))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_SUBCATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_SUBCATEGORY_FAILED, payload: error }))
}

export const updateSubcategory = (subcategory) => (dispatch) => {
    dispatch({ type: UPDATE_SUBCATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories`, dataApi('put', subcategory))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_SUBCATEGORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_SUBCATEGORY_FAILED, payload: error }))
}

export const deleteSubcategory = (id) => (dispatch) => {
    dispatch({ type: DELETE_SUBCATEGORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/subcategories/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_SUBCATEGORY_FAILED, payload: error }))
}