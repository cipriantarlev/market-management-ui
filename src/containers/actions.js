import {
  ROOT_CONTEXT_PATH,
  REQUEST_LOGIN_PENDING,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILED,
  REQUEST_LOG_OUT,
  REQUEST_USERS_PENDING,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAILED,
  REQUEST_USER_PENDING,
  REQUEST_USER_SUCCESS,
  REQUEST_USER_FAILED,
  REQUEST_ROLES_PENDING,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAILED,
  CREATE_USER_PENDING,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  DELETE_USER_PENDING,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
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
  REQUEST_VENDORS_PENDING,
  REQUEST_VENDORS_SUCCESS,
  REQUEST_VENDORS_FAILED,
  REQUEST_VENDOR_PENDING,
  REQUEST_VENDOR_SUCCESS,
  REQUEST_VENDOR_FAILED,
  CREATE_VENDOR_PENDING,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_FAILED,
  UPDATE_VENDOR_PENDING,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_FAILED,
  DELETE_VENDOR_PENDING,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILED,
  REQUEST_REGIONS_PENDING,
  REQUEST_REGIONS_SUCCESS,
  REQUEST_REGIONS_FAILED,
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
  REQUEST_VAT_LIST_PENDING,
  REQUEST_VAT_LIST_SUCCESS,
  REQUEST_VAT_LIST_FAILED,
  REQUEST_VAT_PENDING,
  REQUEST_VAT_SUCCESS,
  REQUEST_VAT_FAILED,
  CREATE_VAT_PENDING,
  CREATE_VAT_SUCCESS,
  CREATE_VAT_FAILED,
  UPDATE_VAT_PENDING,
  UPDATE_VAT_SUCCESS,
  UPDATE_VAT_FAILED,
  DELETE_VAT_PENDING,
  DELETE_VAT_SUCCESS,
  DELETE_VAT_FAILED,
  REQUEST_MEASURING_UNITS_PENDING,
  REQUEST_MEASURING_UNITS_SUCCESS,
  REQUEST_MEASURING_UNITS_FAILED,
  REQUEST_MEASURING_UNIT_PENDING,
  REQUEST_MEASURING_UNIT_SUCCESS,
  REQUEST_MEASURING_UNIT_FAILED,
  CREATE_MEASURING_UNIT_PENDING,
  CREATE_MEASURING_UNIT_SUCCESS,
  CREATE_MEASURING_UNIT_FAILED,
  UPDATE_MEASURING_UNIT_PENDING,
  UPDATE_MEASURING_UNIT_SUCCESS,
  UPDATE_MEASURING_UNIT_FAILED,
  DELETE_MEASURING_UNIT_PENDING,
  DELETE_MEASURING_UNIT_SUCCESS,
  DELETE_MEASURING_UNIT_FAILED,
  REQUEST_PRODUCTS_PENDING,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_FAILED,
  REQUEST_PRODUCT_PENDING,
  REQUEST_PRODUCT_SUCCESS,
  REQUEST_PRODUCT_FAILED,
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILED,
  UPDATE_PRODUCT_PENDING,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILED,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILED,
  REQUEST_PRODUCT_BY_BARCODE_PENDING,
  REQUEST_PRODUCT_BY_BARCODE_SUCCESS,
  REQUEST_PRODUCT_BY_BARCODE_FAILED,
  RESET_DATA,
  GENERATE_PRODUCT_CODE_PENDING,
  GENERATE_PRODUCT_CODE_SUCCESS,
  GENERATE_PRODUCT_CODE_FAILED,
  GENERATE_PLU_PENDING,
  GENERATE_PLU_SUCCESS,
  GENERATE_PLU_FAILED,
  GENERATE_BARCODE_PENDING,
  GENERATE_BARCODE_SUCCESS,
  GENERATE_BARCODE_FAILED,
  REQUEST_DOCUMENT_TYPES_PENDING,
  REQUEST_DOCUMENT_TYPES_SUCCESS,
  REQUEST_DOCUMENT_TYPES_FAILED,
  REQUEST_DOCUMENT_TYPE_PENDING,
  REQUEST_DOCUMENT_TYPE_SUCCESS,
  REQUEST_DOCUMENT_TYPE_FAILED,
  CREATE_DOCUMENT_TYPE_PENDING,
  CREATE_DOCUMENT_TYPE_SUCCESS,
  CREATE_DOCUMENT_TYPE_FAILED,
  UPDATE_DOCUMENT_TYPE_PENDING,
  UPDATE_DOCUMENT_TYPE_SUCCESS,
  UPDATE_DOCUMENT_TYPE_FAILED,
  DELETE_DOCUMENT_TYPE_PENDING,
  DELETE_DOCUMENT_TYPE_SUCCESS,
  DELETE_DOCUMENT_TYPE_FAILED,
  REQUEST_INVOICES_PENDING,
  REQUEST_INVOICES_SUCCESS,
  REQUEST_INVOICES_FAILED,
  REQUEST_INCOME_INVOICES_PENDING,
  REQUEST_INCOME_INVOICES_SUCCESS,
  REQUEST_INCOME_INVOICES_FAILED,
  REQUEST_OUTCOME_INVOICES_PENDING,
  REQUEST_OUTCOME_INVOICES_SUCCESS,
  REQUEST_OUTCOME_INVOICES_FAILED,
  REQUEST_INVOICE_PENDING,
  REQUEST_INVOICE_SUCCESS,
  REQUEST_INVOICE_FAILED,
  CREATE_INVOICE_PENDING,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILED,
  UPDATE_INVOICE_PENDING,
  UPDATE_INVOICE_SUCCESS,
  UPDATE_INVOICE_FAILED,
  DELETE_INVOICE_PENDING,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILED,
  REQUEST_INVOICES_ORGANIZATIONS_PENDING,
  REQUEST_INVOICES_ORGANIZATIONS_SUCCESS,
  REQUEST_INVOICES_ORGANIZATIONS_FAILED,
  REQUEST_INVOICES_VENDORS_PENDING,
  REQUEST_INVOICES_VENDORS_SUCCESS,
  REQUEST_INVOICES_VENDORS_FAILED,
  REQUEST_INVOICE_PRODUCTS_PENDING,
  REQUEST_INVOICE_PRODUCTS_SUCCESS,
  REQUEST_INVOICE_PRODUCTS_FAILED,
  REQUEST_INVOICE_PRODUCT_PENDING,
  REQUEST_INVOICE_PRODUCT_SUCCESS,
  REQUEST_INVOICE_PRODUCT_FAILED,
  CREATE_INVOICE_PRODUCT_PENDING,
  CREATE_INVOICE_PRODUCT_SUCCESS,
  CREATE_INVOICE_PRODUCT_FAILED,
  UPDATE_INVOICE_PRODUCT_PENDING,
  UPDATE_INVOICE_PRODUCT_SUCCESS,
  UPDATE_INVOICE_PRODUCT_FAILED,
  DELETE_INVOICE_PRODUCT_PENDING,
  DELETE_INVOICE_PRODUCT_SUCCESS,
  DELETE_INVOICE_PRODUCT_FAILED,
} from './constants';

import {
  authorizationData,
  dataApi,
  checkStatusCode,
} from '../common/utils';

export const handleLogin = (username, password) => (dispatch) => {
  dispatch({ type: REQUEST_LOGIN_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/login`, {
    headers: { 'Authorization': `Basic ${window.btoa(username + ':' + password)}` }
  })
    .then(respone => respone.json())
    .then(data => {
      localStorage.setItem('user', `Basic ${window.btoa(username + ':' + password)}`)
      dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data })
    })
    .catch(error => dispatch({ type: REQUEST_LOGIN_FAILED, payload: error }))
}

export const handleLogout = () => (dispatch) => {
  dispatch({
    type: REQUEST_LOG_OUT,
    payload: localStorage.removeItem('user')
  })
}

export const restStoreData = () => (dispatch) => {
  dispatch({ type: RESET_DATA });
}

export const fetchUsers = () => (dispatch) => {
  dispatch({ type: REQUEST_USERS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_USERS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_USERS_FAILED, payload: error }))
}

export const fetchUser = (id) => (dispatch) => {
  dispatch({ type: REQUEST_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, authorizationData())
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, REQUEST_USER_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_USER_FAILED, payload: error }))
}

export const createUser = (user) => (dispatch) => {
  dispatch({ type: CREATE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('post', user))
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, CREATE_USER_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_USER_FAILED, payload: error }))
}

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: UPDATE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users`, dataApi('put', user))
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, UPDATE_USER_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_USER_FAILED, payload: error }))
}

export const deleteUser = (id) => (dispatch) => {
  dispatch({ type: DELETE_USER_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/users/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_USER_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_USER_FAILED, payload: error }))
}

export const fetchRoles = () => (dispatch) => {
  dispatch({ type: REQUEST_ROLES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/roles`, authorizationData())
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, REQUEST_ROLES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_ROLES_FAILED, payload: error }))
}

export const fetchMyOrganizations = () => (dispatch) => {
  dispatch({ type: REQUEST_MY_ORGANIZATIONS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_MY_ORGANIZATIONS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_MY_ORGANIZATIONS_FAILED, payload: error }))
}

export const fetchMyOrganization = (id) => (dispatch) => {
  dispatch({ type: REQUEST_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_MY_ORGANIZATION_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: REQUEST_MY_ORGANIZATION_FAILED, payload: error }))
}

export const createMyOrganization = (myOrg) => (dispatch) => {
  dispatch({ type: CREATE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, dataApi('post', myOrg))
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, CREATE_MY_ORGANIZATION_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const updateMyOrganization = (myOrg) => (dispatch) => {
  dispatch({ type: UPDATE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations`, dataApi('put', myOrg))
    .then(respone => respone.json())
    .then(data => checkStatusCode(data, UPDATE_MY_ORGANIZATION_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const deleteMyOrganization = (id) => (dispatch) => {
  dispatch({ type: DELETE_MY_ORGANIZATION_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/my-organizations/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_MY_ORGANIZATION_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_MY_ORGANIZATION_FAILED, payload: error }))
}

export const fetchVendors = () => (dispatch) => {
  dispatch({ type: REQUEST_VENDORS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_VENDORS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_VENDORS_FAILED, payload: error }))
}

export const fetchVendor = (id) => (dispatch) => {
  dispatch({ type: REQUEST_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_VENDOR_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_VENDOR_FAILED, payload: error }))
}

export const createVendor = (vendor) => (dispatch) => {
  dispatch({ type: CREATE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('post', vendor))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_VENDOR_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_VENDOR_FAILED, payload: error }))
}

export const updateVendor = (vendor) => (dispatch) => {
  dispatch({ type: UPDATE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors`, dataApi('put', vendor))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_VENDOR_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_VENDOR_FAILED, payload: error }))
}

export const deleteVendor = (id) => (dispatch) => {
  dispatch({ type: DELETE_VENDOR_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vendors/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_VENDOR_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_VENDOR_FAILED, payload: error }))
}

export const fetchRegions = () => (dispatch) => {
  dispatch({ type: REQUEST_REGIONS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/regions`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_REGIONS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_REGIONS_FAILED, payload: error }))
}

export const fetchCategories = () => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORIES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_CATEGORIES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_CATEGORIES_FAILED, payload: error }))
}

export const fetchCategory = (id) => (dispatch) => {
  dispatch({ type: REQUEST_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_CATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_CATEGORY_FAILED, payload: error }))
}

export const createCategory = (category) => (dispatch) => {
  dispatch({ type: CREATE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('post', category))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_CATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_CATEGORY_FAILED, payload: error }))
}

export const updateCategory = (category) => (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories`, dataApi('put', category))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_CATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_CATEGORY_FAILED, payload: error }))
}

export const deleteCategory = (id) => (dispatch) => {
  dispatch({ type: DELETE_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/categories/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_CATEGORY_FAILED, payload: error }))
}

export const fetchSubcategories = () => (dispatch) => {
  dispatch({ type: REQUEST_SUBCATEGORIES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_SUBCATEGORIES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_SUBCATEGORIES_FAILED, payload: error }))
}

export const fetchSubcategoriesCategory = (categoryId) => (dispatch) => {
  dispatch({ type: REQUEST_SUBCATEGORIES_CATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories/category/${categoryId}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_SUBCATEGORIES_CATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_SUBCATEGORIES_CATEGORY_FAILED, payload: error }))
}

export const fetchSubcategory = (id) => (dispatch) => {
  dispatch({ type: REQUEST_SUBCATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_SUBCATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_SUBCATEGORY_FAILED, payload: error }))
}

export const createSubcategory = (subcategory) => (dispatch) => {
  dispatch({ type: CREATE_SUBCATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories`, dataApi('post', subcategory))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_SUBCATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_SUBCATEGORY_FAILED, payload: error }))
}

export const updateSubcategory = (subcategory) => (dispatch) => {
  dispatch({ type: UPDATE_SUBCATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories`, dataApi('put', subcategory))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_SUBCATEGORY_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_SUBCATEGORY_FAILED, payload: error }))
}

export const deleteSubcategory = (id) => (dispatch) => {
  dispatch({ type: DELETE_SUBCATEGORY_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/subcategories/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_SUBCATEGORY_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_SUBCATEGORY_FAILED, payload: error }))
}

export const fetchVatList = () => (dispatch) => {
  dispatch({ type: REQUEST_VAT_LIST_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vat`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_VAT_LIST_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_VAT_LIST_FAILED, payload: error }))
}

export const fetchVat = (id) => (dispatch) => {
  dispatch({ type: REQUEST_VAT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vat/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_VAT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_VAT_FAILED, payload: error }))
}

export const createVat = (vat) => (dispatch) => {
  dispatch({ type: CREATE_VAT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vat`, dataApi('post', vat))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_VAT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_VAT_FAILED, payload: error }))
}

export const updateVat = (vat) => (dispatch) => {
  dispatch({ type: UPDATE_VAT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vat`, dataApi('put', vat))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_VAT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_VAT_FAILED, payload: error }))
}

export const deleteVat = (id) => (dispatch) => {
  dispatch({ type: DELETE_VAT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/vat/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_VAT_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_VAT_FAILED, payload: error }))
}

export const fetchMeasuringUnits = () => (dispatch) => {
  dispatch({ type: REQUEST_MEASURING_UNITS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_MEASURING_UNITS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_MEASURING_UNITS_FAILED, payload: error }))
}

export const fetchMeasuringUnit = (id) => (dispatch) => {
  dispatch({ type: REQUEST_MEASURING_UNIT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/measuring-units/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_MEASURING_UNIT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_MEASURING_UNIT_FAILED, payload: error }))
}

export const createMeasuringUnit = (measuringUnit) => (dispatch) => {
  dispatch({ type: CREATE_MEASURING_UNIT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, dataApi('post', measuringUnit))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_MEASURING_UNIT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_MEASURING_UNIT_FAILED, payload: error }))
}

export const updateMeasuringUnit = (measuringUnit) => (dispatch) => {
  dispatch({ type: UPDATE_MEASURING_UNIT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/measuring-units`, dataApi('put', measuringUnit))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_MEASURING_UNIT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_MEASURING_UNIT_FAILED, payload: error }))
}

export const deleteMeasuringUnit = (id) => (dispatch) => {
  dispatch({ type: DELETE_MEASURING_UNIT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/measuring-units/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_MEASURING_UNIT_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_MEASURING_UNIT_FAILED, payload: error }))
}

export const fetchProducts = () => (dispatch) => {
  dispatch({ type: REQUEST_PRODUCTS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_PRODUCTS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_PRODUCTS_FAILED, payload: error }))
}

export const fetchProduct = (id) => (dispatch) => {
  dispatch({ type: REQUEST_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_PRODUCT_FAILED, payload: error }))
}

export const createProduct = (product) => (dispatch) => {
  dispatch({ type: CREATE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products`, dataApi('post', product))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_PRODUCT_FAILED, payload: error }))
}

export const updateProduct = (product) => (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products`, dataApi('put', product))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_PRODUCT_FAILED, payload: error }))
}

export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_PRODUCT_FAILED, payload: error }))
}

export const fetchProductByBarcode = (barcode) => (dispatch) => {
  dispatch({ type: REQUEST_PRODUCT_BY_BARCODE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products/barcodes/${barcode}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_PRODUCT_BY_BARCODE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_PRODUCT_BY_BARCODE_FAILED, payload: error }))
}

export const generateProductCode = () => (dispatch) => {
  dispatch({ type: GENERATE_PRODUCT_CODE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/products-code`, dataApi('post'))
    .then(response => response.json())
    .then(data => checkStatusCode(data, GENERATE_PRODUCT_CODE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: GENERATE_PRODUCT_CODE_FAILED, payload: error }))
}

export const generatePlu = () => (dispatch) => {
  dispatch({ type: GENERATE_PLU_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/plu`, dataApi('post'))
    .then(response => response.json())
    .then(data => checkStatusCode(data, GENERATE_PLU_SUCCESS, dispatch))
    .catch(error => dispatch({ type: GENERATE_PLU_FAILED, payload: error }))
}

export const generateBarcode = (barcode) => (dispatch) => {
  dispatch({ type: GENERATE_BARCODE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/barcodes`, dataApi('post', barcode))
    .then(response => response.json())
    .then(data => checkStatusCode(data, GENERATE_BARCODE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: GENERATE_BARCODE_FAILED, payload: error }))
}

export const fetchDocumentTypes = () => (dispatch) => {
  dispatch({ type: REQUEST_DOCUMENT_TYPES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/document-types`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_DOCUMENT_TYPES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_DOCUMENT_TYPES_FAILED, payload: error }))
}

export const fetchDocumentType = (id) => (dispatch) => {
  dispatch({ type: REQUEST_DOCUMENT_TYPE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/document-types/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_DOCUMENT_TYPE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const createDocumentType = (documentType) => (dispatch) => {
  dispatch({ type: CREATE_DOCUMENT_TYPE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/document-types`, dataApi('post', documentType))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_DOCUMENT_TYPE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const updateDocumentType = (documentType) => (dispatch) => {
  dispatch({ type: UPDATE_DOCUMENT_TYPE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/document-types`, dataApi('put', documentType))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_DOCUMENT_TYPE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const deleteDocumentType = (id) => (dispatch) => {
  dispatch({ type: DELETE_DOCUMENT_TYPE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/document-types/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_DOCUMENT_TYPE_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_DOCUMENT_TYPE_FAILED, payload: error }))
}

export const fetchInvoices = () => (dispatch) => {
  dispatch({ type: REQUEST_INVOICES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices`, authorizationData())
    .then(response => response.status === 404 ? [] : response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICES_FAILED, payload: error }))
}

export const fetchIncomeInvoices = () => (dispatch) => {
  dispatch({ type: REQUEST_INCOME_INVOICES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/income`, authorizationData())
    .then(response => response.status === 404 ? [] : response.json())
    .then(data => checkStatusCode(data, REQUEST_INCOME_INVOICES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INCOME_INVOICES_FAILED, payload: error }))
}

export const fetchOutComeInvoices = () => (dispatch) => {
  dispatch({ type: REQUEST_OUTCOME_INVOICES_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/outcome`, authorizationData())
    .then(response => response.status === 404 ? [] : response.json())
    .then(data => checkStatusCode(data, REQUEST_OUTCOME_INVOICES_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_OUTCOME_INVOICES_FAILED, payload: error }))
}

export const fetchInvoice = (id) => (dispatch) => {
  dispatch({ type: REQUEST_INVOICE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICE_FAILED, payload: error }))
}

export const createInvoice = (invoice) => (dispatch) => {
  dispatch({ type: CREATE_INVOICE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices`, dataApi('post', invoice))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_INVOICE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_INVOICE_FAILED, payload: error }))
}

export const updateInvoice = (invoice) => (dispatch) => {
  dispatch({ type: UPDATE_INVOICE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices`, dataApi('put', invoice))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_INVOICE_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_INVOICE_FAILED, payload: error }))
}

export const deleteInvoice = (id) => (dispatch) => {
  dispatch({ type: DELETE_INVOICE_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_INVOICE_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_INVOICE_FAILED, payload: error }))
}

export const fetchInvoiceOrganizations = () => (dispatch) => {
  dispatch({ type: REQUEST_INVOICES_ORGANIZATIONS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/my-organizations`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICES_ORGANIZATIONS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICES_ORGANIZATIONS_FAILED, payload: error }))
}

export const fetchInvoiceVendors = () => (dispatch) => {
  dispatch({ type: REQUEST_INVOICES_VENDORS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoices/vendors`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICES_VENDORS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICES_VENDORS_FAILED, payload: error }))
}

export const fetchInvoiceProducts = (invoiceId) => (dispatch) => {
  dispatch({ type: REQUEST_INVOICE_PRODUCTS_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoice-products/${invoiceId}`, authorizationData())
    .then(response => response.status === 404 ? [] : response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICE_PRODUCTS_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICE_PRODUCTS_FAILED, payload: error }))
}

export const fetchInvoiceProduct = (id) => (dispatch) => {
  dispatch({ type: REQUEST_INVOICE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product/${id}`, authorizationData())
    .then(response => response.json())
    .then(data => checkStatusCode(data, REQUEST_INVOICE_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: REQUEST_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const createInvoiceProduct = (invoiceProduct) => (dispatch) => {
  dispatch({ type: CREATE_INVOICE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product`, dataApi('post', invoiceProduct))
    .then(response => response.json())
    .then(data => checkStatusCode(data, CREATE_INVOICE_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: CREATE_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const updateInvoiceProduct = (invoiceProduct) => (dispatch) => {
  dispatch({ type: UPDATE_INVOICE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product`, dataApi('put', invoiceProduct))
    .then(response => response.json())
    .then(data => checkStatusCode(data, UPDATE_INVOICE_PRODUCT_SUCCESS, dispatch))
    .catch(error => dispatch({ type: UPDATE_INVOICE_PRODUCT_FAILED, payload: error }))
}

export const deleteInvoiceProduct = (id) => (dispatch) => {
  dispatch({ type: DELETE_INVOICE_PRODUCT_PENDING });
  fetch(`${ROOT_CONTEXT_PATH}/invoice-products/product/${id}`, dataApi('delete'))
    .then(respone => dispatch({ type: DELETE_INVOICE_PRODUCT_SUCCESS, payload: respone.status }))
    .catch(error => dispatch({ type: DELETE_INVOICE_PRODUCT_FAILED, payload: error }))
}