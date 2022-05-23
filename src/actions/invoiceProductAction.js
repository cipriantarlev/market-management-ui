import {
    ROOT_CONTEXT_PATH,
    REQUEST_INVOICE_PRODUCTS_PENDING,
    REQUEST_INVOICE_PRODUCTS_SUCCESS,
    REQUEST_INVOICE_PRODUCTS_FAILED,
    REQUEST_INVOICE_PRODUCT_PENDING,
    REQUEST_INVOICE_PRODUCT_SUCCESS,
    REQUEST_INVOICE_PRODUCT_FAILED,
    CREATE_INVOICE_PRODUCT_PENDING,
    CREATE_INVOICE_PRODUCT_SUCCESS,
    CREATE_INVOICE_PRODUCT_FAILED,
    UPDATE_INVOICE_PRODUCT_PENDING,
    UPDATE_INVOICE_PRODUCT_SUCCESS,
    UPDATE_INVOICE_PRODUCT_FAILED,
    DELETE_INVOICE_PRODUCT_PENDING,
    DELETE_INVOICE_PRODUCT_SUCCESS,
    DELETE_INVOICE_PRODUCT_FAILED,
    UPDATE_IS_INVOICE_PRODUCT_CHECKED_PENDING,
    UPDATE_IS_INVOICE_PRODUCT_CHECKED_SUCCESS,
    UPDATE_IS_INVOICE_PRODUCT_CHECKED_FAILED,
} from '../constants';

import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchInvoiceProducts = (invoiceId) => (dispatch) => {
    dispatch({ type: REQUEST_INVOICE_PRODUCTS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/${invoiceId}`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICE_PRODUCTS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICE_PRODUCTS_FAILED, payload: error }))
}

export const fetchInvoiceProduct = (id) => (dispatch) => {
    dispatch({ type: REQUEST_INVOICE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICE_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const createInvoiceProduct = (invoiceProduct) => (dispatch) => {
    dispatch({ type: CREATE_INVOICE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product`, dataApi('post', invoiceProduct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_INVOICE_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const updateInvoiceProduct = (invoiceProduct) => (dispatch) => {
    dispatch({ type: UPDATE_INVOICE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product`, dataApi('put', invoiceProduct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_INVOICE_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const updateIsInvoiceProductChecked = (invoiceProductIds) => (dispatch) => {
    dispatch({ type: UPDATE_IS_INVOICE_PRODUCT_CHECKED_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/isChecked`, dataApi('put', invoiceProductIds))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_IS_INVOICE_PRODUCT_CHECKED_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_IS_INVOICE_PRODUCT_CHECKED_FAILED, payload: error }))
}

export const deleteInvoiceProduct = (id) => (dispatch) => {
    dispatch({ type: DELETE_INVOICE_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_INVOICE_PRODUCT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_INVOICE_PRODUCT_FAILED, payload: error }))
}