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
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  fetchInvoices,
  deleteInvoice,
  fetchIncomeInvoices,
  fetchOutComeInvoices,
} from '../actions';

import './style.css';

const drawerWidth = 240;
const marginTop = 56;

const useStyles = makeStyles((theme) => ({
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
    isPending: state.manageInvoices.isPending,
    invoices: state.manageInvoices.invoices,
    error: state.manageInvoices.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchInvoices: () => dispatch(fetchInvoices()),
    onFetchIncomeInvoices: () => dispatch(fetchIncomeInvoices()),
    onFetchOutComeInvoices: () => dispatch(fetchOutComeInvoices()),
    onDeleteInvoice: (id) => dispatch(deleteInvoice(id)),
  }
}

const Invoices = (props) => {
  const {
    isPending,
    invoices,
    error,
    onFetchInvoices,
    onFetchIncomeInvoices,
    onFetchOutComeInvoices,
    onDeleteInvoice,
    // location
  } = props;

  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const [displayInvoices, setDisplayInvoices] = useState([]);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const addLinkToCell = (params) => (
    <Link className="no-underline" to={`/invoice-products/${params.id}`}>
      {params.value.name}
    </Link>
  )

  const addLinkToIdCell = (params) => (
    <Link className="no-underline" to={`/invoice-products/${params.id}`}>
      {params.value}
    </Link>
  )

  const formateSumCell = (params) => (
    Number(params.value).toFixed(2)
  )

  const formateDateCell = (params) => (
    new Date(params.value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '.')
  )

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 75,
      renderCell: addLinkToIdCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'vendor',
      headerName: 'Vendor',
      width: 200,
      renderCell: addLinkToCell,
    },
    {
      field: 'myOrganization',
      headerName: 'Organization',
      width: 180,
      renderCell: addLinkToCell,
    },
    {
      field: 'invoiceDate',
      headerName: 'Date',
      width: 110,
      renderCell: formateDateCell,
    },
    {
      field: 'totalDiscountPrice',
      headerName: 'TDP',
      width: 95,
      renderCell: formateSumCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'totalRetailPrice',
      headerName: 'TRP',
      width: 95,
      renderCell: formateSumCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'totalTradeMargin',
      headerName: 'TTM',
      width: 95,
      renderCell: formateSumCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'tradeMargin',
      headerName: '% TM',
      width: 95,
      renderCell: formateSumCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'vatSum',
      headerName: 'VS',
      width: 95,
      renderCell: formateSumCell,
      disableColumnMenu: 'true',
    },
    {
      field: 'invoiceNumber',
      headerName: '№ - #',
      width: 120,
    },
    {
      field: 'note',
      headerName: 'Note',
      width: 120,
    },
  ];

  useEffect(() => {
    switch (location.pathname) {
      case '/income-invoices':
        onFetchIncomeInvoices();
        break;
      case '/outcome-invoices':
        onFetchOutComeInvoices();
        break;
      default:
        onFetchInvoices();
        break;
    }
    // eslint-disable-next-line
  }, [onFetchInvoices, location.pathname])

  useEffect(() => {
    setDisplayInvoices(invoices);
  }, [invoices])

  const onAddNewInvoice = () => {
    pushHistory("/income-invoices/0", "/outcome-invoices/0");
  }

  const pushHistory = (path1, path2) => {
    switch (location.pathname) {
      case '/income-invoices':
        history.push(path1);
        break;
      case '/outcome-invoices':
        history.push(path2);
        break;
      default:
        history.push("/");
        break;
    }
  }

  const onSelectInvoices = (selectedInvoicesArray) => (setSelectedInvoices(selectedInvoicesArray.selectionModel));

  const onDeleteSelectedInvoices = () => {
    if (selectedInvoices !== undefined && selectedInvoices.length > 0) {
      if (window.confirm(`Are you sure you want to delete selected invoices?`)) {
        selectedInvoices.forEach(invoiceId => {
          onDeleteInvoice(invoiceId);
        })
      }
      history.go(0);
    } else {
      alert("You didn't select any invoice(s). Please try again.");
    }
  }

  const onUpdateSelectedInvoice = () => {
    if (selectedInvoices !== undefined && selectedInvoices.length === 1) {
      selectedInvoices.forEach(invoiceId => {
        pushHistory(`/income-invoices/${invoiceId}`, `/outcome-invoices/${invoiceId}`);
      })
    } else {
      alert("You didn't select an invoice or selected more than one. Please try again.");
    }
  }

  const onUpdateSelectedInvoiceProducts = () => {
    if (selectedInvoices !== undefined && selectedInvoices.length === 1) {
      selectedInvoices.forEach(invoiceId => {
        pushHistory(`/income-invoice-products/${invoiceId}`, `/outcome-invoice-products/${invoiceId}`);
      })
    } else {
      alert("You didn't select an invoice or selected more than one. Please try again.");
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
                  onClick={onAddNewInvoice}
                >
                  <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
                  <ListItemText primary={'Add new Invoice'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onUpdateSelectedInvoiceProducts}
                >
                  <ListItemIcon>{<UpdateIcon />}</ListItemIcon>
                  <ListItemText primary={'Update Invoice'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onUpdateSelectedInvoice}
                >
                  <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
                  <ListItemText primary={'Update Invoice Header'} />
                </ListItem>
                <ListItem
                  button
                  divider
                  onClick={onDeleteSelectedInvoices}
                >
                  <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
                  <ListItemText primary={'Delete Selected Invoices(s)'} />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <div className="center mt-3" style={{ height: '37em', width: '77rem' }}>
            <DataGrid
              rows={displayInvoices}
              columns={columns}
              pageSize={25}
              checkboxSelection={true}
              loading={isPending}
              sortingOrder={['asc', 'desc', null]}
              disableSelectionOnClick={true}
              rowHeight={30}
              onSelectionModelChange={onSelectInvoices}
            />
          </div>
        </div>
      }
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Invoices);