import {
    GENERATE_BARCODE_PENDING,
    GENERATE_BARCODE_SUCCESS,
    GENERATE_BARCODE_FAILED
}
    from '../constants';

const initialStateBarcode = {
    isPeding: false,
    barcode: {},
    error: false,
}

export const generateBarcode = (state = initialStateBarcode, action = {}) => {
    switch (action.type) {
        case GENERATE_BARCODE_PENDING:
            return Object.assign({}, state, { isPeding: true });
        case GENERATE_BARCODE_SUCCESS:
            return Object.assign({}, state, { barcode: action.payload, isPeding: false });
        case GENERATE_BARCODE_FAILED:
            return Object.assign({}, state, { error: action.payload, isPeding: false });
        default:
            return state;
    }
}