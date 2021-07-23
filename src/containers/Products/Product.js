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
  fetchProducts
} from '../actions';

import './style.css';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageProducts.isPending,
    initialProduct: state.manageProducts.product,
    error: state.manageProducts.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProduct: (id) => dispatch(fetchProduct(id)),
    onCreateProduct: (product) => dispatch(createProduct(product)),
    onUpdateProduct: (product) => dispatch(updateProduct(product)),
    onFetchProducts: () => dispatch(fetchProducts()),
  }
}

const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});

function createData(name) {
  return { name};
}

const rows = [
  createData('Frozen yoghurt'),
  createData('Ice cream sandwich'),
  createData('Eclair'),
  createData('Cupcake'),
  createData('Gingerbread'),
  
];

const Product = (props) => {
  const {
    isPending,
    initialProduct,
    error,
    onFetchProduct,
    onCreateProduct,
    onUpdateProduct,
    onFetchProducts,
  } = props;

  const classes = useStyles();

  let history = useHistory();
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/vendors") : null;
  }

  const currencies = ['--Select Currency Value--', 'MDL', 'USD', 'EURO'];
  const vendorTypes = ['--Select Vendor Type Value--', 'Supplier', 'Buyer'];
  const vendorLegalTypes = ['--Select Vendor Legal Type Value--', 'Legal entity', 'Individual'];

  useEffect(() => {
    if (id !== "0") {
      onFetchProduct(id);
    }
  }, [id, onFetchProduct])

  useEffect(() => {
    if (id !== "0") {
      setProduct(initialProduct)
    } else {
      // setSelectedRegion(1);
    }// eslint-disable-next-line
  }, [initialProduct, id])

  const onChangeProductValues = (event) => {
    switch (event.target.id) {
      case "formGridCompanyName":
        setProduct({ ...product, name: event.target.value });
        break;
      case "formGridBankName":
        setProduct({ ...product, bank: event.target.value });
        break;
      case "formGridPhoneNumber":
        setProduct({ ...product, phoneNumber: event.target.value });
        break;
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
                controlId="formGridCategory"
              >
                Category
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  className="mb-3"
                  size="sm"
                  // value={vendor.name}
                  onChange={onChangeProductValues}
                />
                Subcategory
                <Form.Control
                  type="text"
                  placeholder="Enter Subcategory"
                  className="mb-3"
                  size="sm"
                  // value={vendor.bank}
                  onChange={onChangeProductValues}
                />
                Product Code
                <Form.Control
                  type="text"
                  placeholder="Click to generate Product Code"
                  className="mb-3"
                  size="sm"
                  // value={vendor.fiscalCode}
                  onChange={onChangeProductValues}
                />
                Name (Romanian)
                <Form.Control
                  type="text"
                  placeholder="Enter Name (Romanian)"
                  size="sm"
                  // value={vendor.bankAccount}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <TableContainer component={Paper} className="w-50 mt-4">
                <Table className={classes.table} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Barcodes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
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
                  as="select"
                  size="sm"
                  // value={vendor.currency}
                  onChange={onChangeProductValues}
                >
                  {currencies.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridVendorType">
                Measuring Unit
                <Form.Control
                  as="select"
                  size="sm"
                  // value={vendor.vendorType}
                  onChange={onChangeProductValues}
                >
                  {vendorTypes.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
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
                  {vendorLegalTypes.map((item, index) => (
                    <option key={`${index}_${item}`} value={item}>{item}</option>
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
                <Form.Control
                  type="text"
                  placeholder="Enter Note"
                  size="sm"
                  // value={vendor.note}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTradeMargin">
                Trade Margin (%)
                <Form.Control
                  type="text"
                  size="sm"
                  // value={vendor.city}
                  onChange={onChangeProductValues}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridNote">
                Stock
                <Form.Control
                  type="text"
                  placeholder="Enter Note"
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