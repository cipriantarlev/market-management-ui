import {
    ROOT_CONTEXT_PATH,
    REQUEST_PRODUCTS_PENDING,
    REQUEST_PRODUCTS_SUCCESS,
    REQUEST_PRODUCTS_FAILED,
    REQUEST_PRODUCT_PENDING,
    REQUEST_PRODUCT_SUCCESS,
    REQUEST_PRODUCT_FAILED,
    CREATE_PRODUCT_PENDING,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILED,
    UPDATE_PRODUCT_PENDING,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILED,
    DELETE_PRODUCT_PENDING,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    REQUEST_PRODUCT_BY_BARCODE_PENDING,
    REQUEST_PRODUCT_BY_BARCODE_SUCCESS,
    REQUEST_PRODUCT_BY_BARCODE_FAILED,
    REQUEST_PRODUCT_HISTORY_PENDING,
    REQUEST_PRODUCT_HISTORY_SUCCESS,
    REQUEST_PRODUCT_HISTORY_FAILED,
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchProducts = () => (dispatch) => {
    dispatch({ type: REQUEST_PRODUCTS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRODUCTS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRODUCTS_FAILED, payload: error }))
}

export const fetchProduct = (id) => (dispatch) => {
    dispatch({ type: REQUEST_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRODUCT_FAILED, payload: error }))
}

export const createProduct = (product) => (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products`, dataApi('post', product))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_PRODUCT_FAILED, payload: error }))
}

export const updateProduct = (product) => (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products`, dataApi('put', product))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_PRODUCT_FAILED, payload: error }))
}

export const deleteProduct = (id) => (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_PRODUCT_FAILED, payload: error }))
}

export const fetchProductByBarcode = (barcode) => (dispatch) => {
    dispatch({ type: REQUEST_PRODUCT_BY_BARCODE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products/barcodes/${barcode}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRODUCT_BY_BARCODE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRODUCT_BY_BARCODE_FAILED, payload: error }))
}

export const fetchProductHistory = (id) => (dispatch) => {
    dispatch({ type: REQUEST_PRODUCT_HISTORY_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products/product-history/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRODUCT_HISTORY_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRODUCT_HISTORY_FAILED, payload: error }))
}