import {
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
  UPDATE_INVOICE_IS_APPROVED_PENDING,
  UPDATE_INVOICE_IS_APPROVED_SUCCESS,
  UPDATE_INVOICE_IS_APPROVED_FAILED,
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
  RESET_DATA,
} from './constants';

const initialStateLogin = {
  isPeding: false,
  response: {},
  error: false,
  user: localStorage.getItem('user') ? true : false
}

export const requestLogin = (state = initialStateLogin, action = {}) => {
  switch (action.type) {
    case REQUEST_LOGIN_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_LOGIN_SUCCESS:
      return Object.assign({}, state, { response: action.payload, isPeding: false, user: localStorage.getItem('user') });
    case REQUEST_LOGIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    default:
      return state;
  }
}

const initialStateLogout = {
  user: localStorage.getItem('user')
}

export const requestLogout = (state = initialStateLogout, action = {}) => {
  switch (action.type) {
    case REQUEST_LOG_OUT:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}

const initialStateUsers = {
  isPeding: false,
  users: [],
  error: false,
  user: {},
  roles: [],
  status: ''
}

export const fetchUsers = (state = initialStateUsers, action = {}) => {
  switch (action.type) {
    case REQUEST_USERS_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.payload, isPeding: false });
    case REQUEST_USERS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case REQUEST_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case REQUEST_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case REQUEST_ROLES_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case REQUEST_ROLES_SUCCESS:
      return Object.assign({}, state, { roles: action.payload, isPeding: false });
    case REQUEST_ROLES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case CREATE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case CREATE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case CREATE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case UPDATE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, { user: action.payload, isPeding: false });
    case UPDATE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    case DELETE_USER_PENDING:
      return Object.assign({}, state, { isPeding: true });
    case DELETE_USER_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPeding: false });
    case DELETE_USER_FAILED:
      return Object.assign({}, state, { error: action.payload, isPeding: false });
    default:
      return state;
  }
}

const initialStateMyOrganizations = {
  isPending: false,
  myOrganizations: [],
  error: false,
  myOrganization: {},
  status: ''
}

export const manageMyOrganizations = (state = initialStateMyOrganizations, action = {}) => {
  switch (action.type) {
    case REQUEST_MY_ORGANIZATIONS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MY_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, { myOrganizations: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATIONS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case REQUEST_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case CREATE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { myOrganization: action.payload, isPending: false });
    case UPDATE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_MY_ORGANIZATION_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_MY_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_MY_ORGANIZATION_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  }
}

const initialStateVendor = {
  isPending: false,
  vendors: [],
  error: false,
  vendor: {},
  status: '',
  regions: []
}

export const manageVendors = (state = initialStateVendor, action = {}) => {
  switch (action.type) {
    case REQUEST_VENDORS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_VENDORS_SUCCESS:
      return Object.assign({}, state, { vendors: action.payload, isPending: false });
    case REQUEST_VENDORS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_VENDOR_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_VENDOR_SUCCESS:
      return Object.assign({}, state, { vendor: action.payload, isPending: false });
    case REQUEST_VENDOR_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_VENDOR_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_VENDOR_SUCCESS:
      return Object.assign({}, state, { vendor: action.payload, isPending: false });
    case CREATE_VENDOR_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_VENDOR_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_VENDOR_SUCCESS:
      return Object.assign({}, state, { vendor: action.payload, isPending: false });
    case UPDATE_VENDOR_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_VENDOR_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_VENDOR_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_VENDOR_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_REGIONS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_REGIONS_SUCCESS:
      return Object.assign({}, state, { regions: action.payload, isPending: false });
    case REQUEST_REGIONS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateVendor;
    default:
      return state;
  }
}

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

const initialStateVat = {
  isPending: false,
  fetchVatPending: false,
  fetchVatError: false,
  vatList: [],
  error: false,
  vat: {},
  status: '',
}

export const manageVat = (state = initialStateVat, action = {}) => {
  switch (action.type) {
    case REQUEST_VAT_LIST_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_VAT_LIST_SUCCESS:
      return Object.assign({}, state, { vatList: action.payload, isPending: false });
    case REQUEST_VAT_LIST_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_VAT_PENDING:
      return Object.assign({}, state, { fetchVatPending: true });
    case REQUEST_VAT_SUCCESS:
      return Object.assign({}, state, { vat: action.payload, fetchVatPending: false });
    case REQUEST_VAT_FAILED:
      return Object.assign({}, state, { fetchVatError: action.payload, fetchVatPending: false });
    case CREATE_VAT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_VAT_SUCCESS:
      return Object.assign({}, state, { vat: action.payload, isPending: false });
    case CREATE_VAT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_VAT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_VAT_SUCCESS:
      return Object.assign({}, state, { vat: action.payload, isPending: false });
    case UPDATE_VAT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_VAT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_VAT_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_VAT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateVat;
    default:
      return state;
  }
}

const initialStateMeasuringUnits = {
  isPending: false,
  fetchMeasuringUnitPending: false,
  fetchMeasuringUnitError: false,
  measuringUnits: [],
  error: false,
  measuringUnit: {},
  status: '',
}

export const manageMeasuringUnits = (state = initialStateMeasuringUnits, action = {}) => {
  switch (action.type) {
    case REQUEST_MEASURING_UNITS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_MEASURING_UNITS_SUCCESS:
      return Object.assign({}, state, { measuringUnits: action.payload, isPending: false });
    case REQUEST_MEASURING_UNITS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_MEASURING_UNIT_PENDING:
      return Object.assign({}, state, { fetchMeasuringUnitPending: true });
    case REQUEST_MEASURING_UNIT_SUCCESS:
      return Object.assign({}, state, { measuringUnit: action.payload, fetchMeasuringUnitPending: false });
    case REQUEST_MEASURING_UNIT_FAILED:
      return Object.assign({}, state, { fetchMeasuringUnitError: action.payload, fetchMeasuringUnitPending: false });
    case CREATE_MEASURING_UNIT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_MEASURING_UNIT_SUCCESS:
      return Object.assign({}, state, { measuringUnit: action.payload, isPending: false });
    case CREATE_MEASURING_UNIT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_MEASURING_UNIT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_MEASURING_UNIT_SUCCESS:
      return Object.assign({}, state, { measuringUnit: action.payload, isPending: false });
    case UPDATE_MEASURING_UNIT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_MEASURING_UNIT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_MEASURING_UNIT_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_MEASURING_UNIT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateMeasuringUnits;
    default:
      return state;
  }
}

const initialStateProduct = {
  isPending: false,
  products: [],
  error: false,
  product: {},
  status: '',
}

export const manageProducts = (state = initialStateProduct, action = {}) => {
  switch (action.type) {
    case REQUEST_PRODUCTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { products: action.payload, isPending: false });
    case REQUEST_PRODUCTS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_PRODUCT_SUCCESS:
      return Object.assign({}, state, { product: action.payload, isPending: false });
    case REQUEST_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { product: action.payload, isPending: false });
    case CREATE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { product: action.payload, isPending: false });
    case UPDATE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_PRODUCT_BY_BARCODE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_PRODUCT_BY_BARCODE_SUCCESS:
      return Object.assign({}, state, { product: action.payload, isPending: false });
    case REQUEST_PRODUCT_BY_BARCODE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateProduct;
    default:
      return state;
  }
}

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

const initialStateDocumentTypes = {
  isPending: false,
  fetchDocumentTypePending: false,
  fetchDocumentTypeError: false,
  documentTypes: [],
  error: false,
  documentType: {},
  status: '',
}

export const manageDocumentTypes = (state = initialStateDocumentTypes, action = {}) => {
  switch (action.type) {
    case REQUEST_DOCUMENT_TYPES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_DOCUMENT_TYPES_SUCCESS:
      return Object.assign({}, state, { documentTypes: action.payload, isPending: false });
    case REQUEST_DOCUMENT_TYPES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_DOCUMENT_TYPE_PENDING:
      return Object.assign({}, state, { fetchDocumentTypePending: true });
    case REQUEST_DOCUMENT_TYPE_SUCCESS:
      return Object.assign({}, state, { documentType: action.payload, fetchDocumentTypePending: false });
    case REQUEST_DOCUMENT_TYPE_FAILED:
      return Object.assign({}, state, { fetchDocumentTypeError: action.payload, fetchDocumentTypePending: false });
    case CREATE_DOCUMENT_TYPE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_DOCUMENT_TYPE_SUCCESS:
      return Object.assign({}, state, { documentType: action.payload, isPending: false });
    case CREATE_DOCUMENT_TYPE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_DOCUMENT_TYPE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_DOCUMENT_TYPE_SUCCESS:
      return Object.assign({}, state, { documentType: action.payload, isPending: false });
    case UPDATE_DOCUMENT_TYPE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_DOCUMENT_TYPE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_DOCUMENT_TYPE_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_DOCUMENT_TYPE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateDocumentTypes;
    default:
      return state;
  }
}

const initialStateInvoice = {
  isPending: false,
  invoices: [],
  error: false,
  invoice: {},
  status: '',
  invoiceOrganizations: [],
  invoiceOrganizationsIsPending: false,
  invoiceOrganizationsError: false,
  invoiceVendors: [],
  invoiceVendorsIsPending: false,
  invoiceVendorsError: false,
  isApprovedModified: 0,
}

export const manageInvoices = (state = initialStateInvoice, action = {}) => {
  switch (action.type) {
    case REQUEST_INVOICES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INVOICES_SUCCESS:
      return Object.assign({}, state, { invoices: action.payload, isPending: false });
    case REQUEST_INVOICES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_INCOME_INVOICES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INCOME_INVOICES_SUCCESS:
      return Object.assign({}, state, { invoices: action.payload, isPending: false });
    case REQUEST_INCOME_INVOICES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_OUTCOME_INVOICES_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_OUTCOME_INVOICES_SUCCESS:
      return Object.assign({}, state, { invoices: action.payload, isPending: false });
    case REQUEST_OUTCOME_INVOICES_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_INVOICE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INVOICE_SUCCESS:
      return Object.assign({}, state, { invoice: action.payload, isPending: false });
    case REQUEST_INVOICE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_INVOICE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_INVOICE_SUCCESS:
      return Object.assign({}, state, { invoice: action.payload, isPending: false });
    case CREATE_INVOICE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_INVOICE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_INVOICE_SUCCESS:
      return Object.assign({}, state, { invoice: action.payload, isPending: false });
    case UPDATE_INVOICE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_INVOICE_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_INVOICE_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_INVOICE_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_INVOICES_ORGANIZATIONS_PENDING:
      return Object.assign({}, state, { invoiceOrganizationsIsPending: true });
    case REQUEST_INVOICES_ORGANIZATIONS_SUCCESS:
      return Object.assign({}, state, { invoiceOrganizations: action.payload, invoiceOrganizationsIsPending: false });
    case REQUEST_INVOICES_ORGANIZATIONS_FAILED:
      return Object.assign({}, state, { invoiceOrganizationsError: action.payload, invoiceOrganizationsIsPending: false });
    case REQUEST_INVOICES_VENDORS_PENDING:
      return Object.assign({}, state, { invoiceVendorsIsPending: true });
    case REQUEST_INVOICES_VENDORS_SUCCESS:
      return Object.assign({}, state, { invoiceVendors: action.payload, invoiceVendorsIsPending: false });
    case REQUEST_INVOICES_VENDORS_FAILED:
      return Object.assign({}, state, { invoiceVendorsError: action.payload, invoiceVendorsIsPending: false });
    case UPDATE_INVOICE_IS_APPROVED_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_INVOICE_IS_APPROVED_SUCCESS:
      return Object.assign({}, state, { isApprovedModified: action.payload, isPending: false });
    case UPDATE_INVOICE_IS_APPROVED_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateInvoice;
    default:
      return state;
  }
}

const initialStateInvoiceProducts = {
  isPending: false,
  invoiceProducts: [],
  error: false,
  invoiceProduct: {},
  status: '',
}

export const manageInvoiceProducts = (state = initialStateInvoiceProducts, action = {}) => {
  switch (action.type) {
    case REQUEST_INVOICE_PRODUCTS_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INVOICE_PRODUCTS_SUCCESS:
      return Object.assign({}, state, { invoiceProducts: action.payload, isPending: false });
    case REQUEST_INVOICE_PRODUCTS_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case REQUEST_INVOICE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case REQUEST_INVOICE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
    case REQUEST_INVOICE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case CREATE_INVOICE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case CREATE_INVOICE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
    case CREATE_INVOICE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case UPDATE_INVOICE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case UPDATE_INVOICE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { invoiceProduct: action.payload, isPending: false });
    case UPDATE_INVOICE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case DELETE_INVOICE_PRODUCT_PENDING:
      return Object.assign({}, state, { isPending: true });
    case DELETE_INVOICE_PRODUCT_SUCCESS:
      return Object.assign({}, state, { status: action.payload, isPending: false });
    case DELETE_INVOICE_PRODUCT_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    case RESET_DATA:
      return initialStateInvoiceProducts;
    default:
      return state;
  }
}