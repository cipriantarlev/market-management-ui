import {
    ROOT_CONTEXT_PATH,
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
} from '../constants';
import {
    authorizationData,
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const fetchInvoices = () => (dispatch) => {
    dispatch({ type: REQUEST_INVOICES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICES_FAILED, payload: error }))
}

export const fetchIncomeInvoices = () => (dispatch) => {
    dispatch({ type: REQUEST_INCOME_INVOICES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/income`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_INCOME_INVOICES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INCOME_INVOICES_FAILED, payload: error }))
}

export const fetchOutComeInvoices = () => (dispatch) => {
    dispatch({ type: REQUEST_OUTCOME_INVOICES_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/outcome`, authorizationData())
        .then(response => response.status === 404 ? [] : response.json())
        .then(data => checkStatusCode(data, REQUEST_OUTCOME_INVOICES_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_OUTCOME_INVOICES_FAILED, payload: error }))
}

export const fetchInvoice = (id) => (dispatch) => {
    dispatch({ type: REQUEST_INVOICE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/${id}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICE_FAILED, payload: error }))
}

export const createInvoice = (invoice) => (dispatch) => {
    dispatch({ type: CREATE_INVOICE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices`, dataApi('post', invoice))
        .then(response => response.json())
        .then(data => checkStatusCode(data, CREATE_INVOICE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: CREATE_INVOICE_FAILED, payload: error }))
}

export const updateInvoice = (invoice) => (dispatch) => {
    dispatch({ type: UPDATE_INVOICE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices`, dataApi('put', invoice))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_INVOICE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_INVOICE_FAILED, payload: error }))
}

export const deleteInvoice = (id) => (dispatch) => {
    dispatch({ type: DELETE_INVOICE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/${id}`, dataApi('delete'))
        .then(respone => dispatch({ type: DELETE_INVOICE_SUCCESS, payload: respone.status }))
        .catch(error => dispatch({ type: DELETE_INVOICE_FAILED, payload: error }))
}

export const fetchInvoiceOrganizations = () => (dispatch) => {
    dispatch({ type: REQUEST_INVOICES_ORGANIZATIONS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/my-organizations`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICES_ORGANIZATIONS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICES_ORGANIZATIONS_FAILED, payload: error }))
}

export const fetchInvoiceVendors = () => (dispatch) => {
    dispatch({ type: REQUEST_INVOICES_VENDORS_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/vendors`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data, REQUEST_INVOICES_VENDORS_SUCCESS, dispatch))
        .catch(error => dispatch({ type: REQUEST_INVOICES_VENDORS_FAILED, payload: error }))
}

export const updateInvoiceIsApprovedMarker = (invoiceId, isApproved) => (dispatch) => {
    dispatch({ type: UPDATE_INVOICE_IS_APPROVED_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/invoices/isApproved/${invoiceId}/${isApproved}`, dataApi('put'))
        .then(response => response.json())
        .then(data => checkStatusCode(data, UPDATE_INVOICE_IS_APPROVED_SUCCESS, dispatch))
        .catch(error => dispatch({ type: UPDATE_INVOICE_IS_APPROVED_FAILED, payload: error }))
}