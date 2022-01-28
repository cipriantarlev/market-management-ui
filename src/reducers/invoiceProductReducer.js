import {
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
    RESET_DATA,
} from '../constants';

const initialStateInvoiceProducts = {
    isPending: false,
    invoiceProducts: [],
    error: false,
    invoiceProduct: {},
    status: '',
}

export const manageInvoiceProducts = (state = initialStateInvoiceProducts, action = {}) => {
    switch (action.type) {
        case REQUEST_INVOICE_PRODUCTS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_INVOICE_PRODUCTS_SUCCESS:
            return Object.assign({}, state, { invoiceProducts: action.payload, isPending: false });
        case REQUEST_INVOICE_PRODUCTS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_INVOICE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_INVOICE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
        case REQUEST_INVOICE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_INVOICE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_INVOICE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
        case CREATE_INVOICE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_INVOICE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_INVOICE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
        case UPDATE_INVOICE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_INVOICE_PRODUCT_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_INVOICE_PRODUCT_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_INVOICE_PRODUCT_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateInvoiceProducts;
        default:
            return state;
    }
}