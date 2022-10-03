import {
    ROOT_CONTEXT_PATH,
    REQUEST_PRICE_CHANGING_ACT_PRODUCTS_PENDING,
    REQUEST_PRICE_CHANGING_ACT_PRODUCTS_SUCCESS,
    REQUEST_PRICE_CHANGING_ACT_PRODUCTS_FAILED,
    REQUEST_PRICE_CHANGING_ACT_PRODUCT_PENDING,
    REQUEST_PRICE_CHANGING_ACT_PRODUCT_SUCCESS,
    REQUEST_PRICE_CHANGING_ACT_PRODUCT_FAILED,
    CREATE_PRICE_CHANGING_ACT_PRODUCT_PENDING,
    CREATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS,
    CREATE_PRICE_CHANGING_ACT_PRODUCT_FAILED,
    UPDATE_PRICE_CHANGING_ACT_PRODUCT_PENDING,
    UPDATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS,
    UPDATE_PRICE_CHANGING_ACT_PRODUCT_FAILED,
    DELETE_PRICE_CHANGING_ACT_PRODUCT_PENDING,
    DELETE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS,
    DELETE_PRICE_CHANGING_ACT_PRODUCT_FAILED,
} from '../constants';

import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchPriceChangingActProducts = (priceChangingActId) => (dispatch) => {
    dispatch({ type: REQUEST_PRICE_CHANGING_ACT_PRODUCTS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-act-products/price-changing-act/${priceChangingActId}`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_PRICE_CHANGING_ACT_PRODUCTS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRICE_CHANGING_ACT_PRODUCTS_FAILED, payload: error }))
}

export const fetchPriceChangingActProduct = (id) => (dispatch) => {
    dispatch({ type: REQUEST_PRICE_CHANGING_ACT_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-act-products/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRICE_CHANGING_ACT_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRICE_CHANGING_ACT_PRODUCT_FAILED, payload: error }))
}

export const createPriceChangingActProduct = (priceChangingActProduct) => (dispatch) => {
    dispatch({ type: CREATE_PRICE_CHANGING_ACT_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-act-products`, dataApi('post', priceChangingActProduct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_PRICE_CHANGING_ACT_PRODUCT_FAILED, payload: error }))
}

export const updatePriceChangingActProduct = (priceChangingActProduct) => (dispatch) => {
    dispatch({ type: UPDATE_PRICE_CHANGING_ACT_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-act-products`, dataApi('put', priceChangingActProduct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_PRICE_CHANGING_ACT_PRODUCT_FAILED, payload: error }))
}

export const deletePriceChangingActProduct = (id) => (dispatch) => {
    dispatch({ type: DELETE_PRICE_CHANGING_ACT_PRODUCT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-act-products/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_PRICE_CHANGING_ACT_PRODUCT_FAILED, payload: error }))
}