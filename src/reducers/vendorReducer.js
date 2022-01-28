import {
    REQUEST_VENDORS_PENDING,
    REQUEST_VENDORS_SUCCESS,
    REQUEST_VENDORS_FAILED,
    REQUEST_VENDOR_PENDING,
    REQUEST_VENDOR_SUCCESS,
    REQUEST_VENDOR_FAILED,
    CREATE_VENDOR_PENDING,
    CREATE_VENDOR_SUCCESS,
    CREATE_VENDOR_FAILED,
    UPDATE_VENDOR_PENDING,
    UPDATE_VENDOR_SUCCESS,
    UPDATE_VENDOR_FAILED,
    DELETE_VENDOR_PENDING,
    DELETE_VENDOR_SUCCESS,
    DELETE_VENDOR_FAILED,
    REQUEST_REGIONS_PENDING,
    REQUEST_REGIONS_SUCCESS,
    REQUEST_REGIONS_FAILED,
    RESET_DATA,
} from '../constants';

const initialStateVendor = {
    isPending: false,
    vendors: [],
    error: false,
    vendor: {},
    status: '',
    regions: []
}

export const manageVendors = (state = initialStateVendor, action = {}) => {
    switch (action.type) {
        case REQUEST_VENDORS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_VENDORS_SUCCESS:
            return Object.assign({}, state, { vendors: action.payload, isPending: false });
        case REQUEST_VENDORS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_VENDOR_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_VENDOR_SUCCESS:
            return Object.assign({}, state, { vendor: action.payload, isPending: false });
        case REQUEST_VENDOR_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_VENDOR_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_VENDOR_SUCCESS:
            return Object.assign({}, state, { vendor: action.payload, isPending: false });
        case CREATE_VENDOR_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_VENDOR_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_VENDOR_SUCCESS:
            return Object.assign({}, state, { vendor: action.payload, isPending: false });
        case UPDATE_VENDOR_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_VENDOR_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_VENDOR_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_VENDOR_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_REGIONS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_REGIONS_SUCCESS:
            return Object.assign({}, state, { regions: action.payload, isPending: false });
        case REQUEST_REGIONS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateVendor;
        default:
            return state;
    }
}