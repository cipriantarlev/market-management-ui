import { ROOT_CONTEXT_PATH } from '../../constants';

import { authorizationData } from '../../common/utils';

export const checkIfBarcodeExistsService = (barcode) => (
    fetch(`${ROOT_CONTEXT_PATH}/barcodes/barcode/${barcode}`, authorizationData())
        .then(response => response.json())
        .then(data => checkStatusCode(data))
        .catch(error => error)
)

export const checkIfProductByNameRom = (nameRom) => (
    fetch(`${ROOT_CONTEXT_PATH}/products/product/name-rom/${nameRom}`, authorizationData())
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert(`Romanian product name "${nameRom}" already exists in database. Please try another.`);
            }
            return data;
        })
        .catch(error => error)
)

export const checkIfProductByNameRus = (nameRus) => (
    fetch(`${ROOT_CONTEXT_PATH}/products/product/name-rus/${nameRus}`, authorizationData())
        .then(response => response.json())
        .then(data => {
            if (data) {
                alert(`Russian product name "${nameRus}" already exists in database. Please try another.`);
            }
            return data;
        })
        .catch(error => error)
)

export const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const checkStatusCode = (data) => {
    if (data[0]?.statusCode !== undefined && data[0]?.statusCode !== 200) {
        throw data;
    } else if (data !== undefined && data.statusCode === 403) {
        throw data;
    } else {
        console.log("data", data);
        return data;
    }
}