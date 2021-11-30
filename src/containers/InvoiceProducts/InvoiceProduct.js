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
  fetchProductByBarcode,
  restStoreData,
} from '../actions';

import FindProduct from './FindProduct';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

import './style.css';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageInvoiceProducts.isPending,
    initialInvoiceProduct: state.manageInvoiceProducts.invoiceProduct,
    error: state.manageInvoiceProducts.error,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    productByBarcode: state.manageProducts.product,
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
  }
}
const InvoiceProduct = (props) => {
  const {
    isPending,
    initialInvoiceProduct,
    error,
    measuringUnits,
    productByBarcode,
    onFetchInvoiceProduct,
    onCreateInvoiceProduct,
    onUpdateInvoiceProduct,
    onFetchMeasuringUnits,
    onFetchProductByBarcode,
    onRestData,
  } = props;

  const BARCODE_HELP_BLOCK = "barcodeHelpBlock";
  const QUANTITY_HELP_BLOCK = "quntityHelpBlock";
  const VENDOR_PRICE_HELP_BLOCK = "vendorPriceHelpBlock";
  const RETAIL_PRICE_HELP_BLOCK = "retailPriceHelpBlock";
  const TRADE_MARGIN_HELP_BLOCK = "tradeMarginHelpBlock";
  const SUM_HELP_BLOCK = "sumHelpBlock";

  const [invalidBarcode, setInvalidBarcode] = useState(false);
  const [invalidQuantity, setInvalidQuantity] = useState(false);
  const [invalidVendorPrice, setInvalidVendorPrice] = useState(false);
  const [invalidRetailPrice, setInvalidRetailPrice] = useState(false);
  const [invalidTradeMargin, setInvalidTradeMargin] = useState(false);
  const [invalidSum, setInvalidSum] = useState(false);

  const history = useHistory();
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

  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

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

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  const onFindProductByName = () => {
    setOpenDialog(true);
  }

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
    } else if (numberTodisplay === 0) {
      return Number(0).toFixed(2);
    } else {
      return Math.round(numberTodisplay * 100) / 100;
    }
  }

  const displayQuantityValueBasedOnMeasuringUnit = (numberTodisplay) => {
    if (isNaN(numberTodisplay)) {
      return ""
    } else {
      if (product?.measuringUnit?.id === 1) {
        return Math.round(numberTodisplay * 100) / 100;
      } else if (product?.measuringUnit?.id === 2) {
        return Math.round(numberTodisplay * 100) / 100;
      }
    }
  }

  const onChangeInvoiceProductValues = (event) => {
    switch (event.target.id) {
      case "formGridQuantity":
        if (validateInputValue(setInvalidQuantity, "^(\\d{1,6}|\\d{0,6}\\.\\d{1,4})$", event)) {
          if (vendorPrice !== null || vendorPrice !== undefined) {
            setSum(vendorPrice * event.target.value);
            setVatSum(vendorPrice * event.target.value * (product?.vat?.value / 100))
          }
        }
        setInvoiceProduct({ ...invoiceProduct, quantity: event.target.value });
        break;
      case "formGridVendorPrice":
        if (validateInputValue(setInvalidVendorPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
          if (invoiceProduct?.quantity !== null || invoiceProduct?.quantity !== undefined) {
            setSum(invoiceProduct?.quantity * event.target.value);
            setVatSum(invoiceProduct?.quantity * event.target.value * (product?.vat?.value / 100));
            setTradeMargin(((retailPrice * 100) / event.target.value) - 100);
          }
        }
        setVendorPrice(event.target.value);
        break;
      case "formGridSum":
        if (validateInputValue(setInvalidSum, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
          if (invoiceProduct?.quantity !== null || invoiceProduct?.quantity !== undefined) {
            setVendorPrice(event.target.value / invoiceProduct?.quantity);
            setVatSum(event.target.value * (product?.vat?.value / 100));
          }
        }
        setSum(event.target.value);
        break;
      case "formGridRetailPrice":
        if (validateInputValue(setInvalidRetailPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
          if (vendorPrice !== null || vendorPrice !== undefined) {
            setTradeMargin(((event.target.value * 100) / vendorPrice - 100));
          }
        }
        setRetailPrice(event.target.value);
        break;
      case "formGridTradeMarginPercent":
        if (validateInputValue(setInvalidTradeMargin, "^(\\d{1,3}|\\d{0,3}\\.\\d{1,2})$", event)) {
          if (vendorPrice !== null || vendorPrice !== undefined) {
            setRetailPrice(vendorPrice * (event.target.value / 100 + 1));
          }
        }
        setTradeMargin(event.target.value);
        break;
      default:
        setInvoiceProduct(invoiceProduct);
        break;
    }
  }

  const onPressEnterBarcodeField = (event) => {
    if (Math.ceil(Math.log10(event.target.value + 1)) < 14) {
      if (event.keyCode === 13 || event.keyCode === 9) {
        validateInputValue(setInvalidBarcode, "^[0-9]+$", event);
        onFetchProductByBarcode(event.target.value)
      }
      setInvalidBarcode(false);
    } else {
      setInvalidBarcode(true);
    }
  }

  const prepareInvoiceProductForSubmit = () => {
    Object.assign(product, product, {
      discountPrice: Math.round(vendorPrice * 100) / 100,
      retailPrice: Math.round(retailPrice * 100) / 100,
      tradeMargin: Math.round(tradeMarginProduct * 100) / 100,
      stock: invoiceProduct.quantity,
    })

    Object.assign(invoiceProduct, invoiceProduct, {
      invoice: invoice,
      product: product,
      totalDiscountPrice: Math.round(sum * 100) / 100,
      totalRetailPrice: Math.round(retailPrice * invoiceProduct.quantity * 100) / 100,
      vatSum: Math.round(vatSumProduct * 100) / 100,
    })
  }

  const resetAllAndGoBack = () => {
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

  const isInvoiceProductReadyToBeSubmitted = () => (
    !invalidBarcode && !invalidQuantity &&
    !invalidVendorPrice && !invalidRetailPrice &&
    !invalidTradeMargin && !invalidSum &&
    vendorPrice > 0 && retailPrice > 0 &&
    tradeMarginProduct > 0 && invoiceProduct.quantity > 0
    && sum > 0
  )

  const markIvalidFields = () => {
    setInvalidVendorPrice(vendorPrice === 0);
    setInvalidSum(sum === 0);
    setInvalidRetailPrice(retailPrice === 0);
    setInvalidTradeMargin(tradeMarginProduct === 0);
  }

  const onSubmitInvoiceProduct = (event) => {
    if (isInvoiceProductReadyToBeSubmitted()) {
      prepareInvoiceProductForSubmit();
      if (id !== "0") {
        onUpdateInvoiceProduct(invoiceProduct);
      } else {
        onCreateInvoiceProduct(invoiceProduct);
      }
      resetAllAndGoBack();
    } else {
      preventSubmitIfInvalidInput(event);
      markIvalidFields();
    }
  }

  const addNewProduct = () => {
    history.push("/products/0")
  }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer === true) {
      resetAllAndGoBack();
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
        <div className="container w-50 center mt3">
          <h3 className="mb4">Add New Product to Invoice</h3>
          <Form onSubmit={onSubmitInvoiceProduct}>
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
                  required={true}
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
                  type="number"
                  as="input"
                  required={true}
                  placeholder="Find by Barcode"
                  size="sm"
                  value={product?.barcodes !== undefined ? product?.barcodes[0].value : null}
                  onKeyDown={onPressEnterBarcodeField}
                  isInvalid={invalidBarcode}
                  aria-describedby={BARCODE_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidBarcode}
                  message={"Barcode value length should be between 1 and 13."}
                  ariaDescribedbyId={BARCODE_HELP_BLOCK}
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
                  required={true}
                  readOnly
                  value={product?.productCode?.value}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} >
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
                  required={true}
                  id="ProductName"
                  placeholder="Click 🔎︎ to search product by name"
                  value={product?.nameRom}
                />
              </Col>
              <Col sm="1">
                <Form.Control
                  type="button"
                  size="sm"
                  id="FindProduct"
                  className="form-button"
                  value={"🔎︎"}
                  onClick={onFindProductByName}
                />
              </Col>
              <Col sm="1">
                <Form.Control
                  type="button"
                  size="sm"
                  id="AddProduct"
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
                      type="number"
                      as="input"
                      size="sm"
                      defaultValue={"0.00"}
                      required={true}
                      style={{
                        textAlign: 'right'
                      }}
                      value={displayQuantityValueBasedOnMeasuringUnit(invoiceProduct?.quantity)}
                      onChange={onChangeInvoiceProductValues}
                      isInvalid={invalidQuantity}
                      aria-describedby={QUANTITY_HELP_BLOCK}
                    />
                    <InvalidFieldText
                      isInvalid={invalidQuantity}
                      message={"Quantity fromat should have 6 integer digits and 4 digits max."}
                      ariaDescribedbyId={QUANTITY_HELP_BLOCK}
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
                      type="number"
                      as="input"
                      size="sm"
                      required={true}
                      style={{
                        textAlign: 'right'
                      }}
                      value={displayNnumberWith2Decimals(vendorPrice)}
                      onChange={onChangeInvoiceProductValues}
                      isInvalid={invalidVendorPrice}
                      aria-describedby={VENDOR_PRICE_HELP_BLOCK}
                    />
                    <InvalidFieldText
                      isInvalid={invalidVendorPrice}
                      message={"Vendor Price fromat should have 5 integer digits and 2 digits."}
                      ariaDescribedbyId={VENDOR_PRICE_HELP_BLOCK}
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
                      type="number"
                      as="input"
                      size="sm"
                      required={true}
                      style={{
                        textAlign: 'right'
                      }}
                      value={displayNnumberWith2Decimals(sum)}
                      onChange={onChangeInvoiceProductValues}
                      isInvalid={invalidSum}
                      aria-describedby={SUM_HELP_BLOCK}
                    />
                    <InvalidFieldText
                      isInvalid={invalidSum}
                      message={"Sum fromat should have 6 integer digits and 2 digits."}
                      ariaDescribedbyId={SUM_HELP_BLOCK}
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
                  type="number"
                  as="input"
                  size="sm"
                  disabled
                  required={true}
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
                      type="number"
                      as="input"
                      size="sm"
                      required={true}
                      style={{
                        textAlign: 'right'
                      }}
                      value={displayNnumberWith2Decimals(retailPrice)}
                      onChange={onChangeInvoiceProductValues}
                      isInvalid={invalidRetailPrice}
                      aria-describedby={RETAIL_PRICE_HELP_BLOCK}
                    />
                    <InvalidFieldText
                      isInvalid={invalidRetailPrice}
                      message={"Retail Price fromat should have 5 integer digits and 2 digits."}
                      ariaDescribedbyId={RETAIL_PRICE_HELP_BLOCK}
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
                      type="number"
                      as="input"
                      size="sm"
                      required={true}
                      style={{
                        textAlign: 'right'
                      }}
                      value={displayNnumberWith2Decimals(tradeMarginProduct)}
                      onChange={onChangeInvoiceProductValues}
                      isInvalid={invalidTradeMargin}
                      aria-describedby={TRADE_MARGIN_HELP_BLOCK}
                    />
                    <InvalidFieldText
                      isInvalid={invalidTradeMargin}
                      message={"Trade margin fromat should have 3 integer digits and 2 digits."}
                      ariaDescribedbyId={TRADE_MARGIN_HELP_BLOCK}
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
                  type="number"
                  as="input"
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
          <FindProduct
            open={openDialog}
            handleClose={handleClose}
          />
        </div>
        : <ProgressLoading />
      }
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProduct);