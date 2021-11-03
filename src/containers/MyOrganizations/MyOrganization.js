import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchMyOrganization,
  createMyOrganization,
  updateMyOrganization,
  fetchMyOrganizations
} from '../actions';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';
import InvalidFieldText from '../../common/InvalidFieldText';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageMyOrganizations.isPending,
    myOrganization: state.manageMyOrganizations.myOrganization,
    error: state.manageMyOrganizations.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyOrganization: (id) => dispatch(fetchMyOrganization(id)),
    onCreateMyOrganization: (myOrg) => dispatch(createMyOrganization(myOrg)),
    onUpdateMyOrganization: (myOrg) => dispatch(updateMyOrganization(myOrg)),
    onFetchMyOrganizations: () => dispatch(fetchMyOrganizations()),
  }
}

const MyOrganizations = (props) => {

  const {
    isPending,
    myOrganization,
    error,
    onFetchMyOrganization,
    onCreateMyOrganization,
    onUpdateMyOrganization,
    onFetchMyOrganizations
  } = props;

  const COMPANY_NAME_HELP_BLOCK = "companyNameHeloBlock";

  let history = useHistory();
  const { id } = useParams();

  const [myOrg, setMyOrg] = useState({});
  const [openAlert, setOpenAlert] = useState(true);
  const [invalidCompanyName, setInvalidCompanyName] = useState(false);

  useEffect(() => {
    if (id !== "0") {
      onFetchMyOrganization(id);
    }
  }, [id, onFetchMyOrganization])

  useEffect(() => {
    if (id !== "0") {
      setMyOrg(myOrganization)
    }
  }, [myOrganization, id])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/my-organizations") : null;
  }

  const checkForNull = (org) => (org.note !== null ? org.note : '')

  const onChangeOrgValues = (event) => {
    switch (event.target.id) {
      case "formGridCompanyName":
        if (event.target.value.match("^[a-zA-Z0-9\\s]*$")) {
          setInvalidCompanyName(false);
        } else {
          setInvalidCompanyName(true);
        }
        console.log("InvalidCompanyName", invalidCompanyName);
        setMyOrg({ ...myOrg, name: event.target.value });
        break;
      case "formGridVatCode":
        setMyOrg({ ...myOrg, vatCode: event.target.value });
        break;
      case "formGridBankName":
        setMyOrg({ ...myOrg, bank: event.target.value });
        break;
      case "formGridCity":
        setMyOrg({ ...myOrg, city: event.target.value });
        break;
      case "formGridFiscalCode":
        setMyOrg({ ...myOrg, fiscalCode: event.target.value });
        break;
      case "formGridPhoneNumber":
        setMyOrg({ ...myOrg, phoneNumber: event.target.value });
        break;
      case "formGridBankAccount":
        setMyOrg({ ...myOrg, bankAccount: event.target.value });
        break;
      case "formGridEmail":
        setMyOrg({ ...myOrg, email: event.target.value });
        break;
      case "formGridNote":
        setMyOrg({ ...myOrg, note: event.target.value });
        break;
      default:
        setMyOrg({ ...myOrg });
        break;
    }
  }

  const isMyOrganizationReadyToBeSubmitted = () => {
    return invalidCompanyName === false;
  }

  const onSubmitMyOrganization = (event) => {
    if(isMyOrganizationReadyToBeSubmitted()) {
      if (id !== "0") {
        onUpdateMyOrganization(myOrg);
      } else {
        onCreateMyOrganization(myOrg);
      }
      onFetchMyOrganizations();
      history.push("/my-organizations");
    }
  }

  return (
    <div className="w-60 center mt4">
      {error ?
        <DisplayAlert
          error={error}
          open={openAlert}
          setOpen={setOpenAlert}
        /> : null}
      {!isPending ?
        <Form onSubmit={onSubmitMyOrganization}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={myOrg.name}
                required={true}
                isInvalid={invalidCompanyName}
                onChange={onChangeOrgValues}
                aria-describedby={COMPANY_NAME_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidCompanyName}
                message={"My Organization name should contain only letters, numbers and spaces"}
                ariaDescribedbyId={COMPANY_NAME_HELP_BLOCK}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridVatCode">
              <Form.Label>VAT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter VAT Code"
                value={myOrg.vatCode}
                required={true}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridBankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bank Name"
                value={myOrg.bank}
                required={true}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={myOrg.city}
                required={true}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridFiscalCode">
              <Form.Label>Fiscal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Fiscal Code"
                value={myOrg.fiscalCode}
                required={true}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={myOrg.phoneNumber}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridBankAccount">
              <Form.Label>Bank Account</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Bank Account"
                value={myOrg.bankAccount}
                required={true}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={myOrg.email}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group
            as={Col}
            controlId="formGridNote"
            style={{ padding: 0 }}
          >
            <Form.Label>Note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter note"
              value={checkForNull(myOrg)}
              onChange={onChangeOrgValues}
            />
          </Form.Group>
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
        : <ProgressLoading />
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrganizations);