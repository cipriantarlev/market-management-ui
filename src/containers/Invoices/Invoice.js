import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchInvoice,
  createInvoice,
  updateInvoice,
  fetchDocumentTypes,
  fetchInvoices,
  fetchInvoiceOrganizations,
  fetchInvoiceVendors,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageInvoices.isPending,
    initialInvoice: state.manageInvoices.invoice,
    error: state.manageInvoices.error,
    documentTypes: state.manageDocumentTypes.documentTypes,
    organizations: state.manageInvoices.invoiceOrganizations,
    vendors: state.manageInvoices.invoiceVendors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInvoice: (id) => dispatch(fetchInvoice(id)),
    onCreateInvoice: (invoice) => dispatch(createInvoice(invoice)),
    onUpdateInvoice: (invoice) => dispatch(updateInvoice(invoice)),
    onFetchDocumentTypes: () => dispatch(fetchDocumentTypes()),
    onFetchInvoices: () => dispatch(fetchInvoices()),
    onFetchInvoiceOrganizations: () => dispatch(fetchInvoiceOrganizations()),
    onFetchInvoiceVendors: () => dispatch(fetchInvoiceVendors()),
  }
}

const Invoice = (props) => {
  const {
    isPending,
    initialInvoice,
    error,
    documentTypes,
    organizations,
    vendors,
    onFetchInvoice,
    onCreateInvoice,
    onUpdateInvoice,
    onFetchDocumentTypes,
    onFetchInvoices,
    onFetchInvoiceOrganizations,
    onFetchInvoiceVendors,
  } = props;

  let history = useHistory();
  const { id } = useParams();

  const [invoice, setInvoice] = useState({});
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);
  const [selectedOrganization, setSelectedOrganization] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState(0);

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer === true) {
      setInvoice({});
      setSelectedDocumentType(0);
      setSelectedVendor(0);
      setSelectedOrganization(0);
      history.push("/invoices")
    }
  }

  useEffect(() => {
    onFetchDocumentTypes();
    onFetchInvoiceOrganizations();
    onFetchInvoiceVendors();
  }, [onFetchDocumentTypes, onFetchInvoiceOrganizations, onFetchInvoiceVendors])

  useEffect(() => {
    if (id !== "0") {
      onFetchInvoice(id);
    }
  }, [id, onFetchInvoice])

  const intializeDocumentTYpeValue = () => {
    if (initialInvoice.documentType !== undefined) {
      setSelectedDocumentType(initialInvoice.documentType.id)
    }
  }

  const intializeOrganizationValue = () => {
    if (initialInvoice.myOrganization !== undefined) {
      setSelectedOrganization(initialInvoice.myOrganization.id)
    }
  }

  const intializeVendorValue = () => {
    if (initialInvoice.vendor !== undefined) {
      setSelectedVendor(initialInvoice.vendor.id)
    }
  }

  useEffect(() => {
    if (id !== "0") {
      setInvoice(initialInvoice)
      intializeDocumentTYpeValue();
      intializeOrganizationValue();
      intializeVendorValue();
    } // eslint-disable-next-line
  }, [initialInvoice, id])

  const onChangeInvoiceValues = (event) => {
    switch (event.target.id) {
      case "formGridDocumentType":
        let documentTypeObj = getDropDownValue(Number(event.target.value), documentTypes, setSelectedDocumentType);
        setInvoice({ ...invoice, documentType: documentTypeObj });
        break;
      case "formGridOrganization":
        let organizationObj = getDropDownValue(Number(event.target.value), organizations, setSelectedOrganization);
        setInvoice({ ...invoice, myOrganization: organizationObj });
        break;
      case "formGridVendor":
        let vendorObj = getDropDownValue(Number(event.target.value), vendors, setSelectedVendor);
        setInvoice({ ...invoice, vendor: vendorObj });
        break;
      case "formGridDateCreated":
        setInvoice({ ...invoice, dateCreated: event.target.value });
        break;
      case "formGridInvoiceNumber":
        setInvoice({ ...invoice, invoiceNumber: event.target.value });
        break;
      case "formGridInvoiceDate":
        setInvoice({ ...invoice, invoiceDate: event.target.value });
        break;
      case "formGridNote":
        setInvoice({ ...invoice, note: event.target.value });
        break;
      default:
        setInvoice(invoice);
        break;
    }
  }

  const getDropDownValue = (itemId, itemList, setItem) => {
    setItem(itemId);
    return itemList.find(item => item.id === itemId);
  }

  const getTodayDate = () => (new Date().toJSON().slice(0, 10))

  const onSubmitInvoice = () => {
    if (id !== "0") {
      onUpdateInvoice(invoice);
    } else {
      setInvoice(Object.assign(invoice, invoice,
        {
          dateCreated: getTodayDate(),
          invoiceDate: getTodayDate()
        }));
      onCreateInvoice(invoice);
    }
    history.push("/invoices");
    onFetchInvoices();
    setInvoice({});
    setSelectedDocumentType(0);
    setSelectedVendor(0);
    setSelectedOrganization(0);
  }

  return (
    <div>
      {error ? <div className="tc f2 red">Something went wrong!</div> : null}
      {!isPending ?
        <div className="container w-50 center mt4">
          <h3 className="mb5">Add New Invoice</h3>
          <Form>
            <Form.Group
              as={Row}
              controlId="formGridDocumentType"
            >
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >
                Document Type</Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedDocumentType}
                  onChange={onChangeInvoiceValues}
                >
                  <option>{'--Select Document Type--'}</option>
                  {documentTypes.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridOrganization">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Organization</Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedOrganization}
                  onChange={onChangeInvoiceValues}
                >
                  <option>{'--Select Organization--'}</option>
                  {organizations.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridVendor">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Vendor</Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedVendor}
                  onChange={onChangeInvoiceValues}
                >
                  <option>{'--Select Vendor--'}</option>
                  {vendors.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridDateCreated">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Creation Date</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date"
                  placeholder="Enter Phone Number"
                  size="sm"
                  defaultValue={getTodayDate()}
                  value={invoice.dateCreated}
                  onChange={onChangeInvoiceValues}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridInvoiceNumber">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Invoice Number</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter Invoice Number"
                  size="sm"
                  value={invoice.invoiceNumber}
                  onChange={onChangeInvoiceValues}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridInvoiceDate">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Invoice Date</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="date"
                  placeholder="Enter Invoice Date"
                  size="sm"
                  defaultValue={getTodayDate()}
                  value={invoice.invoiceDate}
                  onChange={onChangeInvoiceValues}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridNote">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Note</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter Note"
                  size="sm"
                  value={invoice.note}
                  onChange={onChangeInvoiceValues}
                />
              </Col>
            </Form.Group>
            <div>
              <Button
                className="mr5 w4 mt4"
                variant="primary"
                onClick={onSubmitInvoice}
              >
                Submit
              </Button>
              <Button
                className="btn btn-warning ml5 w4 mt4"
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

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);