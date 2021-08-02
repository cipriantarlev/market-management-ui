import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
  }
}

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 100,
  },
  header: {
    fontWeight: 'bold'
  }
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
  } = props;

  const classes = useStyles();

  let history = useHistory();
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [barcodes, setBarcodes] = useState([]);
  const [tradeMargin, setTradeMargin] = useState(0);

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/vendors") : null;
  }

  useEffect(() => {
    onFetchCategories();
    onFetchVatList();
    onFetchMeasuringUnits();
  }, [onFetchCategories, onFetchVatList, onFetchMeasuringUnits])

  useEffect(() => {
    if (id !== "0") {
      onFetchProduct(id);
    }
  }, [id, onFetchProduct]);

  useEffect(() => {
    if (id !== "0") {
      setProduct(initialProduct);
      setBarcodes(...product.barcodes);
    } else {
      setProduct({})
      // setSelectedRegion(1);
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
      case "formGridFiscalCode":
        setProduct({ ...product, fiscalCode: event.target.value });
        break;
      case "formGridPostalCode":
        setProduct({ ...product, postalCode: event.target.value });
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
      case "formGridVendorLegalType":
        setProduct({ ...product, vendorLegalType: event.target.value });
        break;
      case "formGridCity":
        setProduct({ ...product, city: event.target.value });
        break;
      case "formGridNote":
        setProduct({ ...product, note: event.target.value });
        break;
      default:
        setProduct(product);
        break;
    }
  }

  const generateNewProductCode = () => {
    onGenerateProductCode();
    console.log("productCode", productCode);
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
                  // value={vendor.currency}
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
                  // value={vendor.currency}
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
                  value={productCode?.value}
                  onClick={generateNewProductCode}
                />
                Name (Romanian)
                <Form.Control
                  type="text"
                  placeholder="Enter Name (Romanian)"
                  size="sm"
                  id="formGridNameRomanian"
                  // value={vendor.bankAccount}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <TableContainer component={Paper} className="w-50 mt-4" style={{ maxHeight: 242 }}>
                <Table className={classes.table} stickyHeader size="small" aria-label="a dense table sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.header}>Barcodes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {barcodes.map((barcode) => (
                      <TableRow key={barcode.id}>
                        <TableCell component="th" scope="row">
                          {barcode.value}
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
                  // value={vendor.bankAccount}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorType">
                Measuring Unit
                <Form.Control
                  as="select"
                  size="sm"
                  // value={vendor.vendorType}
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
                  // value={vendor.vatCode}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorLegalType">
                VAT
                <Form.Control
                  as="select"
                  size="sm"
                  // value={vendor.vendorLegalType}
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
                  // value={vendor.city}
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
                    value={plu?.value}
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
                  value={`${Number(tradeMargin).toFixed(2)} %`}
                  readOnly
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNote">
                Stock
                <Form.Control
                  type="text"
                  placeholder="Enter Stock"
                  size="sm"
                  // value={vendor.note}
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