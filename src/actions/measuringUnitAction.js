import {
    ROOT_CONTEXT_PATH,
    REQUEST_MEASURING_UNITS_PENDING,
    REQUEST_MEASURING_UNITS_SUCCESS,
    REQUEST_MEASURING_UNITS_FAILED,
    REQUEST_MEASURING_UNIT_PENDING,
    REQUEST_MEASURING_UNIT_SUCCESS,
    REQUEST_MEASURING_UNIT_FAILED,
    CREATE_MEASURING_UNIT_PENDING,
    CREATE_MEASURING_UNIT_SUCCESS,
    CREATE_MEASURING_UNIT_FAILED,
    UPDATE_MEASURING_UNIT_PENDING,
    UPDATE_MEASURING_UNIT_SUCCESS,
    UPDATE_MEASURING_UNIT_FAILED,
    DELETE_MEASURING_UNIT_PENDING,
    DELETE_MEASURING_UNIT_SUCCESS,
    DELETE_MEASURING_UNIT_FAILED,
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchMeasuringUnits = () => (dispatch) => {
    dispatch({ type: REQUEST_MEASURING_UNITS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_MEASURING_UNITS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_MEASURING_UNITS_FAILED, payload: error }))
}

export const fetchMeasuringUnit = (id) => (dispatch) => {
    dispatch({ type: REQUEST_MEASURING_UNIT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/measuring-units/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_MEASURING_UNIT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_MEASURING_UNIT_FAILED, payload: error }))
}

export const createMeasuringUnit = (measuringUnit) => (dispatch) => {
    dispatch({ type: CREATE_MEASURING_UNIT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, dataApi('post', measuringUnit))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_MEASURING_UNIT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_MEASURING_UNIT_FAILED, payload: error }))
}

export const updateMeasuringUnit = (measuringUnit) => (dispatch) => {
    dispatch({ type: UPDATE_MEASURING_UNIT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, dataApi('put', measuringUnit))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_MEASURING_UNIT_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_MEASURING_UNIT_FAILED, payload: error }))
}

export const deleteMeasuringUnit = (id) => (dispatch) => {
    dispatch({ type: DELETE_MEASURING_UNIT_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/measuring-units/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_MEASURING_UNIT_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_MEASURING_UNIT_FAILED, payload: error }))
}