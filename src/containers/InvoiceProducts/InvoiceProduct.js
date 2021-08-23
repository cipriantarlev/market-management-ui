import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchInvoiceProduct,
  createInvoiceProduct,
  updateInvoiceProduct,
  fetchMeasuringUnits,
  fetchInvoiceProducts,
  fetchProductByBarcode,
  restStoreData,
  fetchProducts,
} from '../actions';

import './style.css';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageInvoiceProducts.isPending,
    initialInvoiceProduct: state.manageInvoiceProducts.invoiceProduct,
    error: state.manageInvoiceProducts.error,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    productByBarcode: state.manageProducts.product,
    products: state.manageProducts.products,
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
    onRestData: () => dispatch(restStoreData()),
    onFetchProducts: () => dispatch(fetchProducts()),
  }
}
const InvoiceProduct = (props) => {
  const {
    isPending,
    initialInvoiceProduct,
    error,
    measuringUnits,
    productByBarcode,
    // products
    onFetchInvoiceProduct,
    onCreateInvoiceProduct,
    onUpdateInvoiceProduct,
    onFetchMeasuringUnits,
    // onFetchInvoiceProducts,
    onFetchProductByBarcode,
    onRestData,
    // onFetchProducts,
  } = props;

  let history = useHistory();
  const { id } = useParams();
  const { invoiceId } = useParams();

  const [invoiceProduct, setInvoiceProduct] = useState({});
  const [invoice, setInvoice] = useState({});
  const [product, setProduct] = useState({});
  const [selectedMeasuringUnit, setSelectedMeasuringUnit] = useState(0);

  const [vendorPrice, setVendorPrice] = useState(0);
  const [sum, setSum] = useState(0);
  const [vatSumProduct, setVatSum] = useState(0);
  const [tradeMarginProduct, setTradeMargin] = useState(0);
  const [retailPrice, setRetailPrice] = useState(0);

  console.log("productByBarcode", productByBarcode);

  useEffect(() => {
    onFetchMeasuringUnits()
  }, [onFetchMeasuringUnits])

  useEffect(() => {
    if (id !== "0") {
      onFetchInvoiceProduct(id);
    }
  }, [id, onFetchInvoiceProduct])

  useEffect(() => {
    setProduct(productByBarcode);
    intializeMeasuringUnitValue();
    intializeVendorPriceValue();
    intializeTradeMarginValue();
    intializeRetailPriceValue();
    setInvoice({ ...invoice, id: Number(invoiceId) })
    // eslint-disable-next-line
  }, [productByBarcode])

  const intializeMeasuringUnitValue = () => {
    if (initialInvoiceProduct?.product?.measuringUnit !== undefined && id !== "0") {
      setSelectedMeasuringUnit(initialInvoiceProduct?.product?.measuringUnit.id)
    }
    if (productByBarcode?.measuringUnit !== undefined) {
      setSelectedMeasuringUnit(productByBarcode?.measuringUnit.id)
    }
  }

  const intializeVendorPriceValue = () => {
    if (initialInvoiceProduct?.product?.discountPrice !== undefined && id !== "0") {
      setVendorPrice(initialInvoiceProduct?.product?.discountPrice)
    }
    if (productByBarcode?.discountPrice !== undefined) {
      setVendorPrice(productByBarcode?.discountPrice)
    }
  }

  const intializeSumValue = () => {
    if (initialInvoiceProduct?.totalDiscountPrice !== undefined && id !== "0") {
      setSum(initialInvoiceProduct?.totalDiscountPrice)
    }
  }

  const intializeVatSumValue = () => {
    if (initialInvoiceProduct?.vatSum !== undefined && id !== "0") {
      setVatSum(initialInvoiceProduct?.vatSum)
    }
  }

  const intializeTradeMarginValue = () => {
    if (initialInvoiceProduct?.product?.tradeMargin !== undefined && id !== "0") {
      setTradeMargin(initialInvoiceProduct?.product?.tradeMargin)
    }
    if (productByBarcode?.tradeMargin !== undefined) {
      setTradeMargin(productByBarcode?.tradeMargin)
    }
  }

  const intializeRetailPriceValue = () => {
    if (initialInvoiceProduct?.product?.retailPrice !== undefined && id !== "0") {
      setRetailPrice(initialInvoiceProduct?.product?.retailPrice)
    }
    if (productByBarcode?.retailPrice !== undefined) {
      setRetailPrice(productByBarcode?.retailPrice)
    }
  }

  useEffect(() => {
    if (id !== "0") {
      setInvoiceProduct(initialInvoiceProduct);
      setInvoice(initialInvoiceProduct?.invoice);
      setProduct(initialInvoiceProduct?.product);
      intializeMeasuringUnitValue();
      intializeVendorPriceValue();
      intializeSumValue();
      intializeVatSumValue();
      intializeTradeMarginValue();
      intializeRetailPriceValue();
    }// eslint-disable-next-line
  }, [initialInvoiceProduct, id])

  const displayNnumberWith2Decimals = (numberTodisplay) => {
    if (isNaN(numberTodisplay)) {
      return Number(0).toFixed(2);
    } else {
      return Number(numberTodisplay).toFixed(2);
    }
  }

  const displayQuantityValueBasedOnMeasuringUnit = (numberTodisplay) => {
    if (isNaN(numberTodisplay)) {
      return ""
    } else {
      if (product?.measuringUnit?.id === 1) {
        return Number(numberTodisplay).toFixed(4);
      } else if (product?.measuringUnit?.id === 2) {
        return Number(numberTodisplay);
      }
    }
  }

  const onChangeInvoiceProductValues = (event) => {
    switch (event.target.id) {
      case "formGridQuantity":
        if (vendorPrice !== null || vendorPrice !== undefined) {
          setSum(vendorPrice * Number(event.target.value));
          setVatSum(vendorPrice * Number(event.target.value) * (product?.vat?.value / 100))
        }
        setInvoiceProduct({ ...invoiceProduct, quantity: Number(event.target.value) });
        break;
      case "formGridVendorPrice":
        console.log()
        if (invoiceProduct?.quantity !== null || invoiceProduct?.quantity !== undefined) {
          setSum(invoiceProduct?.quantity * Number(event.target.value));
          setVatSum(invoiceProduct?.quantity * Number(event.target.value) * (product?.vat?.value / 100))
          setTradeMargin((retailPrice * 100) / Number(event.target.value) - 100);
        }
        setVendorPrice(Number(event.target.value));
        break;
      case "formGridSum":
        if (invoiceProduct?.quantity !== null || invoiceProduct?.quantity !== undefined) {
          setVendorPrice(Number(event.target.value) / invoiceProduct?.quantity);
          setVatSum(Number(event.target.value) * (product?.vat?.value / 100))
        }
        setSum(Number(event.target.value));
        break;
      case "formGridRetailPrice":
        if (vendorPrice !== null || vendorPrice !== undefined) {
          setTradeMargin(((Number(event.target.value) * 100) / vendorPrice - 100))
        }
        setRetailPrice(Number(event.target.value));
        break;
      case "formGridTradeMarginPercent":
        if (vendorPrice !== null || vendorPrice !== undefined) {
          setRetailPrice(vendorPrice * (Number(event.target.value) / 100 + 1))
        }
        setTradeMargin(Number(event.target.value));
        break;
      default:
        setInvoiceProduct(invoiceProduct);
        break;
    }
  }

  const onPressEnterBarcodeField = (event) => {
    if (event.keyCode === 13 || event.keyCode === 9) {
      onFetchProductByBarcode(event.target.value)
    }
  }

  const prepareInvoiceProductForSubmit = () => {
    Object.assign(product, product, {
      discountPrice: vendorPrice,
      retailPrice: retailPrice,
      tradeMargin: tradeMarginProduct,
      stock: invoiceProduct.quantity,
    })

    Object.assign(invoiceProduct, invoiceProduct, {
      invoice: invoice,
      product: product,
      totalDiscountPrice: sum,
      totalRetailPrice: retailPrice * invoiceProduct.quantity,
      vatSum: vatSumProduct,
    })
  }

  console.log("invoiceProduct", invoiceProduct);

  const onSubmitInvoiceProduct = () => {
    prepareInvoiceProductForSubmit();
    console.log("invoiceProduct", invoiceProduct);
    if (id !== "0") {
      onUpdateInvoiceProduct(invoiceProduct);
    } else {
      onCreateInvoiceProduct(invoiceProduct);
    }
    history.goBack();
    setInvoiceProduct({});
    setInvoice({});
    setProduct({});
    setSelectedMeasuringUnit(0);
    setVendorPrice(0);
    setSum(0);
    setVatSum(0);
    setTradeMargin(0);
    setRetailPrice(0);
    onRestData();
  }

  const addNewProduct = () => {
    history.push("/products/0")
  }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer === true) {
      setInvoiceProduct({});
      setInvoice({});
      setProduct({});
      setSelectedMeasuringUnit(0);
      setVendorPrice(0);
      setSum(0);
      setVatSum(0);
      setTradeMargin(0);
      setRetailPrice(0);
      onRestData();
      history.goBack();
    }
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
                  readOnly
                  style={{
                    textAlign: 'right'
                  }}
                  value={invoice?.id}
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
                  placeholder="Find by Barcode"
                  size="sm"
                  value={invoiceProduct?.product?.barcodes[0].value}
                  onKeyDown={onPressEnterBarcodeField}
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
                  disabled
                  readOnly
                  value={product?.productCode?.value}
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
              <Col sm="7">
                <Form.Control
                  type="text"
                  size="sm"
                  placeholder="Click 🔎︎ to find product by name"
                  value={product?.nameRom}
                />
              </Col>
              <Col sm="1">
                <Form.Control
                  type="button"
                  size="sm"
                  className="form-button"
                  value={"🔎︎"}
                  onClick={() => alert("let's find a product")}
                />
              </Col>
              <Col sm="1">
                <Form.Control
                  type="button"
                  size="sm"
                  className="form-button"
                  value={"+"}
                  onClick={addNewProduct}
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
                      value={displayQuantityValueBasedOnMeasuringUnit(invoiceProduct?.quantity)}
                      onChange={onChangeInvoiceProductValues}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} controlId="formGridMeasuringUnt">
                  <Col sm="4">
                    <Form.Control
                      as="select"
                      size="sm"
                      disabled
                      readOnly
                      value={selectedMeasuringUnit}
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
                      value={displayNnumberWith2Decimals(vendorPrice)}
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
                      value={displayNnumberWith2Decimals(sum)}
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
                  disabled
                  readOnly
                  style={{
                    textAlign: 'right'
                  }}
                  value={displayNnumberWith2Decimals(vatSumProduct)}
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
                      value={displayNnumberWith2Decimals(retailPrice)}
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
                      value={displayNnumberWith2Decimals(tradeMarginProduct)}
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
                  readOnly
                  value={displayQuantityValueBasedOnMeasuringUnit(product?.stock)}
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