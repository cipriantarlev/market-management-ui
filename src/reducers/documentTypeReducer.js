import {
    REQUEST_DOCUMENT_TYPES_PENDING,
    REQUEST_DOCUMENT_TYPES_SUCCESS,
    REQUEST_DOCUMENT_TYPES_FAILED,
    REQUEST_DOCUMENT_TYPE_PENDING,
    REQUEST_DOCUMENT_TYPE_SUCCESS,
    REQUEST_DOCUMENT_TYPE_FAILED,
    CREATE_DOCUMENT_TYPE_PENDING,
    CREATE_DOCUMENT_TYPE_SUCCESS,
    CREATE_DOCUMENT_TYPE_FAILED,
    UPDATE_DOCUMENT_TYPE_PENDING,
    UPDATE_DOCUMENT_TYPE_SUCCESS,
    UPDATE_DOCUMENT_TYPE_FAILED,
    DELETE_DOCUMENT_TYPE_PENDING,
    DELETE_DOCUMENT_TYPE_SUCCESS,
    DELETE_DOCUMENT_TYPE_FAILED,
    RESET_DATA,
} from '../constants';

const initialStateDocumentTypes = {
    isPending: false,
    fetchDocumentTypePending: false,
    fetchDocumentTypeError: false,
    documentTypes: [],
    error: false,
    documentType: {},
    status: '',
}

export const manageDocumentTypes = (state = initialStateDocumentTypes, action = {}) => {
    switch (action.type) {
        case REQUEST_DOCUMENT_TYPES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_DOCUMENT_TYPES_SUCCESS:
            return Object.assign({}, state, { documentTypes: action.payload, isPending: false });
        case REQUEST_DOCUMENT_TYPES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_DOCUMENT_TYPE_PENDING:
            return Object.assign({}, state, { fetchDocumentTypePending: true });
        case REQUEST_DOCUMENT_TYPE_SUCCESS:
            return Object.assign({}, state, { documentType: action.payload, fetchDocumentTypePending: false });
        case REQUEST_DOCUMENT_TYPE_FAILED:
            return Object.assign({}, state, { fetchDocumentTypeError: action.payload, fetchDocumentTypePending: false });
        case CREATE_DOCUMENT_TYPE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_DOCUMENT_TYPE_SUCCESS:
            return Object.assign({}, state, { documentType: action.payload, isPending: false });
        case CREATE_DOCUMENT_TYPE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_DOCUMENT_TYPE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_DOCUMENT_TYPE_SUCCESS:
            return Object.assign({}, state, { documentType: action.payload, isPending: false });
        case UPDATE_DOCUMENT_TYPE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_DOCUMENT_TYPE_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_DOCUMENT_TYPE_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_DOCUMENT_TYPE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateDocumentTypes;
        default:
            return state;
    }
}