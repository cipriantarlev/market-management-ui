import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

import {
  fetchInvoiceProducts,
  deleteInvoiceProduct,
  updateInvoice,
  restStoreData
} from '../actions';

import DisplayAlert from '../../common/DisplayAlert';

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
    onUpdateInvoice: (invoice) => dispatch(updateInvoice(invoice)),
    onRestData: () => dispatch(restStoreData()),
  }
}
const InvoiceProducts = (props) => {
  const {
    isPending,
    invoiceProducts,
    error,
    onFetchInvoiceProducts,
    onDeleteInvoiceProduct,
    onUpdateInvoice,
    onRestData
  } = props;

  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [displayInvoiceProducts, setDisplayInvoiceProduct] = useState([]);
  const [selectedInvoiceProducts, setSelectedInvoiceProduct] = useState([]);
  const [invoiceToUpdate, setInvoiceToUpdate] = useState({});
  const [invoiceValues, setInvoiceValue] = useState({});

  const addLinkToIdCell = (params) => {
    if (location.pathname.includes('/income-invoice-products')) {
      return <Link className="no-underline" to={`/income-invoice-products/${id}/product/${params.id}`}>
        {params?.value}
      </Link>
    } else if (location.pathname.includes('/outcome-invoice-products')) {
      return <Link className="no-underline" to={`/outcome-invoice-products/${id}/product/${params.id}`}>
        {params?.value}
      </Link>
    }
  }

  const renderBarcodes = (params) => {
    if (location.pathname.includes('/income-invoice-products')) {
      return <Link className="no-underline" to={`/income-invoice-products/${id}/product/${params.id}`}>
        {params?.value?.barcodes[0].value}
      </Link>
    } else if (location.pathname.includes('/outcome-invoice-products')) {
      return <Link className="no-underline" to={`/outcome-invoice-products/${id}/product/${params.id}`}>
        {params?.value?.barcodes[0].value}
      </Link>
    }
  }

  const renderProductName = (params) => {
    if (location.pathname.includes('/income-invoice-products')) {
      return <Link className="no-underline" to={`/income-invoice-products/${id}/product/${params.id}`}>
        {params?.row?.product?.nameRom}
      </Link>
    } else if (location.pathname.includes('/outcome-invoice-products')) {
      return <Link className="no-underline" to={`/outcome-invoice-products/${id}/product/${params.id}`}>
        {params?.row?.product?.nameRom}
      </Link>
    }
  }

  const renderDiscountPrice = (params) => {
    if (params.row.id !== 0) {
      return Number(params.row.product.discountPrice).toFixed(2);
    }
  };
  const renderRetailPrice = (params) => {
    if (params.row.id !== 0) {
      return Number(params.row.product.retailPrice).toFixed(2)
    }
  };
  const renderTrandeMargin = (params) => {
    if (params.row.id !== 0) {
      return Number(params.row.product.tradeMargin).toFixed(2)
    }
  };
  const renderVatValue = (params) => (params.row.product.vat.name);
  const renderTotalValue = (params) => (Number(params.value).toFixed(2));

  const renderQuatity = (params) => {
    if (params.row.product.measuringUnit.id === 1) {
      return Number(params.value).toFixed(3);
    }
    return params.value;
  }

  const columns = [
    {
      field: 'orderNumber',
      headerName: '№',
      width: 75,
      renderCell: addLinkToIdCell,
      sortable: false,
    },
    {
      field: 'product',
      headerName: 'Barcode',
      width: 120,
      renderCell: renderBarcodes,
      sortable: false
    },
    {
      field: 'product.nameRom',
      headerName: 'Product',
      width: 260,
      renderCell: renderProductName,
      sortable: false
    },
    {
      field: 'quantity',
      headerName: 'Qty',
      width: 80,
      renderCell: renderQuatity,
      sortable: false
    },
    {
      field: 'product.discountPrice',
      headerName: 'DP',
      width: 85,
      renderCell: renderDiscountPrice,
      sortable: false
    },
    {
      field: 'product.retailPrice',
      headerName: 'RP',
      width: 85,
      renderCell: renderRetailPrice,
      sortable: false
    },
    {
      field: 'vatSum',
      headerName: 'VAT',
      width: 95,
      renderCell: renderTotalValue,
      sortable: false
    },
    {
      field: 'totalDiscountPrice',
      headerName: 'TDP',
      width: 95,
      renderCell: renderTotalValue,
      sortable: false
    },
    {
      field: 'totalRetailPrice',
      headerName: 'TRP',
      width: 95,
      renderCell: renderTotalValue,
      sortable: false
    },
    {
      field: 'product.tradeMargin',
      headerName: 'TM%',
      width: 90,
      renderCell: renderTrandeMargin,
      sortable: false
    },
    {
      field: 'product.vat',
      headerName: 'VAT%',
      width: 95,
      renderCell: renderVatValue,
      sortable: false
    },
  ];

  useEffect(() => {
    onFetchInvoiceProducts(id);
  }, [onFetchInvoiceProducts, id])

  useEffect(() => {
    onFetchInvoiceProducts(id);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const addOrderNumberToInvoiceProduct = () => {
    if (invoiceProducts !== null || invoiceProducts !== undefined) {
      let invoiceProductWithOrder = invoiceProducts.map((element, index) => (
        Object.assign(element, element, { orderNumber: index + 1 })
      ))

      let quantity = invoiceProductWithOrder.reduce((acc, element) => (
        acc + element.quantity
      ), 0)

      let vatSum = invoiceProductWithOrder.reduce((acc, element) => (
        acc + element.vatSum
      ), 0)

      let totalDiscountPrice = invoiceProductWithOrder.reduce((acc, element) => (
        acc + element.totalDiscountPrice
      ), 0)

      let totalRetailPrice = invoiceProductWithOrder.reduce((acc, element) => (
        acc + element.totalRetailPrice
      ), 0)

      let averageTradeMargin = invoiceProductWithOrder.reduce((acc, element) => (
        acc + element.product.tradeMargin
      ), 0)

      let totalTradeMargin = invoiceProductWithOrder.reduce((acc, element) => (
        (element.product.retailPrice - element.product.discountPrice) + acc
      ), 0)

      averageTradeMargin = averageTradeMargin / invoiceProductWithOrder.length;

      setInvoiceValue({
        totalDiscountPrice,
        totalRetailPrice,
        vatSum,
        averageTradeMargin,
        totalTradeMargin
      });

      invoiceProductWithOrder.push({
        id: 0,
        quantity,
        vatSum,
        totalDiscountPrice,
        totalRetailPrice,
        invoice: null,
        product: {
          nameRom: '',
          discountPrice: '',
          retailPrice: '',
          tradeMargin: '',
          vat: '',
          barcodes: [{ value: '' }],
          measuringUnit: { id: 0 }
        },
      })
      return invoiceProductWithOrder;
    }
  }

  useEffect(() => {
    setInvoiceToUpdate(invoiceProducts[0]?.invoice);
    setDisplayInvoiceProduct(addOrderNumberToInvoiceProduct());
    // eslint-disable-next-line 
  }, [invoiceProducts])



  const onAddNewInvoiceProduct = () => {
    onRestData();
    pushHistory(`/income-invoice-products/${id}/product/0`,
      `/outcome-invoice-products/${id}/product/0`);
  }

  const pushHistory = (incomePath, outcomePath) => {
    if (location.pathname.includes('/income-invoice-products')) {
      history.push(incomePath);
    } else if (location.pathname.includes('/outcome-invoice-products')) {
      history.push(outcomePath);
    }
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
        pushHistory(`/income-invoice-products/${id}/product/${invoiceProductId}`,
          `/outcome-invoice-products/${id}/product/${invoiceProductId}`);
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

  const backToInvoices = () => {
    if (displayInvoiceProducts.length > 1) {
      Object.assign(
        invoiceToUpdate, invoiceToUpdate, {
        totalDiscountPrice: Math.round(invoiceValues.totalDiscountPrice * 100) / 100,
        totalRetailPrice: Math.round(invoiceValues.totalRetailPrice * 100) / 100,
        totalTradeMargin: Math.round(invoiceValues.totalTradeMargin * 100) / 100,
        tradeMargin: Math.round(invoiceValues.averageTradeMargin * 100) / 100,
        vatSum: Math.round(invoiceValues.vatSum * 100) / 100,
      }
      )
      onUpdateInvoice(invoiceToUpdate);
    }
    onRestData();
    pushHistory(`/income-invoices`, `/outcome-invoices`);
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
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
              <ListItem
                button
                divider
                onClick={backToInvoices}
              >
                <ListItemIcon>{<BackspaceIcon />}</ListItemIcon>
                <ListItemText primary={'Back to Invoices'} />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className="center mt-3" style={{ height: '37em', width: '77rem' }}>
          <DisplayAlert
            error={error}
            open={open}
            setOpen={setOpen}
          />
          <DataGrid
            rows={displayInvoiceProducts}
            columns={columns}
            pageSize={25}
            checkboxSelection={true}
            loading={isPending}
            // sortingOrder={['asc', 'desc', null]}
            disableSelectionOnClick={true}
            rowHeight={30}
            isRowSelectable={(params) => params.row.id !== 0}
            onSelectionModelChange={onSelectInvoiceProduct}
            disableColumnMenu
          />
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProducts);