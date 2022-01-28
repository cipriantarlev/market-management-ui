import {
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
    RESET_DATA,
} from '../constants';

const initialStateVat = {
    isPending: false,
    fetchVatPending: false,
    fetchVatError: false,
    vatList: [],
    error: false,
    vat: {},
    status: '',
}

export const manageVat = (state = initialStateVat, action = {}) => {
    switch (action.type) {
        case REQUEST_VAT_LIST_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_VAT_LIST_SUCCESS:
            return Object.assign({}, state, { vatList: action.payload, isPending: false });
        case REQUEST_VAT_LIST_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_VAT_PENDING:
            return Object.assign({}, state, { fetchVatPending: true });
        case REQUEST_VAT_SUCCESS:
            return Object.assign({}, state, { vat: action.payload, fetchVatPending: false });
        case REQUEST_VAT_FAILED:
            return Object.assign({}, state, { fetchVatError: action.payload, fetchVatPending: false });
        case CREATE_VAT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_VAT_SUCCESS:
            return Object.assign({}, state, { vat: action.payload, isPending: false });
        case CREATE_VAT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_VAT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_VAT_SUCCESS:
            return Object.assign({}, state, { vat: action.payload, isPending: false });
        case UPDATE_VAT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_VAT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_VAT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_VAT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateVat;
        default:
            return state;
    }
}