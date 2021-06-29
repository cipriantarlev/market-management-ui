import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const MyOrganizations = () => {

  return (
    <div className="w-60 center mt4">
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Name"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridVatCode">
            <Form.Label>VAT Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter VAT Code"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridBankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Bank Name"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter City"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridFiscalCode">
            <Form.Label>Fiscal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Fiscal Code"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridBankAccount">
            <Form.Label>Bank Account</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Bank Account"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
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
          />
        </Form.Group>
        <div>
          <Button
            className="mr5 w4"
            variant="primary"
          >
            Submit
          </Button>
          <Button
            className="btn btn-warning ml5 w4"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MyOrganizations;