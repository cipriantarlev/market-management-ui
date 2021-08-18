import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchInvoiceProduct,
  createInvoiceProduct,
  updateInvoiceProduct,
  fetchMeasuringUnits,
  fetchInvoiceProducts,
  fetchProductByBarcode
} from '../actions';

import './style.css';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageInvoiceProducts.isPending,
    initialInvoiceProducts: state.manageInvoiceProducts.invoiceProducts,
    error: state.manageInvoiceProducts.error,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    productByBarcode: state.manageProducts.productByBarcode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInvoiceProduct: (id) => dispatch(fetchInvoiceProduct(id)),
    onCreateInvoiceProduct: (invoiceProduct) => dispatch(createInvoiceProduct(invoiceProduct)),
    onUpdateInvoiceProduct: (invoiceProduct) => dispatch(updateInvoiceProduct(invoiceProduct)),
    onFetchMeasuringUnits: () => dispatch(fetchMeasuringUnits()),
    onFetchInvoiceProducts: (invoiceId) => dispatch(fetchInvoiceProducts(invoiceId)),
    onFetchProductByBarcode: (barcode) => dispatch(fetchProductByBarcode(barcode)),
  }
}
const InvoiceProduct = (props) => {
  const {
    isPending,
    initialInvoiceProducts,
    error,
    measuringUnits,
    // productByBarcode,
    onFetchInvoiceProduct,
    onCreateInvoiceProduct,
    onUpdateInvoiceProduct,
    onFetchMeasuringUnits,
    onFetchInvoiceProducts,
    // onFetchProductByBarcode,
  } = props;

  let history = useHistory();
  const { id } = useParams();

  const [invoiceProduct, setInvoiceProduct] = useState({});
  const [selectedMeasuringUnit, setSelectedMeasuringUnit] = useState(0);

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer === true) {
      setInvoiceProduct({});
      setSelectedMeasuringUnit(0);
      history.goBack();
    }
  }

  useEffect(() => {
    onFetchMeasuringUnits()
  }, [onFetchMeasuringUnits])

  useEffect(() => {
    if (id !== "0") {
      onFetchInvoiceProduct(id);
    }
  }, [id, onFetchInvoiceProduct])

  const intializeMeasuringUnitValue = () => {
    if (initialInvoiceProducts.measuringUnit !== undefined) {
      setSelectedMeasuringUnit(initialInvoiceProducts.measuringUnit.id)
    }
  }

  useEffect(() => {
    if (id !== "0") {
      setInvoiceProduct(initialInvoiceProducts)
      intializeMeasuringUnitValue();
    } // eslint-disable-next-line
  }, [initialInvoiceProducts, id])

  const onChangeInvoiceProductValues = (event) => {
    switch (event.target.id) {
      case "formGridDocumentType":
        let measuringUnitObj = getDropDownValue(Number(event.target.value), selectedMeasuringUnit, setSelectedMeasuringUnit);
        setInvoiceProduct({ ...invoiceProduct, measuringUnit: measuringUnitObj });
        break;
      case "formGridOrganization":

        break;
      case "formGridVendor":

        break;
      case "formGridDateCreated":
        setInvoiceProduct({ ...invoiceProduct, dateCreated: event.target.value });
        break;
      case "formGridInvoiceNumber":
        setInvoiceProduct({ ...invoiceProduct, invoiceNumber: event.target.value });
        break;
      case "formGridInvoiceDate":
        setInvoiceProduct({ ...invoiceProduct, invoiceDate: event.target.value });
        break;
      case "formGridNote":
        setInvoiceProduct({ ...invoiceProduct, note: event.target.value });
        break;
      default:
        setInvoiceProduct(invoiceProduct);
        break;
    }
  }

  const getDropDownValue = (itemId, itemList, setItem) => {
    setItem(itemId);
    return itemList.find(item => item.id === itemId);
  }

  const onSubmitInvoiceProduct = () => {
    if (id !== "0") {
      onUpdateInvoiceProduct(invoiceProduct);
    } else {
      onCreateInvoiceProduct(invoiceProduct);
    }
    history.goBack();
    onFetchInvoiceProducts();
    setInvoiceProduct({});
    setSelectedMeasuringUnit(0);
  }

  return (
    <div>
      {error ? <div className="tc f2 red">Something went wrong!</div> : null}
      {!isPending ?
        <div className="container w-50 center mt3">
          <h3 className="mb4">Add New Product to Invoice</h3>
          <Form>
            <Form.Group as={Row} controlId="formGridInvoiceNumber">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >Invoice Number</Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  size="sm"
                  disabled
                  style={{
                    textAlign: 'right'
                  }}
                  value={1111}
                  onChange={onChangeInvoiceProductValues}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridBarcode">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Barcode</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Enter Barcode"
                  size="sm"
                  // value={invoice.invoiceNumber}
                  onChange={onChangeInvoiceProductValues}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formGridProductCoder">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Product Code</Form.Label>
              <Col sm="4">
                <Form.Control
                  type="text"
                  size="sm"
                  // value={invoice.invoiceNumber}
                  onChange={onChangeInvoiceProductValues}
                />
              </Col>
            </Form.Group>
                <Form.Group as={Row} controlId="formGridProductName">
                <Form.Label
                    column
                    sm="3"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Product Name</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      size="sm"
                      // value={invoice.invoiceNumber}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                  <Col sm="1">
                    <Form.Control
                      type="button"
                      size="sm"
                      className="form-button"
                      value={"+"}
                      onClick={() => alert('hello')}
                    />
                  </Col>
                </Form.Group>
                
            <Row>
              <Col>
                <Form.Group as={Row} controlId="formGridQuantity">
                  <Form.Label
                    column
                    sm="6"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Quantity</Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      size="sm"
                      style={{
                        textAlign: 'right'
                      }}
                      // value={invoice.invoiceNumber}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} controlId="formGridMeasuringUnti">
                  <Col sm="4">
                    <Form.Control
                      as="select"
                      size="sm"
                      value={selectedMeasuringUnit}
                      onChange={onChangeInvoiceProductValues}
                    >
                      {measuringUnits.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group as={Row} controlId="formGridVendorPrice">
                  <Form.Label
                    column
                    sm="6"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Vendor Price</Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      size="sm"
                      style={{
                        textAlign: 'right'
                      }}
                      // value={invoice.invoiceNumber}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} controlId="formGridSum">
                  <Form.Label
                    column
                    sm="5"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Sum</Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      size="sm"
                      style={{
                        textAlign: 'right'
                      }}
                      // value={invoice.invoiceNumber}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Row} controlId="formGridVatSum">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >VAT Sum</Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  size="sm"
                  style={{
                    textAlign: 'right'
                  }}
                  // value={invoice.invoiceNumber}
                  onChange={onChangeInvoiceProductValues}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col>
                <Form.Group as={Row} controlId="formGridRetailPrice">
                  <Form.Label
                    column
                    sm="6"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Retail Price</Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      size="sm"
                      style={{
                        textAlign: 'right'
                      }}
                      // value={invoice.invoiceNumber}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} controlId="formGridTradeMarginPercent">
                  <Form.Label
                    column
                    sm="5"
                    style={{
                      paddingTop: 0,
                      paddingBottom: 0
                    }}
                  >Trade Margin %</Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      size="sm"
                      style={{
                        textAlign: 'right'
                      }}
                      // value={invoice.note}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Row} controlId="formGridStock">
              <Form.Label
                column
                sm="3"
                style={{
                  paddingTop: 0,
                  paddingBottom: 0
                }}
              >Stock</Form.Label>
              <Col sm="3">
                <Form.Control
                  type="text"
                  size="sm"
                  disabled
                  // value={invoice.note}
                  onChange={onChangeInvoiceProductValues}
                />
              </Col>
            </Form.Group>
            <div>
              <Button
                className="mr5 w4 mt4"
                variant="primary"
                onClick={onSubmitInvoiceProduct}
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
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProduct);