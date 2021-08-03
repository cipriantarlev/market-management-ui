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
  fetchProducts,
  fetchCategories,
  fetchSubcategoriesCategory,
  fetchVatList,
  fetchMeasuringUnits,
  generateProductCode,
  generatePlu,
  generateBarcode,
} from '../actions';

import './style.css';
import { InputGroup } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageProducts.isPending,
    initialProduct: state.manageProducts.product,
    error: state.manageProducts.error,
    categories: state.manageCategories.categories,
    subcategoriesInitial: state.manageSubcategories.subcategoriesByCategory,
    vatList: state.manageVat.vatList,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    productCode: state.generateProductCode.productCode,
    plu: state.generatePlu.plu,
    barcode: state.generateBarcode.barcode,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProduct: (id) => dispatch(fetchProduct(id)),
    onCreateProduct: (product) => dispatch(createProduct(product)),
    onUpdateProduct: (product) => dispatch(updateProduct(product)),
    onFetchProducts: () => dispatch(fetchProducts()),
    onFetchCategories: () => dispatch(fetchCategories()),
    onFetchSubcategoriesCategory: (categoryId) => dispatch(fetchSubcategoriesCategory(categoryId)),
    onFetchVatList: () => dispatch(fetchVatList()),
    onFetchMeasuringUnits: () => dispatch(fetchMeasuringUnits()),
    onGenerateProductCode: () => dispatch(generateProductCode()),
    onGeneratePlu: () => dispatch(generatePlu()),
    onGenerateBarcode: (barcode) => dispatch(generateBarcode(barcode)),
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
    productCode,
    plu,
    barcode,
    onFetchProduct,
    onCreateProduct,
    onUpdateProduct,
    onFetchProducts,
    onFetchCategories,
    onFetchSubcategoriesCategory,
    onFetchVatList,
    onFetchMeasuringUnits,
    onGenerateProductCode,
    onGeneratePlu,
    onGenerateBarcode,
  } = props;

  const classes = useStyles();

  let history = useHistory();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [barcodes, setBarcodes] = useState([]);
  const [tradeMargin, setTradeMargin] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(1);
  const [selectedMeasuringUnit, setSelectedMeasuringUnit] = useState(null);
  const [selectedVat, setSelectedVat] = useState(null);

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/products") : null;
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
      console.log("initialProduct", initialProduct)
      setProduct(initialProduct);
      intializeBarcodeValue();
      intializeTradeMarginValue();
    } else {
      // setProduct({})
      // setBarcodes([])
    }// eslint-disable-next-line
  }, [initialProduct, id])

  const onChangeProductValues = (event) => {
    switch (event.target.id) {
      case "formGridCategory":
        onFetchSubcategoriesCategory(Number(event.target.value));
        setProduct({ ...product, category: event.target.value });
        break;
      case "formGridBankName":
        setProduct({ ...product, bank: event.target.value });
        break;
      // case "formGridProductCode":
      //   console.log("product code", event.target.value)
      //   console.log("generatedProductCode", generatedProductCode)
      //   setProduct({ ...product, productCode: event.target.value });
      //   break;
      case "formGridNameRomanian":
        setProduct({ ...product, nameRom: event.target.value });
        break;
      case "formGridNameRussian":
        setProduct({ ...product, nameRus: event.target.value });
        break;
      case "formGridBankAccount":
        setProduct({ ...product, bankAccount: event.target.value });
        break;
      case "formGridBusinessAddress":
        setProduct({ ...product, businessAddress: event.target.value });
        break;
      case "formGridCurrency":
        setProduct({ ...product, currency: event.target.value });
        break;
      case "formGridVendorType":
        setProduct({ ...product, vendorType: event.target.value });
        break;
      case "formGridVatCode":
        setProduct({ ...product, vatCode: event.target.value });
        break;
      case "formGridRetailPrice":
        if (product.discrountPrice !== null || product.discrountPrice !== undefined) {
          setTradeMargin((Number(event.target.value) * 100) / product.discrountPrice - 100);
        } else {
          setTradeMargin(0);
        }
        setProduct({ ...product, retailPrice: Number(event.target.value) });
        break;
      case "formGridDiscountPrice":
        if (product.retailPrice !== null || product.retailPrice !== undefined) {
          setTradeMargin((product.retailPrice * 100) / Number(event.target.value) - 100);
        } else {
          setTradeMargin(0);
        }
        setProduct({ ...product, discrountPrice: Number(event.target.value) });
        break;
      case "formGridStock":
        setProduct({ ...product, stock: Number(event.target.value) });
        break;
      default:
        setProduct(product);
        break;
    }

    console.log("product", product);
  }

  const generateNewProductCode = () => {
    onGenerateProductCode();
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
    setBarcodes(oldValue => ([...oldValue, barcode]));
  }, [barcode, setBarcodes])

  const generateNewBarCode = () => {
    if (product.measuringUnit.name === "kg") {
      onGenerateBarcode({ value: "21" })
    }
    if (product.measuringUnit.name === "buc") {
      onGenerateBarcode({ value: "22" })
    }
    console.log("barcodes", barcodes);
  }

  const deleteBarcode = (barcodeValue) => {
    const answer = window.confirm(`Are you sure you want to delete the barcode with value: ${barcodeValue}?`);
    if (answer) {
      setBarcodes(barcodes.filter(item => item.value !== barcodeValue));
    }
  }

  const onSubmitProduct = () => {
    if (id !== "0") {
      onUpdateProduct(product);
    } else {
      onCreateProduct(product);
    }
    history.push("/products");
    onFetchProducts();
  }

  return (
    <div>
      {error ? <div className="tc f2 red">Something went wrong!</div> : null}
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
                  id="formGridCategory"
                  value={selectedCategory}
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
                  id="formGridSubcategory"
                  value={selectedSubcategory}
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
                  id="formGridNameRomanian"
                  value={product.nameRom}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <TableContainer component={Paper} className="w-50 mt-4" style={{ maxHeight: 242 }}>
                <Table className={classes.table} stickyHeader size="small" aria-label="a dense table sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.header}>Barcodes</TableCell>
                      <TableCell className={classes.buttons}>
                        <Button style={{ marginRight: 2 }}>+</Button>
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
                  value={product.nameRus}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorType">
                Measuring Unit
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedMeasuringUnit}
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
                  type="text"
                  placeholder="Enter Retail Price"
                  size="sm"
                  value={product.retailPrice}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorLegalType">
                VAT
                <Form.Control
                  as="select"
                  size="sm"
                  value={selectedVat}
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
                  type="text"
                  placeholder="Enter Discount Price"
                  size="sm"
                  value={product.discrountPrice}
                  onChange={onChangeProductValues}
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
                  type="text"
                  placeholder="Enter Stock"
                  size="sm"
                  value={product.stock}
                  onChange={onChangeProductValues}
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
        </div>
        : <h3>Loading data...</h3>
      }
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);