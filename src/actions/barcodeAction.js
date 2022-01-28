import {
    ROOT_CONTEXT_PATH,
    GENERATE_BARCODE_PENDING,
    GENERATE_BARCODE_SUCCESS,
    GENERATE_BARCODE_FAILED,
} from '../constants';
import {
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const generateBarcode = (barcode) => (dispatch) => {
    dispatch({ type: GENERATE_BARCODE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/barcodes`, dataApi('post', barcode))
        .then(response => response.json())
        .then(data => checkStatusCode(data, GENERATE_BARCODE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: GENERATE_BARCODE_FAILED, payload: error }))
}