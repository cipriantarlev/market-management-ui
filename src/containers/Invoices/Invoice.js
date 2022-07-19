import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchInvoice,
  createInvoice,
  updateInvoice,
  fetchInvoiceOrganizations,
  fetchInvoiceVendors,
} from '../../actions/invoiceAction';
import { restStoreData } from '../../actions/restoreDataAction';
import { fetchDocumentTypes } from '../../actions/documentTypeAction';
import { hideNavBar, showNavBar } from '../../actions/navBarAction';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

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
    onFetchInvoiceOrganizations: () => dispatch(fetchInvoiceOrganizations()),
    onFetchInvoiceVendors: () => dispatch(fetchInvoiceVendors()),
    onRestData: () => dispatch(restStoreData()),
    hideNavBar: () => dispatch(hideNavBar()),
    showNavBar: () => dispatch(showNavBar()),
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
    onFetchInvoiceOrganizations,
    onFetchInvoiceVendors,
    onRestData,
    hideNavBar,
    showNavBar,
  } = props;

  const INVOICE_NUMBER_HELP_BLOCK = "invoiceNumberHelpBlock";
  const NOTE_HELP_BLOCK = "noteHelpBlock";

  const [invalidDocumentType, setInvalidDocumentType] = useState(false);
  const [invalidOrganization, setInvalidOrganization] = useState(false);
  const [invalidVendor, setInvalidVendor] = useState(false);
  const [invalidInvoiceNumber, setInvalidInvoiceNumber] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();

  const [invoice, setInvoice] = useState({});
  const [selectedDocumentType, setSelectedDocumentType] = useState(0);
  const [selectedOrganization, setSelectedOrganization] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState(0);

  const pushHistory = (path1, path2) => {
    if (location.pathname.includes('/income-invoices')) {
      history.push(path1);
    }
    if (location.pathname.includes('/outcome-invoices')) {
      history.push(path2);
    }
  }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer === true) {
      resetAllAndSubmit();
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

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false);
    hideNavBar();
    return () => {
      showNavBar();
    }
    // eslint-disable-next-line
  }, [])

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
        setInvalidDocumentType(false);
        break;
      case "formGridOrganization":
        let organizationObj = getDropDownValue(Number(event.target.value), organizations, setSelectedOrganization);
        setInvoice({ ...invoice, myOrganization: organizationObj });
        setInvalidOrganization(false);
        break;
      case "formGridVendor":
        let vendorObj = getDropDownValue(Number(event.target.value), vendors, setSelectedVendor);
        setInvoice({ ...invoice, vendor: vendorObj });
        setInvalidVendor(false);
        break;
      case "formGridDateCreated":
        setInvoice({ ...invoice, dateCreated: event.target.value });
        break;
      case "formGridInvoiceNumber":
        validateInputValue(setInvalidInvoiceNumber, "^[a-zA-Z0-9]+$", event);
        setInvoice({ ...invoice, invoiceNumber: event.target.value });
        break;
      case "formGridInvoiceDate":
        setInvoice({ ...invoice, invoiceDate: event.target.value });
        break;
      case "formGridNote":
        validateInputValue(setInvalidNote, "^[a-zA-Z0-9\\s.,:;-]+$", event);
        setInvoice({ ...invoice, note: event.target.value });
        break;
      default:
        setInvoice(invoice);
        break;
    }
  }

  const addNewVendor = () => {
    history.push("/vendors/0");
  }

  const getDropDownValue = (itemId, itemList, setItem) => {
    setItem(itemId);
    return itemList.find(item => item.id === itemId);
  }

  const resetAllAndSubmit = () => {
    pushHistory("/income-invoices", "/outcome-invoices");
    onRestData();
    setInvoice({});
    setSelectedDocumentType(0);
    setSelectedVendor(0);
    setSelectedOrganization(0);
  }

  const getTodayDate = () => (new Date().toJSON().slice(0, 10))

  const isInvoiceReadyToBeSubmitted = () => (
    !invalidDocumentType && !invalidOrganization &&
    !invalidVendor && !invalidInvoiceNumber && !invalidNote &&
    selectedOrganization !== 0 && selectedDocumentType !== 0 &&
    selectedVendor !== 0
  )

  const markIvalidFields = () => {
    setInvalidDocumentType(selectedDocumentType === 0);
    setInvalidOrganization(selectedOrganization === 0);
    setInvalidVendor(selectedVendor === 0);
  }

  const onSubmitInvoice = (event) => {
    if (isInvoiceReadyToBeSubmitted()) {
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
      resetAllAndSubmit();
    } else {
      preventSubmitIfInvalidInput(event);
      markIvalidFields();
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
        <div className="container w-50 center mt4">
          <h3 className="mb5">Add New Invoice</h3>
          <Form onSubmit={onSubmitInvoice}>
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
                  isInvalid={invalidDocumentType}
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
                  isInvalid={invalidOrganization}
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
              <Col sm="8">
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedVendor}
                  isInvalid={invalidVendor}
                  onChange={onChangeInvoiceValues}
                >
                  <option>{'--Select Vendor--'}</option>
                  {vendors.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col sm="1">
                <Form.Control
                  type="button"
                  size="sm"
                  id="AddVendor"
                  className="form-button"
                  value={"+"}
                  onClick={addNewVendor}
                />
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
                  required={true}
                  value={invoice.invoiceNumber}
                  onChange={onChangeInvoiceValues}
                  isInvalid={invalidInvoiceNumber}
                  aria-describedby={INVOICE_NUMBER_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidInvoiceNumber}
                  message={"Invoice number should contain only letters and numbers."}
                  ariaDescribedbyId={INVOICE_NUMBER_HELP_BLOCK}
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
                  isInvalid={invalidNote}
                  aria-describedby={NOTE_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidNote}
                  message={"Note should contain alphanumeric character, space, dot, comma, colons, semicolons and dash."}
                  ariaDescribedbyId={NOTE_HELP_BLOCK}
                />
              </Col>
            </Form.Group>
            <div>
              <Button
                className="mr5 w4 mt4"
                variant="primary"
                type="submit"
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
        : <ProgressLoading />
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);