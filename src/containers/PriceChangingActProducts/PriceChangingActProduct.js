import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
    fetchPriceChangingActProduct,
    createPriceChangingActProduct,
    updatePriceChangingActProduct,
    fetchPriceChangingActProducts,
} from '../../actions/priceChangingActProductAction';
import { fetchProductByBarcode } from '../../actions/productAction';
import { restStoreData } from '../../actions/restoreDataAction';
import { hideNavBar, showNavBar } from '../../actions/navBarAction';

import FindProduct from '../../common/FindProduct';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
    validateInputValue,
    preventSubmitIfInvalidInput
} from '../../common/utils';

import './style.css';

import { DEFAULT_UUID_ID } from '../../constants'

const mapStateToProps = (state) => {
    return {
        isPending: state.managePriceChangingActProducts.isPending,
        initialpriceChangingActProduct: state.managePriceChangingActProducts.priceChangingActProduct,
        error: state.managePriceChangingActProducts.error,
        productByBarcode: state.manageProducts.product,
        priceChangingActProducts: state.managePriceChangingActProducts.priceChangingActProducts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPriceChangingActProduct: (id) => dispatch(fetchPriceChangingActProduct(id)),
        onCreatePriceChangingActProduct: (priceChangingActProduct) => dispatch(createPriceChangingActProduct(priceChangingActProduct)),
        onUpdatePriceChangingActProduct: (priceChangingActProduct) => dispatch(updatePriceChangingActProduct(priceChangingActProduct)),
        onFetchPriceChangingActProducts: (priceChangingActId) => dispatch(fetchPriceChangingActProducts(priceChangingActId)),
        onFetchProductByBarcode: (barcode) => dispatch(fetchProductByBarcode(barcode)),
        onRestData: () => dispatch(restStoreData()),
        hideNavBar: () => dispatch(hideNavBar()),
        showNavBar: () => dispatch(showNavBar()),
    }
}

const PriceChangingActProduct = (props) => {
    const {
        isPending,
        initialpriceChangingActProduct,
        error,
        productByBarcode,
        priceChangingActProducts,
        onFetchPriceChangingActProduct,
        onCreatePriceChangingActProduct,
        onUpdatePriceChangingActProduct,
        onFetchProductByBarcode,
        onRestData,
        onFetchPriceChangingActProducts,
        hideNavBar,
        showNavBar,
    } = props;

    const BARCODE_HELP_BLOCK = "barcodeHelpBlock";
    const NEW_RETAIL_PRICE_HELP_BLOCK = "newRetailPriceHelpBlock";
    const OLD_RETAIL_PRICE_HELP_BLOCK = "oldRetailPriceHelpBlock";
    const OLD_PRICE_SUM_HELP_BLOCK = "oldPriceSumHelpBlock";
    const NEW_PRICE_SUM_HELP_BLOCK = "newPriceSumHelpBlock";

    const [invalidBarcode, setInvalidBarcode] = useState(false);
    const [invalidOldRetailPrice, setInvalidOldRetailPrice] = useState(false);
    const [invalidNewRetailPrice, setInvalidNewRetailPrice] = useState(false);
    const [invalidOldPriceSum, setInvalidOldPriceSum] = useState(false);
    const [invalidNewPriceSum, setInvalidNewPriceSum] = useState(false);

    const history = useHistory();
    const { id, priceChangingActId } = useParams();

    const [priceChangingActProduct, setPriceChangingActProduct] = useState({});
    const [priceChangingAct, setPriceChangingAct] = useState({});
    const [product, setProduct] = useState({});

    const [oldPriceSum, setOldPriceSum] = useState(0);
    const [newPriceSum, setNewPriceSum] = useState(0);
    const [tradeMarginProduct, setTradeMargin] = useState(0);
    const [oldRetailPrice, setOldRetailPrice] = useState(0);
    const [newRetailPrice, setNewRetailPrice] = useState(0);
    const [priceDifference, setPriceDifference] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        if (id !== DEFAULT_UUID_ID) {
            onFetchPriceChangingActProduct(id);
        }
    }, [id, onFetchPriceChangingActProduct])

    useEffect(() => {
        setProduct(productByBarcode);
        initializeTradeMarginValue();
        initializeRetailPriceValue();
        initializePriceDifferenceValue();
        initializeSumValue();
        setPriceChangingAct({ ...priceChangingAct, id: priceChangingActId })
        // eslint-disable-next-line
    }, [productByBarcode])

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

    useEffect(() => {
        onFetchPriceChangingActProducts(priceChangingActId);
        // eslint-disable-next-line
    }, [priceChangingActId])

    const handleClose = (event, reason) => {
        if (reason !== "backdropClick") {
            setOpenDialog(false);
        }
    };

    const onFindProductByName = () => {
        setOpenDialog(true);
    }

    const initializeSumValue = () => {
        if (initialpriceChangingActProduct?.product?.retailPrice !== undefined && id !== DEFAULT_UUID_ID &&
            initialpriceChangingActProduct?.product?.stock !== undefined) {
            setOldPriceSum(initialpriceChangingActProduct?.product?.retailPrice * initialpriceChangingActProduct?.product?.stock)
            setNewPriceSum(initialpriceChangingActProduct?.product?.retailPrice * initialpriceChangingActProduct?.product?.stock)
        }
        if (productByBarcode?.retailPrice !== undefined && productByBarcode?.stock !== undefined) {
            setOldPriceSum(productByBarcode?.retailPrice * productByBarcode?.stock)
            setNewPriceSum(productByBarcode?.retailPrice * productByBarcode?.stock)
        }
    }

    const initializeTradeMarginValue = () => {
        if (initialpriceChangingActProduct?.product?.tradeMargin !== undefined && id !== DEFAULT_UUID_ID) {
            setTradeMargin(initialpriceChangingActProduct?.product?.tradeMargin)
        }
        if (productByBarcode?.tradeMargin !== undefined) {
            setTradeMargin(productByBarcode?.tradeMargin)
        }
    }

    const initializeRetailPriceValue = () => {
        if (initialpriceChangingActProduct?.product?.retailPrice !== undefined && id !== DEFAULT_UUID_ID) {
            setOldRetailPrice(initialpriceChangingActProduct?.product?.retailPrice)
            setNewRetailPrice(initialpriceChangingActProduct?.product?.retailPrice)
        }
        if (productByBarcode?.retailPrice !== undefined) {
            setOldRetailPrice(productByBarcode?.retailPrice)
            setNewRetailPrice(productByBarcode?.retailPrice)
        }
    }

    const initializePriceDifferenceValue = () => {
        if (newPriceSum !== 0 && oldPriceSum !== 0) {
            setPriceDifference(newPriceSum - oldPriceSum);
        }
    }

    useEffect(() => {
        if (id !== DEFAULT_UUID_ID) {
            setPriceChangingActProduct(initialpriceChangingActProduct);
            setPriceChangingAct(initialpriceChangingActProduct?.priceChangingAct);
            setProduct(initialpriceChangingActProduct?.product);
            initializeSumValue();
            initializeTradeMarginValue();
            initializeRetailPriceValue();
            initializePriceDifferenceValue();
        }// eslint-disable-next-line
    }, [initialpriceChangingActProduct, id])

    const displayNnumberWith2Decimals = (numberTodisplay) => {
        if (isNaN(numberTodisplay)) {
            return '0.00'.toLocaleString(undefined, {maximumFractionDigits:2});
        } else if (numberTodisplay === 0) {
            return '0.00'.toLocaleString(undefined, {maximumFractionDigits:2});
        } else {
            return numberTodisplay.toLocaleString(undefined, {maximumFractionDigits:2})
        }
    }

    const isStockAndDiscountPriceValid = (product?.stock !== null || product?.stock !== undefined) &&
                        (product?.discountPrice !== null || product?.discountPrice !== undefined);

    const onChangePriceChangingActProductValues = (event) => {
        switch (event.target.id) {
            case "formGridOldPriceSum":
                if (validateInputValue(setInvalidOldPriceSum, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
                    if (isStockAndDiscountPriceValid) {
                        setOldRetailPrice(event.target.value / product?.stock);
                        setTradeMargin(((event.target.value / product?.stock * 100) / product?.discountPrice - 100));
                        setPriceDifference(newPriceSum - event.target.value);
                    }
                }
                setOldPriceSum(event.target.value);
                break;
            case "formGridOldRetailPrice":
                if (validateInputValue(setInvalidOldRetailPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
                    if (isStockAndDiscountPriceValid) {
                        setTradeMargin(((event.target.value * 100) / product?.discountPrice - 100));
                        setOldPriceSum(event.target.value * product?.stock);
                        setPriceDifference(newPriceSum - (event.target.value * product?.stock));
                    }
                }
                setOldRetailPrice(event.target.value);
                break;
            case "formGridNewPriceSum":
                if (validateInputValue(setInvalidNewPriceSum, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
                    if (isStockAndDiscountPriceValid) {
                        setNewRetailPrice(event.target.value / product?.stock);
                        setTradeMargin(((event.target.value / product?.stock * 100) / product?.discountPrice - 100));
                        setPriceDifference(event.target.value - oldPriceSum);
                    }
                }
                setNewPriceSum(event.target.value);
                break;
            case "formGridNewRetailPrice":
                if (validateInputValue(setInvalidNewRetailPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
                    if (isStockAndDiscountPriceValid) {
                        setTradeMargin(((event.target.value * 100) / product?.discountPrice - 100));
                        setNewPriceSum(event.target.value * product?.stock);
                        setPriceDifference((event.target.value * product?.stock) - oldPriceSum);
                    }
                }
                setNewRetailPrice(event.target.value);
                break;
            default:
                setPriceChangingActProduct(priceChangingActProduct);
                break;
        }
    }

    const onPressEnterBarcodeField = (event) => {
        if (event.target.value.length < 14) {
            if (event.keyCode === 13 || event.keyCode === 9) {
                validateInputValue(setInvalidBarcode, "^[0-9]+$", event);
                onFetchProductByBarcode(event.target.value)
            }
            setInvalidBarcode(false);
        } else {
            setInvalidBarcode(true);
        }
    }

    const preparePriceChangingActProductForSubmit = () => {
        Object.assign(product, product, {
            retailPrice: Math.round(newRetailPrice * 100) / 100,
            tradeMargin: Math.round(tradeMarginProduct * 100) / 100,
            oldRetailPrice: Math.round(oldRetailPrice * 100) / 100,
        })

        Object.assign(priceChangingActProduct, priceChangingActProduct, {
            priceChangingAct: priceChangingAct,
            product: product,
            oldPrice: Math.round(oldRetailPrice * 100) / 100,
            priceDifference: Math.round(priceDifference * 100) / 100,
        })
    }

    const resetAllAndGoBack = () => {
        setPriceChangingActProduct({});
        setPriceChangingAct({});
        setProduct({});
        setOldPriceSum(0);
        setNewPriceSum(0);
        setTradeMargin(0);
        setOldRetailPrice(0);
        setNewRetailPrice(0);
        setPriceDifference(0);
        onRestData();
        history.goBack();
    }

    const isInvoiceProductReadyToBeSubmitted = () => (
        !invalidBarcode && !invalidNewRetailPrice &&
        !invalidNewRetailPrice && !invalidOldRetailPrice &&
        !invalidNewPriceSum && !invalidOldPriceSum &&
        oldRetailPrice >= 0 && newRetailPrice > 0 &&
        oldPriceSum >= 0 && newPriceSum >= 0
    )

    const markIvalidFields = () => {
        setInvalidOldPriceSum(oldPriceSum < 0);
        setInvalidOldRetailPrice(oldRetailPrice < 0);
        setInvalidNewPriceSum(newPriceSum < 0);
        setInvalidNewRetailPrice(newRetailPrice <= 0);
    }

    const checkIfProductIsAlreadyAdded = () => (
        priceChangingActProducts.find(item => item.product.id === product.id)
    )

    const onSubmitPriceChangingActProduct = (event) => {
        if (isInvoiceProductReadyToBeSubmitted()) {
            preparePriceChangingActProductForSubmit();
            const foundItem = checkIfProductIsAlreadyAdded();
            if (id !== DEFAULT_UUID_ID) {
                onUpdatePriceChangingActProduct(priceChangingActProduct);
            } else {
                if (foundItem === undefined) {
                    onCreatePriceChangingActProduct(priceChangingActProduct);
                } else {
                    alert(`The product ${foundItem.nameRom} has been already added to this Price Chanigng Act.`)
                    return
                }
            }
            resetAllAndGoBack();
        } else {
            preventSubmitIfInvalidInput(event);
            markIvalidFields();
        }
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
                    <h3 className="mb4">Add new product to price changing act</h3>
                    <Form>
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
                        <Form.Group as={Row} >
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
                                            defaultValue={"0"}
                                            required={true}
                                            readOnly
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={product?.stock}
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
                                    >TM %</Form.Label>
                                    <Col sm="7">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            readOnly
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(tradeMarginProduct)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group as={Row} controlId="formGridOldRetailPrice">
                                    <Form.Label
                                        column
                                        sm="6"
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}
                                    >Old Retail Price</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(oldRetailPrice)}
                                            onChange={onChangePriceChangingActProductValues}
                                            isInvalid={invalidOldRetailPrice}
                                            aria-describedby={OLD_RETAIL_PRICE_HELP_BLOCK}
                                        />
                                        <InvalidFieldText
                                            isInvalid={invalidOldRetailPrice}
                                            message={"Old Retail Price fromat should have 6 integer digits and 2 digits."}
                                            ariaDescribedbyId={OLD_RETAIL_PRICE_HELP_BLOCK}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} controlId="formGridOldPriceSum">
                                    <Form.Label
                                        column
                                        sm="5"
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}
                                    >Old Price Sum</Form.Label>
                                    <Col sm="7">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(oldPriceSum)}
                                            onChange={onChangePriceChangingActProductValues}
                                            isInvalid={invalidOldPriceSum}
                                            aria-describedby={OLD_PRICE_SUM_HELP_BLOCK}
                                        />
                                        <InvalidFieldText
                                            isInvalid={invalidOldPriceSum}
                                            message={"Old Price Sum fromat should have 6 integer digits and 2 digits."}
                                            ariaDescribedbyId={OLD_PRICE_SUM_HELP_BLOCK}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group as={Row} controlId="formGridNewRetailPrice">
                                    <Form.Label
                                        column
                                        sm="6"
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}
                                    >New Retail Price</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(newRetailPrice)}
                                            onChange={onChangePriceChangingActProductValues}
                                            isInvalid={invalidNewRetailPrice}
                                            aria-describedby={NEW_RETAIL_PRICE_HELP_BLOCK}
                                        />
                                        <InvalidFieldText
                                            isInvalid={invalidNewRetailPrice}
                                            message={"New Retail Price fromat should have 6 integer digits and 2 digits."}
                                            ariaDescribedbyId={NEW_RETAIL_PRICE_HELP_BLOCK}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} controlId="formGridNewPriceSum">
                                    <Form.Label
                                        column
                                        sm="5"
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}
                                    >New Price Sum</Form.Label>
                                    <Col sm="7">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(newPriceSum)}
                                            onChange={onChangePriceChangingActProductValues}
                                            isInvalid={invalidNewPriceSum}
                                            aria-describedby={NEW_PRICE_SUM_HELP_BLOCK}
                                        />
                                        <InvalidFieldText
                                            isInvalid={invalidNewPriceSum}
                                            message={"Sum fromat should have 6 integer digits and 2 digits."}
                                            ariaDescribedbyId={NEW_PRICE_SUM_HELP_BLOCK}
                                        />
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
                                            readOnly
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(product?.discountPrice)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Row} controlId="formGridPricesDifference">
                                    <Form.Label
                                        column
                                        sm="5"
                                        style={{
                                            paddingTop: 0,
                                            paddingBottom: 0
                                        }}
                                    >Prices Difference</Form.Label>
                                    <Col sm="7">
                                        <Form.Control
                                            type="number"
                                            as="input"
                                            size="sm"
                                            required={true}
                                            readOnly
                                            style={{
                                                textAlign: 'right'
                                            }}
                                            value={displayNnumberWith2Decimals(priceDifference)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div>
                            <Button
                                className="mr5 w4 mt4"
                                variant="primary"
                                onClick={onSubmitPriceChangingActProduct}
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
        </div >
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChangingActProduct);