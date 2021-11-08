import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Button as DeleteButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchProduct,
  createProduct,
  updateProduct,
  fetchCategories,
  fetchSubcategoriesCategory,
  fetchVatList,
  fetchMeasuringUnits,
  generateProductCode,
  generatePlu,
  generateBarcode,
  restStoreData,
} from '../actions';

import './style.css';
import { InputGroup } from 'react-bootstrap';

import Barcode from './Barcode';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
  validateInputValue,
  preventSubmitIfInvalidInput
} from '../../common/utils';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageProducts.isPending,
    initialProduct: state.manageProducts.product,
    error: state.manageProducts.error,
    categories: state.manageCategories.categories,
    subcategoriesInitial: state.manageSubcategories.subcategoriesByCategory,
    vatList: state.manageVat.vatList,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    initialProductCode: state.generateProductCode.productCode,
    initialPlu: state.generatePlu.plu,
    barcode: state.generateBarcode.barcode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProduct: (id) => dispatch(fetchProduct(id)),
    onCreateProduct: (product) => dispatch(createProduct(product)),
    onUpdateProduct: (product) => dispatch(updateProduct(product)),
    onFetchCategories: () => dispatch(fetchCategories()),
    onFetchSubcategoriesCategory: (categoryId) => dispatch(fetchSubcategoriesCategory(categoryId)),
    onFetchVatList: () => dispatch(fetchVatList()),
    onFetchMeasuringUnits: () => dispatch(fetchMeasuringUnits()),
    onGenerateProductCode: () => dispatch(generateProductCode()),
    onGeneratePlu: () => dispatch(generatePlu()),
    onGenerateBarcode: (barcode) => dispatch(generateBarcode(barcode)),
    onRestData: () => dispatch(restStoreData()),
  }
}

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 100,
  },
  header: {
    fontWeight: 'bold'
  },
  buttons: {
    width: 109
  },
}));

const Product = (props) => {
  const {
    isPending,
    initialProduct,
    error,
    categories,
    subcategoriesInitial,
    vatList,
    measuringUnits,
    initialProductCode,
    initialPlu,
    barcode,
    onFetchProduct,
    onCreateProduct,
    onUpdateProduct,
    onFetchCategories,
    onFetchSubcategoriesCategory,
    onFetchVatList,
    onFetchMeasuringUnits,
    onGenerateProductCode,
    onGeneratePlu,
    onGenerateBarcode,
    onRestData,
  } = props;

  const ROM_NAME_HELP_BLOCK = "romNameHelpBlock";
  const RUS_NAME_HELP_BLOCK = "rusNameHelpBlock";
  const RETAIL_PRICE_HELP_BLOCK = "retailPriceHelpBlock";
  const DISCOUNT_PRICE_HELP_BLOCK = "discountPriceHelpBlock";
  const STOCK_HELP_BLOCK = "stockHelpBlock";

  const classes = useStyles();

  let history = useHistory();
  const { id } = useParams();

  const [invalidRomName, setInvalidRomName] = useState(false);
  const [invalidRusName, setInvalidRusName] = useState(false);
  const [invalidRetailPrice, setInvalidRetailPrice] = useState(false);
  const [invalidDiscountPrice, setInvalidDiscountPrice] = useState(false);
  const [invalidStock, setInvalidStock] = useState(false);

  const [invalidCategory, setInvalidCategory] = useState(false);
  const [invalidSubcategory, setInvalidSubcategory] = useState(false);
  const [invalidProductCode, setInvalidProductCode] = useState(false);
  const [invalidMeasuringUnit, setInvalidMeasuringUnit] = useState(false);
  const [invalidVat, setInvalidVat] = useState(false);
  const [invalidBarcode, setInvalidBarcode] = useState(false);

  const [product, setProduct] = useState({});
  const [barcodes, setBarcodes] = useState([]);
  const [plu, setPlu] = useState({});
  const [productCode, setProductCode] = useState({});
  const [tradeMargin, setTradeMargin] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState(0);
  const [selectedMeasuringUnit, setSelectedMeasuringUnit] = useState(0);
  const [selectedVat, setSelectedVat] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(true);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  const onAddNewBarcode = () => {
    setOpenDialog(true);
  }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer) {
      resetAllAndGoBack();
    }
  }

  useEffect(() => {
    if (id !== "0") {
      onFetchProduct(id);
    }
  }, [id, onFetchProduct]);

  useEffect(() => {
    onFetchCategories();
    onFetchVatList();
    onFetchMeasuringUnits();
  }, [onFetchCategories, onFetchVatList, onFetchMeasuringUnits])

  useEffect(() => {
    setPlu(initialPlu);
  }, [initialPlu])

  useEffect(() => {
    setProductCode(initialProductCode);
  }, [initialProductCode])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const intializeCategoryValue = () => {
    if (initialProduct.category !== undefined) {
      setSelectedCategory(initialProduct.category.id);
    }
  }

  const intializeSubcategoryValue = () => {
    if (initialProduct.subcategory !== undefined) {
      setSelectedSubcategory(initialProduct.subcategory.id);
      onFetchSubcategoriesCategory(initialProduct?.category?.id);
    }
  }

  const intializeMeasuringUnitValue = () => {
    if (initialProduct.measuringUnit !== undefined) {
      setSelectedMeasuringUnit(initialProduct.measuringUnit.id);
    }
  }

  const intializeVatValue = () => {
    if (initialProduct.vat !== undefined) {
      setSelectedVat(initialProduct.vat.id);
    }
  }

  const intializeBarcodeValue = () => {
    if (initialProduct.barcodes !== undefined) {
      setBarcodes([...initialProduct.barcodes]);
    }
  }

  const intializeTradeMarginValue = () => {
    if (initialProduct.tradeMargin !== undefined) {
      setTradeMargin(initialProduct.tradeMargin);
    }
  }

  useEffect(() => {
    if (id !== "0") {
      intializeCategoryValue();
      intializeSubcategoryValue();
      intializeMeasuringUnitValue();
      intializeVatValue();
      setProduct(initialProduct);
      intializeBarcodeValue();
      intializeTradeMarginValue();
    } else {
      setProduct({});
      setBarcodes([]);
      setPlu({});
      setProductCode({});
    }// eslint-disable-next-line
  }, [initialProduct, id])

  const onChangeProductValues = (event) => {
    switch (event.target.id) {
      case "formGridCategory":
        let categoryObj = getDropDownValue(Number(event.target.value), categories, setSelectedCategory);
        onFetchSubcategoriesCategory(Number(event.target.value));
        setProduct({ ...product, category: categoryObj });
        setInvalidCategory(false);
        break;
      case "formGridSubcategory":
        let subcategoryObj = getDropDownValue(Number(event.target.value), subcategoriesInitial, setSelectedSubcategory);
        setProduct({ ...product, subcategory: subcategoryObj });
        setInvalidSubcategory(false);
        break;
      case "formGridNameRomanian":
        validateInputValue(setInvalidRomName, "^[a-zA-Z0-9-\\s]+$", event);
        setProduct({ ...product, nameRom: event.target.value });
        break;
      case "formGridNameRussian":
        validateInputValue(setInvalidRusName, "^[a-zA-ZА-Яа-я0-9-\\s]+$", event);
        setProduct({ ...product, nameRus: event.target.value });
        break;
      case "formGridRetailPrice":
        if (validateInputValue(setInvalidRetailPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
          if (product.discountPrice !== null || product.discountPrice !== undefined) {
            setTradeMargin((event.target.value * 100) / product.discountPrice - 100);
          } else {
            setTradeMargin(0);
          }
        }
        setProduct({ ...product, retailPrice: event.target.value });
        break;
      case "formGridDiscountPrice":
        if (validateInputValue(setInvalidDiscountPrice, "^(\\d{1,5}|\\d{0,5}\\.\\d{1,2})$", event)) {
          if (product.retailPrice !== null || product.retailPrice !== undefined) {
            setTradeMargin((product.retailPrice * 100) / event.target.value - 100);
          } else {
            setTradeMargin(0);
          }
        }
        setProduct({ ...product, discountPrice: event.target.value });
        break;
      case "formGridMeasuringUnit":
        let measuringUnitObj = getDropDownValue(Number(event.target.value), measuringUnits, setSelectedMeasuringUnit);
        setProduct({ ...product, measuringUnit: measuringUnitObj });
        setInvalidMeasuringUnit(false);
        break;
      case "formGridVat":
        let vatObj = getDropDownValue(Number(event.target.value), vatList, setSelectedVat);
        setProduct({ ...product, vat: vatObj });
        setInvalidVat(false);
        break;
      case "formGridStock":
        validateInputValue(setInvalidStock, "^(\\d{1,6}|\\d{0,6}\\.\\d{1,4})$", event)
        setProduct({ ...product, stock: event.target.value });
        break;
      default:
        setProduct(product);
        break;
    }
  }

  const getDropDownValue = (itemId, itemList, setItem) => {
    setItem(itemId);
    return itemList.find(item => item.id === itemId);
  }

  const generateNewProductCode = () => {
    onGenerateProductCode();
    setInvalidProductCode(false);
  }

  const getTradeMarging = () => {
    if (Number.isNaN(tradeMargin)) {
      return `${Number(0).toFixed(2)} %`;
    } else {
      return `${Number(tradeMargin).toFixed(2)} %`;
    }
  }

  const getProductCode = () => {
    if (product?.productCode === null || product?.productCode === undefined) {
      return productCode.value;
    } else {
      return product.productCode.value;
    }
  }

  const getPlu = () => {
    if (product?.plu === null || product?.plu === undefined) {
      return plu.value;
    } else {
      return product.plu.value;
    }
  }

  useEffect(() => {
    if (Object.keys(barcode).length !== 0) {
      setBarcodes(oldValue => ([...oldValue, barcode]));
    }
  }, [barcode, setBarcodes])

  const generateNewBarCode = () => {
    if (selectedMeasuringUnit === 0) {
      alert("Please select a measuring unit before generate a barcode!")
    } else {
      if (product.measuringUnit.name === "kg") {
        onGenerateBarcode({ value: "21" })
      }
      if (product.measuringUnit.name === "buc") {
        onGenerateBarcode({ value: "22" })
      }
      setInvalidBarcode(false);
    }
  }

  const deleteBarcode = (barcodeValue) => {
    const answer = window.confirm(`Are you sure you want to delete the barcode with value: ${barcodeValue}?`);
    if (answer) {
      setBarcodes(barcodes.filter(item => item.value !== barcodeValue));
    }
  }

  const resetAllAndGoBack = () => {
    setProduct({});
    setBarcodes([]);
    setPlu({});
    setProductCode({});
    onRestData();
    history.goBack()
  }

  const isProductReadyToBeSubmitted = () => (
    !invalidRomName && !invalidRusName &&
    !invalidRetailPrice && !invalidDiscountPrice &&
    !invalidStock && product.hasOwnProperty('nameRus') &&
    product.hasOwnProperty('nameRom') && 
    (productCode.hasOwnProperty('value') || product.hasOwnProperty('productCode')) &&
    selectedCategory !== 0 && selectedSubcategory !== 0 &&
    selectedVat !== 0 && selectedMeasuringUnit !== 0 &&
    barcodes.length > 0
  )

  const markIvalidFields = () => {
    setInvalidProductCode(!(productCode.hasOwnProperty('value') || product.hasOwnProperty('productCode')));
    setInvalidCategory(selectedCategory === 0);
    setInvalidSubcategory(selectedSubcategory === 0);
    setInvalidMeasuringUnit(selectedMeasuringUnit === 0);
    setInvalidVat(selectedVat === 0);
    setInvalidBarcode('1px solid red');
  }

  const assignProductProperties = () => {
    if (product?.plu === null || product?.plu === undefined) {
      Object.assign(product, product, { plu: plu })
    }

    if (product?.productCode === null || product?.productCode === undefined) {
      Object.assign(product, product, { productCode: productCode })
    }

    Object.assign(product, product, { barcodes: barcodes })
    Object.assign(product, product, { tradeMargin: tradeMargin })
  }

  const onSubmitProduct = (event) => {
    console.log("product", product);
    if (isProductReadyToBeSubmitted()) {
      assignProductProperties();
      if (id !== "0") {
        onUpdateProduct(product);
      } else {
        onCreateProduct(product);
      }
      resetAllAndGoBack();
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
        <div className="container w-80 center mt2">
          <Form>
            <Form.Row>
              <Form.Group
                as={Col}
              >
                Category
                <Form.Control
                  as="select"
                  size="sm"
                  className="mb-3"
                  required={true}
                  id="formGridCategory"
                  value={selectedCategory}
                  isInvalid={invalidCategory}
                  onChange={onChangeProductValues}
                >
                  <option>{"--Select Category Value--"}</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
                Subcategory
                <Form.Control
                  as="select"
                  size="sm"
                  className="mb-3"
                  required={true}
                  id="formGridSubcategory"
                  value={selectedSubcategory}
                  isInvalid={invalidSubcategory}
                  onChange={onChangeProductValues}
                >
                  <option>{"--Select Subcategory Value--"}</option>
                  {subcategoriesInitial.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
                Product Code
                <Form.Control
                  type="text"
                  placeholder="Click to generate Product Code"
                  className="mb-3"
                  size="sm"
                  readOnly
                  isInvalid={invalidProductCode}
                  required={true}
                  style={{
                    cursor: 'pointer'
                  }}
                  id="formGridProductCode"
                  value={getProductCode()}
                  onClick={generateNewProductCode}
                />
                Name (Romanian)
                <Form.Control
                  type="text"
                  placeholder="Enter Name (Romanian)"
                  size="sm"
                  required={true}
                  id="formGridNameRomanian"
                  value={product.nameRom}
                  onChange={onChangeProductValues}
                  isInvalid={invalidRomName}
                  aria-describedby={ROM_NAME_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidRomName}
                  message={"Romanian Name should contain only letters, numbers and dash."}
                  ariaDescribedbyId={ROM_NAME_HELP_BLOCK}
                />
              </Form.Group>
              <TableContainer component={Paper} className="w-50 mt-4" style={{ maxHeight: 242, border: invalidBarcode}}>
                <Table className={classes.table}  stickyHeader size="small" aria-label="a dense table sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.header}>Barcodes</TableCell>
                      <TableCell className={classes.buttons}>
                        <Button
                          style={{ marginRight: 2 }}
                          onClick={onAddNewBarcode}
                        >+</Button>
                        <Button onClick={generateNewBarCode}>G</Button>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {barcodes.map((item, index) => (
                      <TableRow key={`${item.value}_${index}`}>
                        <TableCell component="th" scope="row">
                          {item.value}
                        </TableCell>
                        <TableCell>
                          <DeleteButton
                            variant="contained"
                            color="secondary"
                            style={{
                              height: 22,
                              width: 80,
                              fontSize: 'smaller'
                            }}
                            startIcon={<DeleteIcon style={{ fontSize: 17 }} />}
                            onClick={() => deleteBarcode(item.value)}
                          >
                            Delete
                          </DeleteButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridNameRussian">
                Name (Russian)
                <Form.Control
                  type="text"
                  placeholder="Enter Name (Russian)"
                  size="sm"
                  required={true}
                  value={product.nameRus}
                  onChange={onChangeProductValues}
                  isInvalid={invalidRusName}
                  aria-describedby={RUS_NAME_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidRusName}
                  message={"Russian Name should contain only letters, numbers and dash."}
                  ariaDescribedbyId={RUS_NAME_HELP_BLOCK}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridMeasuringUnit">
                Measuring Unit
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={selectedMeasuringUnit}
                  isInvalid={invalidMeasuringUnit}
                  onChange={onChangeProductValues}
                >
                  <option>{"--Select Measuring Unit Value--"}</option>
                  {measuringUnits.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridRetailPrice">
                Retail Price
                <Form.Control
                  type="number"
                  as="input"
                  defaultValue="0.00"
                  placeholder="Enter Retail Price"
                  size="sm"
                  value={product.retailPrice}
                  onChange={onChangeProductValues}
                  isInvalid={invalidRetailPrice}
                  aria-describedby={RETAIL_PRICE_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidRetailPrice}
                  message={"Retail Price fromat should have 5 integer digits and 2 digits."}
                  ariaDescribedbyId={RETAIL_PRICE_HELP_BLOCK}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVat">
                VAT
                <Form.Control
                  as="select"
                  size="sm"
                  required={true}
                  value={selectedVat}
                  isInvalid={invalidVat}
                  onChange={onChangeProductValues}
                >
                  <option>{"--Select VAT Value--"}</option>
                  {vatList.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridDiscountPrice">
                Discount Price
                <Form.Control
                  type="number"
                  as="input"
                  defaultValue="0.00"
                  placeholder="Enter Discount Price"
                  size="sm"
                  value={product.discountPrice}
                  onChange={onChangeProductValues}
                  isInvalid={invalidDiscountPrice}
                  aria-describedby={DISCOUNT_PRICE_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidDiscountPrice}
                  message={"Discount Price fromat should have 5 integer digits and 2 digits."}
                  ariaDescribedbyId={DISCOUNT_PRICE_HELP_BLOCK}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNote">
                PLU
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Click '+' to generate new PLU"
                    size="sm"
                    readOnly
                    disabled
                    value={getPlu()}
                    onChange={onChangeProductValues}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      style={{
                        cursor: 'pointer',
                        height: 31
                      }}
                      onClick={onGeneratePlu}
                    >
                      +
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTradeMargin">
                Trade Margin (%)
                <Form.Control
                  type="text"
                  size="sm"
                  value={getTradeMarging()}
                  readOnly
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridStock">
                Stock
                <Form.Control
                  type="number"
                  as="input"
                  defaultValue="0.0000"
                  placeholder="Enter Stock"
                  size="sm"
                  value={product.stock}
                  onChange={onChangeProductValues}
                  isInvalid={invalidStock}
                  aria-describedby={STOCK_HELP_BLOCK}
                />
                <InvalidFieldText
                  isInvalid={invalidStock}
                  message={"Stock fromat should have 6 integer digits and 4 digits."}
                  ariaDescribedbyId={STOCK_HELP_BLOCK}
                />
              </Form.Group>
            </Form.Row>
            <div>
              <Button
                className="mr5 w4"
                variant="primary"
                onClick={onSubmitProduct}
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
          <Barcode
            open={openDialog}
            handleClose={handleClose}
            setBarcodes={setBarcodes}
          />
        </div>
        : <ProgressLoading />
      }
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);