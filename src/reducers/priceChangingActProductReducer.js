import {
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
    RESET_DATA,
} from '../constants';

const initialStatePriceChangingActProducts = {
    isPending: false,
    priceChangingActProducts: [],
    error: false,
    priceChangingActProduct: {},
    status: '',
}

export const managePriceChangingActProducts = (state = initialStatePriceChangingActProducts, action = {}) => {
    switch (action.type) {
        case REQUEST_PRICE_CHANGING_ACT_PRODUCTS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRICE_CHANGING_ACT_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { priceChangingActProducts: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACT_PRODUCTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACT_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRICE_CHANGING_ACT_PRODUCT_SUCCESS:
            return Object.assign({}, state, { priceChangingActProduct: action.payload, isPending: false });
        case REQUEST_PRICE_CHANGING_ACT_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_PRICE_CHANGING_ACT_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS:
            return Object.assign({}, state, { priceChangingActProduct: action.payload, isPending: false });
        case CREATE_PRICE_CHANGING_ACT_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_PRICE_CHANGING_ACT_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS:
            return Object.assign({}, state, { priceChangingActProduct: action.payload, isPending: false });
        case UPDATE_PRICE_CHANGING_ACT_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_PRICE_CHANGING_ACT_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_PRICE_CHANGING_ACT_PRODUCT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_PRICE_CHANGING_ACT_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStatePriceChangingActProducts;
        default:
            return state;
    }
}