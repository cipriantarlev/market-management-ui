import {
    REQUEST_MY_ORGANIZATIONS_PENDING,
    REQUEST_MY_ORGANIZATIONS_SUCCESS,
    REQUEST_MY_ORGANIZATIONS_FAILED,
    REQUEST_MY_ORGANIZATION_PENDING,
    REQUEST_MY_ORGANIZATION_SUCCESS,
    REQUEST_MY_ORGANIZATION_FAILED,
    CREATE_MY_ORGANIZATION_PENDING,
    CREATE_MY_ORGANIZATION_SUCCESS,
    CREATE_MY_ORGANIZATION_FAILED,
    UPDATE_MY_ORGANIZATION_PENDING,
    UPDATE_MY_ORGANIZATION_SUCCESS,
    UPDATE_MY_ORGANIZATION_FAILED,
    DELETE_MY_ORGANIZATION_PENDING,
    DELETE_MY_ORGANIZATION_SUCCESS,
    DELETE_MY_ORGANIZATION_FAILED,
} from '../constants';

const initialStateMyOrganizations = {
    isPending: false,
    myOrganizations: [],
    error: false,
    myOrganization: {},
    status: ''
}

export const manageMyOrganizations = (state = initialStateMyOrganizations, action = {}) => {
    switch (action.type) {
        case REQUEST_MY_ORGANIZATIONS_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_MY_ORGANIZATIONS_SUCCESS:
            return Object.assign({}, state, { myOrganizations: action.payload, isPending: false });
        case REQUEST_MY_ORGANIZATIONS_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_MY_ORGANIZATION_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_MY_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
        case REQUEST_MY_ORGANIZATION_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case CREATE_MY_ORGANIZATION_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_MY_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
        case CREATE_MY_ORGANIZATION_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_MY_ORGANIZATION_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_MY_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
        case UPDATE_MY_ORGANIZATION_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_MY_ORGANIZATION_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_MY_ORGANIZATION_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_MY_ORGANIZATION_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        default:
            return state;
    }
}