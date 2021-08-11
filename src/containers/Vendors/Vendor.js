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

  let history = useHistory();
  const { id } = useParams();

  const [vendor, setVendor] = useState({});
  const [selectedRegion, setSelectedRegion] = useState(0);

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

  const intializeRegionValue = () => {
    if(initialVendor.region !== undefined){
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
        setVendor({ ...vendor, name: event.target.value });
        break;
      case "formGridBankName":
        setVendor({ ...vendor, bank: event.target.value });
        break;
      case "formGridPhoneNumber":
        setVendor({ ...vendor, phoneNumber: event.target.value });
        break;
      case "formGridFiscalCode":
        setVendor({ ...vendor, fiscalCode: event.target.value });
        break;
      case "formGridPostalCode":
        setVendor({ ...vendor, postalCode: event.target.value });
        break;
      case "formGridBankAccount":
        setVendor({ ...vendor, bankAccount: event.target.value });
        break;
      case "formGridBusinessAddress":
        setVendor({ ...vendor, businessAddress: event.target.value });
        break;
      case "formGridCurrency":
        setVendor({ ...vendor, currency: event.target.value });
        break;
      case "formGridVendorType":
        setVendor({ ...vendor, vendorType: event.target.value });
        break;
      case "formGridVatCode":
        setVendor({ ...vendor, vatCode: event.target.value });
        break;
      case "formGridVendorLegalType":
        setVendor({ ...vendor, vendorLegalType: event.target.value });
        break;
      case "formGridCity":
        setVendor({ ...vendor, city: event.target.value });
        break;
      case "formGridNote":
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

  const onSubmitVendor = () => {
    if (id !== "0") {
      onUpdateVendor(vendor);
    } else {
      onCreateVendor(vendor);
    }
    history.push("/vendors");
    onFetchVendors();
  }

  return (
    <div>
      {error ? <div className="tc f2 red">Something went wrong!</div> : null}
      {!isPending ?
        <div className="container w-80 center mt4">
          <Form>
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
                  value={vendor.name}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridRegion">
                Region
                <Form.Control
                  as="select"
                  size="sm"
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
                  value={vendor.bank}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhoneNumber">
                Phone Number
                <Form.Control
                  type="text"
                  placeholder="Enter Phone Number"
                  size="sm"
                  value={vendor.phoneNumber}
                  onChange={onChangeVendorValues}
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
                  value={vendor.fiscalCode}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPostalCode">
                Postal Code
                <Form.Control
                  type="text"
                  placeholder="Enter Postal Code"
                  size="sm"
                  value={vendor.postalCode}
                  onChange={onChangeVendorValues}
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
                  value={vendor.bankAccount}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridBusinessAddress">
                Business Address
                <Form.Control
                  type="text"
                  placeholder="Enter Business Address"
                  size="sm"
                  value={vendor.businessAddress}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCurrency">
                Currency
                <Form.Control
                  as="select"
                  size="sm"
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
                  value={vendor.vatCode}
                  onChange={onChangeVendorValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorLegalType">
                Vendor Legal Type
                <Form.Control
                  as="select"
                  size="sm"
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
                  value={vendor.city}
                  onChange={onChangeVendorValues}
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
                />
              </Form.Group>
            </Form.Row>
            <div>
              <Button
                className="mr5 w4"
                variant="primary"
                onClick={onSubmitVendor}
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
        : <h3>Loading data...</h3>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendor);