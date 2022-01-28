import {
    ROOT_CONTEXT_PATH,
    GENERATE_PRODUCT_CODE_PENDING,
    GENERATE_PRODUCT_CODE_SUCCESS,
    GENERATE_PRODUCT_CODE_FAILED,
} from '../constants';
import {
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const generateProductCode = () => (dispatch) => {
    dispatch({ type: GENERATE_PRODUCT_CODE_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/products-code`, dataApi('post'))
        .then(response => response.json())
        .then(data => checkStatusCode(data, GENERATE_PRODUCT_CODE_SUCCESS, dispatch))
        .catch(error => dispatch({ type: GENERATE_PRODUCT_CODE_FAILED, payload: error }))
}