import {
    REQUEST_CATEGORIES_PENDING,
    REQUEST_CATEGORIES_SUCCESS,
    REQUEST_CATEGORIES_FAILED,
    REQUEST_CATEGORY_PENDING,
    REQUEST_CATEGORY_SUCCESS,
    REQUEST_CATEGORY_FAILED,
    CREATE_CATEGORY_PENDING,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAILED,
    UPDATE_CATEGORY_PENDING,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILED,
    DELETE_CATEGORY_PENDING,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILED,
    RESET_DATA,
} from '../constants';

const initialStateCategory = {
    isPending: false,
    fetchCategoryPending: false,
    fetchCategoryError: false,
    categories: [],
    error: false,
    category: {},
    status: '',
}

export const manageCategories = (state = initialStateCategory, action = {}) => {
    switch (action.type) {
        case REQUEST_CATEGORIES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_CATEGORIES_SUCCESS:
            return Object.assign({}, state, { categories: action.payload, isPending: false });
        case REQUEST_CATEGORIES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_CATEGORY_PENDING:
            return Object.assign({}, state, { fetchCategoryPending: true });
        case REQUEST_CATEGORY_SUCCESS:
            return Object.assign({}, state, { category: action.payload, fetchCategoryPending: false });
        case REQUEST_CATEGORY_FAILED:
            return Object.assign({}, state, { fetchCategoryError: action.payload, fetchCategoryPending: false });
        case CREATE_CATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_CATEGORY_SUCCESS:
            return Object.assign({}, state, { category: action.payload, isPending: false });
        case CREATE_CATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_CATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_CATEGORY_SUCCESS:
            return Object.assign({}, state, { category: action.payload, isPending: false });
        case UPDATE_CATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_CATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_CATEGORY_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_CATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case RESET_DATA:
            return initialStateCategory;
        default:
            return state;
    }
}