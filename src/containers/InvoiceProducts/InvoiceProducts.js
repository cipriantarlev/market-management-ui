import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import { fetchInvoiceProducts, deleteInvoiceProduct } from '../actions';

const drawerWidth = 240;
const marginTop = 56;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    marginTop: marginTop,
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: marginTop,
    zIndex: 0
  },
  drawerContainer: {
    overflow: 'auto',
  },
}));

const mapStateToProps = (state) => {
  return {
    isPending: state.manageInvoiceProducts.isPending,
    invoiceProducts: state.manageInvoiceProducts.invoiceProducts,
    error: state.manageInvoiceProducts.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInvoiceProducts: (invoiceId) => dispatch(fetchInvoiceProducts(invoiceId)),
    onDeleteInvoiceProduct: (id) => dispatch(deleteInvoiceProduct(id)),
  }
}
const InvoiceProducts = (props) => {
  const {
    isPending,
    invoiceProducts,
    error,
    onFetchInvoiceProducts,
    onDeleteInvoiceProduct
  } = props;

  const history = useHistory();
  const { id } = useParams();

  const classes = useStyles();

  const [displayInvoiceProducts, setDisplayInvoiceProduct] = useState([]);
  const [selectedInvoiceProducts, setSelectedInvoiceProduct] = useState([]);

  const addLinkToIdCell = (params) => (
    <Link className="no-underline" to={`/invoice-products/product/${params.id}`}>
      {params.value}
    </Link>
  )

  const renderBarcodes = (params) => (
    <Link className="no-underline" to={`/invoice-products/product/${params.id}`}>
      {params.value.barcodes[0].value}
    </Link>
  )

  const renderProductName = (params) => (
    <Link className="no-underline" to={`/invoice-products/product/${params.id}`}>
      {params.row.product.nameRom}
    </Link>
  )

  const renderDiscountPrice = (params) => (params.row.product.discrountPrice)
  const renderRetailPrice = (params) => (params.row.product.retailPrice)
  const renderTrandeMargin = (params) => (params.row.product.tradeMargin)
  const renderVatValue = (params) => (params.row.product.vat.name)

  const columns = [
    {
      field: 'orderNumber',
      headerName: '№',
      width: 75,
      renderCell: addLinkToIdCell,
    },
    {
      field: 'product',
      headerName: 'Barcode',
      width: 120,
      renderCell: renderBarcodes,
    },
    {
      field: 'product.nameRom',
      headerName: 'Product',
      width: 260,
      renderCell: renderProductName,
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 80,
    },
    {
      field: 'product.discountPrice',
      headerName: 'DP',
      width: 85,
      renderCell: renderDiscountPrice,
    },
    {
      field: 'product.retailPrice',
      headerName: 'RP',
      width: 85,
      renderCell: renderRetailPrice,
    },
    {
      field: 'vatSum',
      headerName: 'VAT',
      width: 95,
    },
    {
      field: 'totalDiscountPrice',
      headerName: 'TDP',
      width: 95,
    },
    {
      field: 'totalRetailPrice',
      headerName: 'TRP',
      width: 95,
    },
    {
      field: 'product.tradeMargin',
      headerName: 'TM%',
      width: 90,
      renderCell: renderTrandeMargin
    },
    {
      field: 'product.vat',
      headerName: 'VAT%',
      width: 95,
      renderCell: renderVatValue
    },
  ];


  useEffect(() => {
    onFetchInvoiceProducts(id);
  }, [onFetchInvoiceProducts, id])

  const addOrderNumberToInvoiceProduct = () => (
    invoiceProducts.map((element, index) => (
      Object.assign(element, element, { orderNumber: index + 1 })
    ))
  )

  useEffect(() => {
    setDisplayInvoiceProduct(addOrderNumberToInvoiceProduct());
    // eslint-disable-next-line 
  }, [invoiceProducts])

  const onAddNewInvoiceProduct = () => {
    history.push("/invoice-products/product/0")
  }

  const onSelectInvoiceProduct = (selectedInvoicesArray) => (setSelectedInvoiceProduct(selectedInvoicesArray.selectionModel));

  const onDeleteSelectedInvoiceProduct = () => {
    if (selectedInvoiceProducts !== undefined && selectedInvoiceProducts.length > 0) {
      if (window.confirm(`Are you sure you want to delete selected product?`)) {
        selectedInvoiceProducts.forEach(invoiceProductId => {
          onDeleteInvoiceProduct(invoiceProductId);
        })
      }
      history.go(0);
    } else {
      alert("You didn't select any product(s). Please try again.");
    }
  }

  const onUpdateSelectedInvoiceProduct = () => {
    if (selectedInvoiceProducts !== undefined && selectedInvoiceProducts.length === 1) {
      selectedInvoiceProducts.forEach(invoiceProductId => {
        history.push(`/invoice-products/product/${invoiceProductId}`);
      })
    } else {
      alert("You didn't select a product or selected more than one. Please try again.");
    }
  }

  const onUpdateSelectedInvoiceProductInformation = () => {
    if (selectedInvoiceProducts !== undefined && selectedInvoiceProducts.length === 1) {
      const selectedInvoiceProduct = displayInvoiceProducts.filter(element => (element.id === selectedInvoiceProducts[0]))
        history.push(`/products/${selectedInvoiceProduct[0].product.id}`);
    } else {
      alert("You didn't select a product or selected more than one. Please try again.");
    }
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {error ? <h4 className="tc red mt5">Something went wrong!</h4> :
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            <Toolbar />
            <div className={classes.drawerContainer}>
              <List>
                <Divider />
                <ListItem
                  button
                  divider
                  onClick={onAddNewInvoiceProduct}
                >
                  <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
                  <ListItemText primary={'Add new Product'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onUpdateSelectedInvoiceProduct}
                >
                  <ListItemIcon>{<UpdateIcon />}</ListItemIcon>
                  <ListItemText primary={'Update Product'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onUpdateSelectedInvoiceProductInformation}
                >
                  <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
                  <ListItemText primary={'Update Product Information'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onDeleteSelectedInvoiceProduct}
                >
                  <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
                  <ListItemText primary={'Delete Selected Product(s)'} />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <div className="center mt-3" style={{ height: '37em', width: '77rem' }}>
            <DataGrid
              rows={displayInvoiceProducts}
              columns={columns}
              pageSize={25}
              checkboxSelection={true}
              loading={isPending}
              sortingOrder={['asc', 'desc', null]}
              disableSelectionOnClick={true}
              rowHeight={30}
              onSelectionModelChange={onSelectInvoiceProduct}
              disableColumnMenu
            />
          </div>
        </div>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProducts);