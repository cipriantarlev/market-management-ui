import {
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
    RESET_DATA,
} from '../constants';

const initialStateMeasuringUnits = {
    isPending: false,
    fetchMeasuringUnitPending: false,
    fetchMeasuringUnitError: false,
    measuringUnits: [],
    error: false,
    measuringUnit: {},
    status: '',
}

export const manageMeasuringUnits = (state = initialStateMeasuringUnits, action = {}) => {
    switch (action.type) {
        case REQUEST_MEASURING_UNITS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_MEASURING_UNITS_SUCCESS:
            return Object.assign({}, state, { measuringUnits: action.payload, isPending: false });
        case REQUEST_MEASURING_UNITS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_MEASURING_UNIT_PENDING:
            return Object.assign({}, state, { fetchMeasuringUnitPending: true });
        case REQUEST_MEASURING_UNIT_SUCCESS:
            return Object.assign({}, state, { measuringUnit: action.payload, fetchMeasuringUnitPending: false });
        case REQUEST_MEASURING_UNIT_FAILED:
            return Object.assign({}, state, { fetchMeasuringUnitError: action.payload, fetchMeasuringUnitPending: false });
        case CREATE_MEASURING_UNIT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_MEASURING_UNIT_SUCCESS:
            return Object.assign({}, state, { measuringUnit: action.payload, isPending: false });
        case CREATE_MEASURING_UNIT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_MEASURING_UNIT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_MEASURING_UNIT_SUCCESS:
            return Object.assign({}, state, { measuringUnit: action.payload, isPending: false });
        case UPDATE_MEASURING_UNIT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_MEASURING_UNIT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_MEASURING_UNIT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_MEASURING_UNIT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateMeasuringUnits;
        default:
            return state;
    }
}