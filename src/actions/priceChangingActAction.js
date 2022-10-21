import {
    ROOT_CONTEXT_PATH,
    REQUEST_PRICE_CHANGING_ACTS_PENDING,
    REQUEST_PRICE_CHANGING_ACTS_SUCCESS,
    REQUEST_PRICE_CHANGING_ACTS_FAILED,
    REQUEST_PRICE_CHANGING_ACT_PENDING,
    REQUEST_PRICE_CHANGING_ACT_SUCCESS,
    REQUEST_PRICE_CHANGING_ACT_FAILED,
    CREATE_PRICE_CHANGING_ACT_PENDING,
    CREATE_PRICE_CHANGING_ACT_SUCCESS,
    CREATE_PRICE_CHANGING_ACT_FAILED,
    UPDATE_PRICE_CHANGING_ACT_PENDING,
    UPDATE_PRICE_CHANGING_ACT_SUCCESS,
    UPDATE_PRICE_CHANGING_ACT_FAILED,
    DELETE_PRICE_CHANGING_ACT_PENDING,
    DELETE_PRICE_CHANGING_ACT_SUCCESS,
    DELETE_PRICE_CHANGING_ACT_FAILED,
    UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_PENDING,
    UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_SUCCESS,
    UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_FAILED,
} from '../constants';

import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchPriceChangingActs = () => (dispatch) => {
    dispatch({ type: REQUEST_PRICE_CHANGING_ACTS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_PRICE_CHANGING_ACTS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRICE_CHANGING_ACTS_FAILED, payload: error }))
}

export const fetchPriceChangingAct = (id) => (dispatch) => {
    dispatch({ type: REQUEST_PRICE_CHANGING_ACT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_PRICE_CHANGING_ACT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_PRICE_CHANGING_ACT_FAILED, payload: error }))
}

export const createPriceChangingAct = (priceChangingAct) => (dispatch) => {
    dispatch({ type: CREATE_PRICE_CHANGING_ACT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts`, dataApi('post', priceChangingAct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_PRICE_CHANGING_ACT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_PRICE_CHANGING_ACT_FAILED, payload: error }))
}

export const updatePriceChangingAct = (priceChangingAct) => (dispatch) => {
    dispatch({ type: UPDATE_PRICE_CHANGING_ACT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts`, dataApi('put', priceChangingAct))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_PRICE_CHANGING_ACT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_PRICE_CHANGING_ACT_FAILED, payload: error }))
}

export const updateIsPriceChangingActApproved = (priceChangingActIds) => (dispatch) => {
    dispatch({ type: UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts/isApproved`, dataApi('put', priceChangingActIds))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_FAILED, payload: error }))
}

export const deletePriceChangingAct = (id) => (dispatch) => {
    dispatch({ type: DELETE_PRICE_CHANGING_ACT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/price-changing-acts/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_PRICE_CHANGING_ACT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_PRICE_CHANGING_ACT_FAILED, payload: error }))
}