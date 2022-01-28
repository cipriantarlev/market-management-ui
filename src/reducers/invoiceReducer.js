import {
    REQUEST_INVOICES_PENDING,
    REQUEST_INVOICES_SUCCESS,
    REQUEST_INVOICES_FAILED,
    REQUEST_INCOME_INVOICES_PENDING,
    REQUEST_INCOME_INVOICES_SUCCESS,
    REQUEST_INCOME_INVOICES_FAILED,
    REQUEST_OUTCOME_INVOICES_PENDING,
    REQUEST_OUTCOME_INVOICES_SUCCESS,
    REQUEST_OUTCOME_INVOICES_FAILED,
    REQUEST_INVOICE_PENDING,
    REQUEST_INVOICE_SUCCESS,
    REQUEST_INVOICE_FAILED,
    CREATE_INVOICE_PENDING,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAILED,
    UPDATE_INVOICE_PENDING,
    UPDATE_INVOICE_SUCCESS,
    UPDATE_INVOICE_FAILED,
    DELETE_INVOICE_PENDING,
    DELETE_INVOICE_SUCCESS,
    DELETE_INVOICE_FAILED,
    REQUEST_INVOICES_ORGANIZATIONS_PENDING,
    REQUEST_INVOICES_ORGANIZATIONS_SUCCESS,
    REQUEST_INVOICES_ORGANIZATIONS_FAILED,
    REQUEST_INVOICES_VENDORS_PENDING,
    REQUEST_INVOICES_VENDORS_SUCCESS,
    REQUEST_INVOICES_VENDORS_FAILED,
    UPDATE_INVOICE_IS_APPROVED_PENDING,
    UPDATE_INVOICE_IS_APPROVED_SUCCESS,
    UPDATE_INVOICE_IS_APPROVED_FAILED,
    RESET_DATA,
} from '../constants';

const initialStateInvoice = {
    isPending: false,
    invoices: [],
    error: false,
    invoice: {},
    status: '',
    invoiceOrganizations: [],
    invoiceOrganizationsIsPending: false,
    invoiceOrganizationsError: false,
    invoiceVendors: [],
    invoiceVendorsIsPending: false,
    invoiceVendorsError: false,
    isApprovedModified: 0,
}

export const manageInvoices = (state = initialStateInvoice, action = {}) => {
    switch (action.type) {
        case REQUEST_INVOICES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_INVOICES_SUCCESS:
            return Object.assign({}, state, { invoices: action.payload, isPending: false });
        case REQUEST_INVOICES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_INCOME_INVOICES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_INCOME_INVOICES_SUCCESS:
            return Object.assign({}, state, { invoices: action.payload, isPending: false });
        case REQUEST_INCOME_INVOICES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_OUTCOME_INVOICES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_OUTCOME_INVOICES_SUCCESS:
            return Object.assign({}, state, { invoices: action.payload, isPending: false });
        case REQUEST_OUTCOME_INVOICES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_INVOICE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_INVOICE_SUCCESS:
            return Object.assign({}, state, { invoice: action.payload, isPending: false });
        case REQUEST_INVOICE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_INVOICE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_INVOICE_SUCCESS:
            return Object.assign({}, state, { invoice: action.payload, isPending: false });
        case CREATE_INVOICE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_INVOICE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_INVOICE_SUCCESS:
            return Object.assign({}, state, { invoice: action.payload, isPending: false });
        case UPDATE_INVOICE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_INVOICE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_INVOICE_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_INVOICE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_INVOICES_ORGANIZATIONS_PENDING:
            return Object.assign({}, state, { invoiceOrganizationsIsPending: true });
        case REQUEST_INVOICES_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, { invoiceOrganizations: action.payload, invoiceOrganizationsIsPending: false });
        case REQUEST_INVOICES_ORGANIZATIONS_FAILED:
            return Object.assign({}, state, { invoiceOrganizationsError: action.payload, invoiceOrganizationsIsPending: false });
        case REQUEST_INVOICES_VENDORS_PENDING:
            return Object.assign({}, state, { invoiceVendorsIsPending: true });
        case REQUEST_INVOICES_VENDORS_SUCCESS:
            return Object.assign({}, state, { invoiceVendors: action.payload, invoiceVendorsIsPending: false });
        case REQUEST_INVOICES_VENDORS_FAILED:
            return Object.assign({}, state, { invoiceVendorsError: action.payload, invoiceVendorsIsPending: false });
        case UPDATE_INVOICE_IS_APPROVED_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_INVOICE_IS_APPROVED_SUCCESS:
            return Object.assign({}, state, { isApprovedModified: action.payload, isPending: false });
        case UPDATE_INVOICE_IS_APPROVED_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateInvoice;
        default:
            return state;
    }
}