import {
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
    RESET_DATA,
} from '../constants';

const initialStatePriceChangingActs = {
    isPending: false,
    priceChangingActs: [],
    error: false,
    priceChangingAct: {},
    status: '',
    updatedPriceChangingActs: 0
}

export const managePriceChangingActs = (state = initialStatePriceChangingActs, action = {}) => {
    switch (action.type) {
        case REQUEST_PRICE_CHANGING_ACTS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRICE_CHANGING_ACTS_SUCCESS:
            return Object.assign({}, state, { priceChangingActs: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRICE_CHANGING_ACT_SUCCESS:
            return Object.assign({}, state, { priceChangingAct: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_PRICE_CHANGING_ACT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_PRICE_CHANGING_ACT_SUCCESS:
            return Object.assign({}, state, { priceChangingAct: action.payload, isPending: false });
        case CREATE_PRICE_CHANGING_ACT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_PRICE_CHANGING_ACT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_PRICE_CHANGING_ACT_SUCCESS:
            return Object.assign({}, state, { priceChangingAct: action.payload, isPending: false });
        case UPDATE_PRICE_CHANGING_ACT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_PRICE_CHANGING_ACT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_PRICE_CHANGING_ACT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_PRICE_CHANGING_ACT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_SUCCESS:
            return Object.assign({}, state, { updatedPriceChangingActs: action.payload, isPending: false });
        case UPDATE_IS_PRICE_CHANGING_ACT_APPROVED_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStatePriceChangingActs;
        default:
            return state;
    }
}