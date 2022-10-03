import { combineReducers } from 'redux';

import {
    requestLogin,
    requestLogout
} from './authReducer';

import { fetchUsers } from './userReducer';
import { manageMyOrganizations } from './myOrganizationReducer';
import { manageVendors } from './vendorReducer';
import { manageCategories } from './categoryReducer';
import { manageSubcategories } from './subcategoryReducer';
import { manageVat } from './vatReducer';
import { manageMeasuringUnits } from './measuringUnitReducer';
import { manageProducts } from './productReducer';
import { generateProductCode } from './productCodeReducer';
import { generatePlu } from './pluReducer';
import { generateBarcode } from './barcodeReducer';
import { manageDocumentTypes } from './documentTypeReducer';
import { manageInvoices } from './invoiceReducer';
import { manageInvoiceProducts } from './invoiceProductReducer';
import { handleNavBar } from './navBarReducer';
import { managePriceChangingActs } from './priceChangingActReducer';
import { managePriceChangingActProducts } from './priceChangingActProductReducer';

export const rootReducer = combineReducers({
    requestLogin,
    requestLogout,
    fetchUsers,
    manageMyOrganizations,
    manageVendors,
    manageCategories,
    manageSubcategories,
    manageVat,
    manageMeasuringUnits,
    manageProducts,
    generateProductCode,
    generatePlu,
    generateBarcode,
    manageDocumentTypes,
    manageInvoices,
    manageInvoiceProducts,
    handleNavBar,
    managePriceChangingActs,
    managePriceChangingActProducts,
});