import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
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
import { 
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

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

  const COMPANY_NAME_HELP_BLOCK = "companyNameHelpBlock";
  const VAT_CODE_HELP_BLOCK = "vatCodeHelpBlock";
  const BANK_NAME_HELP_BLOCK = "bankNameHelpBlock";
  const CITY_HELP_BLOCK = "cityHelpBlock";
  const FISCAL_CODE_HELP_BLOCK = "fiscalCodeHelpBlock";
  const PHONE_NUMBER_HELP_BLOCK = "phoneNumberHelpBlock";
  const BANK_ACCOUNT_HELP_BLOCK = "bankAccountHelpBlock";
  const EMAIL_HELP_BLOCK = "emailHelpBlock";
  const NOTE_HELP_BLOCK = "noteHelpBlock";

  let history = useHistory();
  const { id } = useParams();

  const [myOrg, setMyOrg] = useState({});
  const [openAlert, setOpenAlert] = useState(true);

  const [invalidCompanyName, setInvalidCompanyName] = useState(false);
  const [invalidVatCode, setInvalidVatCode] = useState(false);
  const [invalidBankName, setInvalidBankName] = useState(false);
  const [invalidCity, setInvalidCity] = useState(false);
  const [invalidFiscalCode, setInvalidFiscalCode] = useState(false);
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [invalidBankAccount, setInvalidBankAccount] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidNote, setInvalidNote] = useState(false);

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
        validateInputValue(setInvalidCompanyName, "^[a-zA-Z0-9\\s]+$", event);
        setMyOrg({ ...myOrg, name: event.target.value });
        break;
      case "formGridVatCode":
        validateInputValue(setInvalidVatCode, "^[0-9]+$", event);
        setMyOrg({ ...myOrg, vatCode: event.target.value });
        break;
      case "formGridBankName":
        validateInputValue(setInvalidBankName, "^[a-zA-Z0-9-.\\s]+$", event);
        setMyOrg({ ...myOrg, bank: event.target.value });
        break;
      case "formGridCity":
        validateInputValue(setInvalidCity, "^[a-zA-Z0-9\\s]+$", event);
        setMyOrg({ ...myOrg, city: event.target.value });
        break;
      case "formGridFiscalCode":
        validateInputValue(setInvalidFiscalCode, "^[0-9]+$", event);
        setMyOrg({ ...myOrg, fiscalCode: event.target.value });
        break;
      case "formGridPhoneNumber":
        validateInputValue(setInvalidPhoneNumber, "^[0-9-]+$", event);
        setMyOrg({ ...myOrg, phoneNumber: event.target.value });
        break;
      case "formGridBankAccount":
        validateInputValue(setInvalidBankAccount, "^[0-9]+$", event);
        setMyOrg({ ...myOrg, bankAccount: event.target.value });
        break;
      case "formGridEmail":
        validateInputValue(setInvalidEmail, "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", event);
        setMyOrg({ ...myOrg, email: event.target.value });
        break;
      case "formGridNote":
        validateInputValue(setInvalidNote, "^[a-zA-Z0-9\\s.,:;-]+$", event);
        setMyOrg({ ...myOrg, note: event.target.value });
        break;
      default:
        setMyOrg({ ...myOrg });
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
           invalidEmail === false &&
           invalidNote === false;
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
    } else {
      preventSubmitIfInvalidInput(event);
    }
  }

  return (
    <div className="w-60 center mt4">
      <DisplayAlert
          error={error}
          open={openAlert}
          setOpen={setOpenAlert}
        />
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
                message={"My Organization name should contain only letters, numbers and spaces."}
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
                isInvalid={invalidVatCode}
                onChange={onChangeOrgValues}
                aria-describedby={VAT_CODE_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidVatCode}
                message={"Vat Code should contain only numbers."}
                ariaDescribedbyId={VAT_CODE_HELP_BLOCK}
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
                isInvalid={invalidBankName}
                aria-describedby={BANK_NAME_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidBankName}
                message={"Bank should contain only letters, numbers, . and -."}
                ariaDescribedbyId={BANK_NAME_HELP_BLOCK}
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
                isInvalid={invalidCity}
                aria-describedby={CITY_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidCity}
                message={"City should contain only letters and numbers."}
                ariaDescribedbyId={CITY_HELP_BLOCK}
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
                isInvalid={invalidFiscalCode}
                aria-describedby={FISCAL_CODE_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidFiscalCode}
                message={"Fiscal Code should contain only numbers."}
                ariaDescribedbyId={FISCAL_CODE_HELP_BLOCK}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone Number"
                value={myOrg.phoneNumber}
                onChange={onChangeOrgValues}
                isInvalid={invalidPhoneNumber}
                aria-describedby={PHONE_NUMBER_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidPhoneNumber}
                message={"Phone number should contain only dash and numbers. Example: 255-545-54"}
                ariaDescribedbyId={PHONE_NUMBER_HELP_BLOCK}
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
                isInvalid={invalidBankAccount}
                aria-describedby={BANK_ACCOUNT_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidBankAccount}
                message={"Bank Account should contain only numbers."}
                ariaDescribedbyId={BANK_ACCOUNT_HELP_BLOCK}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={myOrg.email}
                onChange={onChangeOrgValues}
                isInvalid={invalidEmail}
                aria-describedby={EMAIL_HELP_BLOCK}
              />
              <InvalidFieldText 
                isInvalid={invalidEmail}
                message={"Email should respect the pattern: email@email.com."}
                ariaDescribedbyId={EMAIL_HELP_BLOCK}
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
              isInvalid={invalidNote}
              aria-describedby={NOTE_HELP_BLOCK}
            />
            <InvalidFieldText 
              isInvalid={invalidNote}
              message={"Note should contain alphanumeric character, space, dot, comma, colons, semicolons and dash."}
              ariaDescribedbyId={NOTE_HELP_BLOCK}
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