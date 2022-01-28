import {
    ROOT_CONTEXT_PATH,
    GENERATE_PLU_PENDING,
    GENERATE_PLU_SUCCESS,
    GENERATE_PLU_FAILED,
} from '../constants';
import {
    dataApi,
    checkStatusCode,
} from '../common/utils';

export const generatePlu = () => (dispatch) => {
    dispatch({ type: GENERATE_PLU_PENDING });
    fetch(`${ROOT_CONTEXT_PATH}/plu`, dataApi('post'))
        .then(response => response.json())
        .then(data => checkStatusCode(data, GENERATE_PLU_SUCCESS, dispatch))
        .catch(error => dispatch({ type: GENERATE_PLU_FAILED, payload: error }))
}