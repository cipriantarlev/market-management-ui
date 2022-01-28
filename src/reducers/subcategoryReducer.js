import {
    REQUEST_SUBCATEGORIES_PENDING,
    REQUEST_SUBCATEGORIES_SUCCESS,
    REQUEST_SUBCATEGORIES_FAILED,
    REQUEST_SUBCATEGORY_PENDING,
    REQUEST_SUBCATEGORY_SUCCESS,
    REQUEST_SUBCATEGORY_FAILED,
    CREATE_SUBCATEGORY_PENDING,
    CREATE_SUBCATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_FAILED,
    UPDATE_SUBCATEGORY_PENDING,
    UPDATE_SUBCATEGORY_SUCCESS,
    UPDATE_SUBCATEGORY_FAILED,
    DELETE_SUBCATEGORY_PENDING,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAILED,
    REQUEST_SUBCATEGORIES_CATEGORY_PENDING,
    REQUEST_SUBCATEGORIES_CATEGORY_SUCCESS,
    REQUEST_SUBCATEGORIES_CATEGORY_FAILED,
    RESET_DATA,
} from '../constants';

const initialStateSubcategory = {
    isPending: false,
    fetchSubategoryPending: false,
    fetchSubcategoryError: false,
    subcategories: [],
    error: false,
    subcategory: {},
    status: '',
    subcategoriesByCategory: [],
    fetchSubategoryByCategoryPending: false,
    fetchSubcategoryByCategoryError: false,
}

export const manageSubcategories = (state = initialStateSubcategory, action = {}) => {
    switch (action.type) {
        case REQUEST_SUBCATEGORIES_PENDING:
            return Object.assign({}, state, { isPending: true });
        case REQUEST_SUBCATEGORIES_SUCCESS:
            return Object.assign({}, state, { subcategories: action.payload, isPending: false });
        case REQUEST_SUBCATEGORIES_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_SUBCATEGORY_PENDING:
            return Object.assign({}, state, { fetchSubategoryPending: true });
        case REQUEST_SUBCATEGORY_SUCCESS:
            return Object.assign({}, state, { subcategory: action.payload, fetchSubategoryPending: false });
        case REQUEST_SUBCATEGORY_FAILED:
            return Object.assign({}, state, { fetchSubcategoryError: action.payload, fetchSubategoryPending: false });
        case CREATE_SUBCATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case CREATE_SUBCATEGORY_SUCCESS:
            return Object.assign({}, state, { subcategory: action.payload, isPending: false });
        case CREATE_SUBCATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case UPDATE_SUBCATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case UPDATE_SUBCATEGORY_SUCCESS:
            return Object.assign({}, state, { subcategory: action.payload, isPending: false });
        case UPDATE_SUBCATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case DELETE_SUBCATEGORY_PENDING:
            return Object.assign({}, state, { isPending: true });
        case DELETE_SUBCATEGORY_SUCCESS:
            return Object.assign({}, state, { status: action.payload, isPending: false });
        case DELETE_SUBCATEGORY_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false });
        case REQUEST_SUBCATEGORIES_CATEGORY_PENDING:
            return Object.assign({}, state, { fetchSubategoryByCategoryPending: true });
        case REQUEST_SUBCATEGORIES_CATEGORY_SUCCESS:
            return Object.assign({}, state, { subcategoriesByCategory: action.payload, fetchSubategoryByCategoryPending: false });
        case REQUEST_SUBCATEGORIES_CATEGORY_FAILED:
            return Object.assign({}, state, { fetchSubcategoryByCategoryError: action.payload, fetchSubategoryByCategoryPending: false });
        case RESET_DATA:
            return initialStateSubcategory;
        default:
            return state;
    }
}