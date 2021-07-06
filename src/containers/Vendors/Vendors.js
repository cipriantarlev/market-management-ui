import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
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
  const [selectedVendors, setSelectedVendors] = useState([]);

  const addLinkToCell = (params) => (
    <Link className="no-underline" to={`/vendors/${params.id}`}>
      {params.value}
    </Link>
  )

  const addButtonToCell = (params) => (
    <Button
      variant="contained"
      color="secondary"
      style={{
        height: 22
      }}
      startIcon={<DeleteIcon />}
      onClick={() => removeVendor(params.id)}
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

  const removeVendor = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the vendor with id: ${id}?`);
    if (answer) {
      onDeleteVendor(id);
      history.go(0);
    }
  }

  const onAddNewVendor = () => {
    history.push("/vendors/0")
  }

  const onSelectVendors = (selectedVendorArray) => (setSelectedVendors(selectedVendorArray.selectionModel));

  const onDeleteSelectedVendor = () => {
    if(selectedVendors !== undefined && selectedVendors.length > 0) {
      if(window.confirm(`Are you sure you want to delete selected vendors?`)) {
        selectedVendors.forEach(vendorId => {
          onDeleteVendor(vendorId);
        })
      }
      history.go(0);
    } else {
      alert("You didn't selected any vendors. Please select and try again.");
    }
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {error ? <h4 className="tc red mt5">Something went wrong!</h4> :
        <div className="center mt-3" style={{ height: '34em', width: '77rem' }}>
          <Button
            variant="contained"
            className="mb-2"
            style={{ backgroundColor: '#2aa839', color: 'white' }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={onAddNewVendor}
          >
            Add new Vendor
          </Button>
          <Button
            variant="contained"
            className="mb-2 ml-5"
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={onDeleteSelectedVendor}
          >
            Delete Selected Vendor(s)
          </Button>
          <DataGrid
            rows={displayVendors}
            columns={columns}
            pageSize={25}
            checkboxSelection={true}
            loading={isPending}
            sortingOrder={['asc', 'desc', null]}
            disableSelectionOnClick={true}
            rowHeight={30}
            onSelectionModelChange={onSelectVendors}
          />
        </div>
      }
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);