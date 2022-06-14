import {
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
    RESET_DATA,
    UPDATE_IS_PRODUCT_CHECKED_PENDING,
    UPDATE_IS_PRODUCT_CHECKED_SUCCESS,
    UPDATE_IS_PRODUCT_CHECKED_FAILED,
    REQUEST_MARKED_PRODUCTS_PENDING,
    REQUEST_MARKED_PRODUCTS_SUCCESS,
    REQUEST_MARKED_PRODUCTS_FAILED,
    PRINT_MARKED_PRODUCT_PENDING,
    PRINT_MARKED_PRODUCT_SUCCESS,
    PRINT_MARKED_PRODUCT_FAILED
} from '../constants';

const initialStateProduct = {
    isPending: false,
    products: [],
    error: false,
    product: {},
    status: '',
    isPendingProductHistory: false,
    productHistory: [],
    errorProductHistory: false,
    updatedProducts: 0,
    markedProducts: [],
    markedProductsToPring: [],
}

export const manageProducts = (state = initialStateProduct, action = {}) => {
    switch (action.type) {
        case REQUEST_PRODUCTS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { products: action.payload, isPending: false });
        case REQUEST_PRODUCTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRODUCT_SUCCESS:
            return Object.assign({}, state, { product: action.payload, isPending: false });
        case REQUEST_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { product: action.payload, isPending: false });
        case CREATE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { product: action.payload, isPending: false });
        case UPDATE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_PRODUCT_BY_BARCODE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_PRODUCT_BY_BARCODE_SUCCESS:
            return Object.assign({}, state, { product: action.payload, isPending: false });
        case REQUEST_PRODUCT_BY_BARCODE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_PRODUCT_HISTORY_PENDING:
            return Object.assign({}, state, { isPendingProductHistory: true });
        case REQUEST_PRODUCT_HISTORY_SUCCESS:
            return Object.assign({}, state, { productHistory: action.payload, isPendingProductHistory: false });
        case REQUEST_PRODUCT_HISTORY_FAILED:
            return Object.assign({}, state, { errorProductHistory: action.payload, isPendingProductHistory: false });
        case UPDATE_IS_PRODUCT_CHECKED_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_IS_PRODUCT_CHECKED_SUCCESS:
            return Object.assign({}, state, { updatedProducts: action.payload, isPending: false });
        case UPDATE_IS_PRODUCT_CHECKED_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_MARKED_PRODUCTS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_MARKED_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { markedProducts: action.payload, isPending: false });
        case REQUEST_MARKED_PRODUCTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case PRINT_MARKED_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case PRINT_MARKED_PRODUCT_SUCCESS:
            return Object.assign({}, state, { markedProductsToPring: action.payload, isPending: false });
        case PRINT_MARKED_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateProduct;
        default:
            return state;
    }
}