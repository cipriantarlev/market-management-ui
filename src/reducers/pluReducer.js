import {
    GENERATE_PLU_PENDING,
    GENERATE_PLU_SUCCESS,
    GENERATE_PLU_FAILED,
} from '../constants';

const initialStatePlu = {
    isPeding: false,
    plu: {},
    error: false,
}

export const generatePlu = (state = initialStatePlu, action = {}) => {
    switch (action.type) {
        case GENERATE_PLU_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case GENERATE_PLU_SUCCESS:
            return Object.assign({}, state, { plu: action.payload, isPeding: false });
        case GENERATE_PLU_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        default:
            return state;
    }
}