import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchVendor,
  createVendor,
  updateVendor,
  fetchRegions,
  fetchVendors
} from '../actions';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageVendors.isPending,
    initialVendor: state.manageVendors.vendor,
    error: state.manageVendors.error,
    regions: state.manageVendors.regions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVendor: (id) => dispatch(fetchVendor(id)),
    onCreateVendor: (vendor) => dispatch(createVendor(vendor)),
    onUpdateVendor: (vendor) => dispatch(updateVendor(vendor)),
    onFetchRegions: () => dispatch(fetchRegions()),
    onFetchVendors: () => dispatch(fetchVendors()),
  }
}

const Vendor = (props) => {

  const {
    isPending,
    initialVendor,
    error,
    regions,
    onFetchVendor,
    onCreateVendor,
    onUpdateVendor,
    onFetchRegions,
    onFetchVendors
  } = props;

  const COMPANY_NAME_HELP_BLOCK = "companyNameHelpBlock";
  const VAT_CODE_HELP_BLOCK = "vatCodeHelpBlock";
  const BANK_NAME_HELP_BLOCK = "bankNameHelpBlock";
  const CITY_HELP_BLOCK = "cityHelpBlock";
  const FISCAL_CODE_HELP_BLOCK = "fiscalCodeHelpBlock";
  const PHONE_NUMBER_HELP_BLOCK = "phoneNumberHelpBlock";
  const BANK_ACCOUNT_HELP_BLOCK = "bankAccountHelpBlock";
  const BUSINESS_ADDRESS_HELP_BLOCK = "businessAddressHelpBlock";
  const NOTE_HELP_BLOCK = "noteHelpBlock";
  const POSTAL_CODE_HELP_BLOCK = "postalCodeHelpBlock";

  let history = useHistory();
  const { id } = useParams();

  const [vendor, setVendor] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(0);

  const [openAlert, setOpenAlert] = useState(false);

  const [invalidCompanyName, setInvalidCompanyName] = useState(false);
  const [invalidVatCode, setInvalidVatCode] = useState(false);
  const [invalidBankName, setInvalidBankName] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [invalidFiscalCode, setInvalidFiscalCode] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidBankAccount, setInvalidBankAccount] = useState(false);
  const [invalidBusinessAddress, setInvalidBusinessAddress] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);
  const [invalidPostalCode, setInvalidPostalCode] = useState(false);

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/vendors") : null;
  }

  const currencies = ['--Select Currency Value--', 'MDL', 'USD', 'EURO'];
  const vendorTypes = ['--Select Vendor Type Value--', 'Supplier', 'Buyer'];
  const vendorLegalTypes = ['--Select Vendor Legal Type Value--', 'Legal entity', 'Individual'];

  useEffect(() => {
    onFetchRegions();
  }, [onFetchRegions])

  useEffect(() => {
    if (id !== "0") {
      onFetchVendor(id);
    }
  }, [id, onFetchVendor])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const intializeRegionValue = () => {
    if (initialVendor.region !== undefined) {
      setSelectedRegion(initialVendor.region.id);
    }
  }

  useEffect(() => {
    intializeRegionValue();
    if (id !== "0") {
      setVendor(initialVendor)
    } // eslint-disable-next-line
  }, [initialVendor, id])

  const onChangeVendorValues = (event) => {
    switch (event.target.id) {
      case "formGridCompanyName":
        validateInputValue(setInvalidCompanyName, "^[a-zA-Z0-9\\s]+$", event);
        setVendor({ ...vendor, name: event.target.value });
        break;
      case "formGridBankName":
        validateInputValue(setInvalidBankName, "^[a-zA-Z0-9-.\\s]+$", event);
        setVendor({ ...vendor, bank: event.target.value });
        break;
      case "formGridPhoneNumber":
        validateInputValue(setInvalidPhoneNumber, "^[0-9-]+$", event);
        setVendor({ ...vendor, phoneNumber: event.target.value });
        break;
      case "formGridFiscalCode":
        validateInputValue(setInvalidFiscalCode, "^[0-9]+$", event);
        setVendor({ ...vendor, fiscalCode: event.target.value });
        break;
      case "formGridPostalCode":
        validateInputValue(setInvalidPostalCode, "^[a-zA-Z0-9-]+$", event);
        setVendor({ ...vendor, postalCode: event.target.value });
        break;
      case "formGridBankAccount":
        validateInputValue(setInvalidBankAccount, "^[0-9]+$", event);
        setVendor({ ...vendor, bankAccount: event.target.value });
        break;
      case "formGridBusinessAddress":
        validateInputValue(setInvalidBusinessAddress, "^[a-zA-Z0-9\\s:\"'\\-ăâîșşțţÂĂÎȘŞȚŢ,]+$", event);
        setVendor({ ...vendor, businessAddress: event.target.value });
        break;
      case "formGridCurrency":
        setVendor({ ...vendor, currency: event.target.value });
        break;
      case "formGridVendorType":
        setVendor({ ...vendor, vendorType: event.target.value });
        break;
      case "formGridVatCode":
        validateInputValue(setInvalidVatCode, "^[0-9]+$", event);
        setVendor({ ...vendor, vatCode: event.target.value });
        break;
      case "formGridVendorLegalType":
        setVendor({ ...vendor, vendorLegalType: event.target.value });
        break;
      case "formGridCity":
        validateInputValue(setInvalidCity, "^[a-zA-Z0-9-ăâîșşțţÂĂÎȘŞȚŢ\\s]+$", event);
        setVendor({ ...vendor, city: event.target.value });
        break;
      case "formGridNote":
        validateInputValue(setInvalidNote, "^[a-zA-Z0-9\\s.,:;-]+$", event);
        setVendor({ ...vendor, note: event.target.value });
        break;
      case "formGridRegion":
        let regionObj = regions.find(region => region.id === Number(event.target.value))
        setSelectedRegion(Number(event.target.value));
        setVendor(Object.assign(vendor, vendor, { region: regionObj }));
        break;
      default:
        setVendor(vendor);
        break;
    }
  }

  const isMyOrganizationReadyToBeSubmitted = () => {
    return invalidCompanyName === false &&
      invalidVatCode === false &&
      invalidBankName === false &&
      invalidCity === false &&
      invalidFiscalCode === false &&
      invalidPhoneNumber === false &&
      invalidBankAccount === false &&
      invalidBusinessAddress === false &&
      invalidNote === false &&
      invalidPostalCode === false;
  }

  const onSubmitVendor = (event) => {
    if (isMyOrganizationReadyToBeSubmitted()) {
      if (id !== "0") {
        onUpdateVendor(vendor);
      } else {
        onCreateVendor(vendor);
      }
      onFetchVendors();
      history.push("/vendors");
    } else {
      preventSubmitIfInvalidInput(event);
    }
  }

  return (
    <div>
      <DisplayAlert
          error={error}
          open={openAlert}
          setOpen={setOpenAlert}
        />
      {!isPending ?
        <div className="container w-80 center mt4">
          <Form onSubmit={onSubmitVendor}>
            <Form.Row>
              <Form.Group
                as={Col}
                controlId="formGridCompanyName"
              >
                Company Name
                <Form.Control
                  type="text"
                  placeholder="Enter Company Name"
                  size="sm"
                  required={true}
                  value={vendor.name}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidCompanyName}
                  aria-describedby={COMPANY_NAME_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidCompanyName}
                    message={"Vendor name should contain only letters and numbers."}
                    ariaDescribedbyId={COMPANY_NAME_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRegion">
                Region
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={selectedRegion}
                  onChange={onChangeVendorValues}
                >
                  <option>{'--Select Vendor Region--'}</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridBankName">
                Bank Name
                <Form.Control
                  type="text"
                  placeholder="Enter Bank Name"
                  size="sm"
                  required={true}
                  value={vendor.bank}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidBankName}
                  aria-describedby={BANK_NAME_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidBankName}
                    message={"Bank should contain only letters, numbers, . and -."}
                    ariaDescribedbyId={BANK_NAME_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhoneNumber">
                Phone Number
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number"
                  size="sm"
                  required={true}
                  value={vendor.phoneNumber}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidPhoneNumber}
                  aria-describedby={PHONE_NUMBER_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidPhoneNumber}
                    message={"Phone number should contain only numbers and dash. Example 254-548-52."}
                    ariaDescribedbyId={PHONE_NUMBER_HELP_BLOCK}
                  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridFiscalCode">
                Fiscal Code
                <Form.Control
                  type="text"
                  placeholder="Enter Fiscal Code"
                  size="sm"
                  required={true}
                  value={vendor.fiscalCode}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidFiscalCode}
                  aria-describedby={FISCAL_CODE_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidFiscalCode}
                    message={"Fiscal code should contain only numbers."}
                    ariaDescribedbyId={FISCAL_CODE_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPostalCode">
                Postal Code
                <Form.Control
                  type="text"
                  placeholder="Enter Postal Code"
                  size="sm"
                  required={true}
                  value={vendor.postalCode}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidPostalCode}
                  aria-describedby={POSTAL_CODE_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidPostalCode}
                    message={"Postal code should contain only letters, numbers and -."}
                    ariaDescribedbyId={POSTAL_CODE_HELP_BLOCK}
                  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridBankAccount">
                Bank Account
                <Form.Control
                  type="text"
                  placeholder="Enter Bank Account"
                  size="sm"
                  required={true}
                  value={vendor.bankAccount}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidBankAccount}
                  aria-describedby={BANK_ACCOUNT_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidBankAccount}
                    message={"Bank account should contain only numbers."}
                    ariaDescribedbyId={BANK_ACCOUNT_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBusinessAddress">
                Business Address
                <Form.Control
                  type="text"
                  placeholder="Enter Business Address"
                  size="sm"
                  required={true}
                  value={vendor.businessAddress}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidBusinessAddress}
                  aria-describedby={BUSINESS_ADDRESS_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidBusinessAddress}
                    message={"Business address should contain only letters, numbers, ', \", -, :."}
                    ariaDescribedbyId={BUSINESS_ADDRESS_HELP_BLOCK}
                  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCurrency">
                Currency
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={vendor.currency}
                  onChange={onChangeVendorValues}
                >
                  {currencies.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorType">
                VendorType
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={vendor.vendorType}
                  onChange={onChangeVendorValues}
                >
                  {vendorTypes.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridVatCode">
                VAT Code
                <Form.Control
                  type="text"
                  placeholder="Enter VAT Code"
                  size="sm"
                  required={true}
                  value={vendor.vatCode}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidVatCode}
                  aria-describedby={VAT_CODE_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidVatCode}
                    message={"Vat code should contain only numbers."}
                    ariaDescribedbyId={VAT_CODE_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorLegalType">
                Vendor Legal Type
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={vendor.vendorLegalType}
                  onChange={onChangeVendorValues}
                >
                  {vendorLegalTypes.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                City
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  size="sm"
                  required={true}
                  value={vendor.city}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidCity}
                  aria-describedby={CITY_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidCity}
                    message={"City should contain only letters and numbers."}
                    ariaDescribedbyId={CITY_HELP_BLOCK}
                  />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNote">
                Note
                <Form.Control
                  type="text"
                  placeholder="Enter Note"
                  size="sm"
                  value={vendor.note}
                  onChange={onChangeVendorValues}
                  isInvalid={invalidNote}
                  aria-describedby={NOTE_HELP_BLOCK}
                  />
                  <InvalidFieldText 
                    isInvalid={invalidNote}
                    message={"Note should contain alphanumeric character, space, dot, comma, colons, semicolons and dash."}
                    ariaDescribedbyId={NOTE_HELP_BLOCK}
                  />
              </Form.Group>
            </Form.Row>
            <div>
              <Button
                className="mr5 w4"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="btn btn-warning ml5 w4"
                onClick={onClickCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </div>
        : <ProgressLoading />
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);