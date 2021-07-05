import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import { fetchVendors, deleteVendor } from '../actions';

import './style.css';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageVendors.isPending,
    vendors: state.manageVendors.vendors,
    error: state.manageVendors.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVendors: () => dispatch(fetchVendors()),
    onDeleteVendor: (id) => dispatch(deleteVendor(id)),
  }
}

const Vendors = (props) => {

  const {
    isPending,
    vendors,
    error,
    onFetchVendors,
    onDeleteVendor
  } = props;

  const history = useHistory();

  const [displayVendors, setDisplayVendors] = useState([]);

  const addLinkToCell = (params) => (
    <Link className="no-underline" to={`/vendors/${params.id}`}>
      {params.value}
    </Link>
  )

  const addButtonToCell = (params) => (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={() => removeMyOrg(params.id)}
    >
      Delete
    </Button>
  )

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: addLinkToCell,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 320,
      renderCell: addLinkToCell,
    },
    {
      field: 'fiscalCode',
      headerName: 'Fiscal Code',
      width: 230,
    },
    {
      field: 'bankAccount',
      headerName: 'Bank Account',
      width: 230,
    },
    {
      field: 'vatCode',
      headerName: 'VAT Code',
      width: 160,
    },
    {
      field: '',
      headerName: 'Action',
      width: 122,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: addButtonToCell,
    },
  ];

  useEffect(() => {
    onFetchVendors();
  }, [onFetchVendors])

  useEffect(() => {
    setDisplayVendors(vendors);
  }, [vendors])

  const removeMyOrg = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the vendor with id: ${id}?`);
    if (answer === true) {
      onDeleteVendor(id);
      history.go(0);
    }
  }

  const onAddNewVendor = () => {
    history.push("/vendors/0")
  }

  return (
    <div style={{display: 'flex',  height: '100%', width: '100%' }}>
      <Button
        variant="contained"
        className="mt-4 h-25 w-10"
        style={{ backgroundColor: '#2aa839', color: 'white', marginLeft: 5, marginRight: 5, paddingLeft: 10, paddingRight: 10}}
        onClick={onAddNewVendor}
      >
        Add new Vendor
      </Button>
      {error ? <h4 className="tc red mt5">Something went wrong!</h4> :
        <div className="mt-4" style={{ height: 580, width: '80%', }}>
          <DataGrid
            rows={displayVendors}
            columns={columns}
            pageSize={25}
            checkboxSelection={true}
            loading={isPending}
            sortingOrder={['asc', 'desc', null]}
            disableSelectionOnClick={true}
            rowHeight={40}
          />
        </div>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);