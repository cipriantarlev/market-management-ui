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

  let history = useHistory();
  const { id } = useParams();

  const [myOrg, setMyOrg] = useState({});

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

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/my-organizations") : null;
  }

  const checkForNull = (org) => (org.note !== null ? org.note : '')

  const onChangeOrgValues = (event) => {
    switch (event.target.id) {
      case "formGridCompanyName":
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

  const onSubmitMyOrganization = () => {
    if (id !== "0") {
      onUpdateMyOrganization(myOrg);
    } else {
      onCreateMyOrganization(myOrg);
    }
    onFetchMyOrganizations();
    history.push("/my-organizations");
  }

  return (
    <div className="w-60 center mt4">
      {!isPending ?
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCompanyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={myOrg.name}
                onChange={onChangeOrgValues}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridVatCode">
              <Form.Label>VAT Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter VAT Code"
                value={myOrg.vatCode}
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
                onChange={onChangeOrgValues}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={myOrg.city}
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
              onClick={onSubmitMyOrganization}
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
        : <h3>Loading data ...</h3>
      }
      {error ? <div style={{ color: 'red', textAlign: 'center', margin: 20, fontSize: '2em' }}>Error! Something went wrong!!!</div> : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrganizations);