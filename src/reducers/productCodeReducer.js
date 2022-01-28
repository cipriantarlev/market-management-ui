import {
    GENERATE_PRODUCT_CODE_PENDING,
    GENERATE_PRODUCT_CODE_SUCCESS,
    GENERATE_PRODUCT_CODE_FAILED,
} from '../constants';

const initialStateProductCode = {
    isPeding: false,
    productCode: {},
    error: false,
}

export const generateProductCode = (state = initialStateProductCode, action = {}) => {
    switch (action.type) {
        case GENERATE_PRODUCT_CODE_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case GENERATE_PRODUCT_CODE_SUCCESS:
            return Object.assign({}, state, { productCode: action.payload, isPeding: false });
        case GENERATE_PRODUCT_CODE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        default:
            return state;
    }
}