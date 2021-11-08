import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Link, useHistory } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../actions';

import './style.css';

import DisplayAlert from '../../common/DisplayAlert';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageProducts.isPending,
    products: state.manageProducts.products,
    error: state.manageProducts.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProducts: () => dispatch(fetchProducts()),
    onDeleteProduct: (id) => dispatch(deleteProduct(id)),
  }
}

const Products = (props) => {
  const {
    isPending,
    products,
    error,
    onFetchProducts,
    onDeleteProduct
  } = props;

  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const addLinkToCell = (params) => (
    <Link className="no-underline" to={`/products/${params.id}`}>
      {params.value}
    </Link>
  )

  const displayBarcodes = (params) => (
    params.value.reduce((acc, value) => {
      const result = `${value.value}, ${acc}`
      return result.replace(/[, ]+$/, "");
    }, ''));

  const addButtonToCell = (params) => (
    <Button
      variant="contained"
      color="secondary"
      style={{
        height: 22
      }}
      startIcon={<DeleteIcon />}
      onClick={() => removeProduct(params.id)}
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
      field: 'nameRom',
      headerName: 'Name',
      width: 250,
      renderCell: addLinkToCell,
    },
    {
      field: 'discrountPrice',
      headerName: 'Discrount Price',
      width: 180,
    },
    {
      field: 'retailPrice',
      headerName: 'Retail Price',
      width: 150,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
    },
    {
      field: 'barcodes',
      headerName: 'Barcodes',
      width: 240,
      renderCell: displayBarcodes
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
    onFetchProducts();
  }, [onFetchProducts])

  useEffect(() => {
    setDisplayProducts(products);
  }, [products])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const removeProduct = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the product with id: ${id}?`);
    if (answer) {
      onDeleteProduct(id);
      history.go(0);
    }
  }

  const onAddNewProduct = () => {
    history.push("/products/0")
  }

  const onSelectProducts = (selectedProductsArray) => (setSelectedProducts(selectedProductsArray.selectionModel));

  const onDeleteSelectedProducts = () => {
    if(selectedProducts !== undefined && selectedProducts.length > 0) {
      if(window.confirm(`Are you sure you want to delete selected products?`)) {
        selectedProducts.forEach(productId => {
          onDeleteProduct(productId);
        })
      }
      history.go(0);
    } else {
      alert("You didn't select any products. Please select and try again.");
    }
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
        <div className="center mt-3" style={{ height: '34em', width: '77rem' }}>
          <Button
            variant="contained"
            className="mb-2"
            style={{ backgroundColor: '#2aa839', color: 'white' }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={onAddNewProduct}
          >
            Add new Product
          </Button>
          <Button
            variant="contained"
            className="mb-2 ml-5"
            startIcon={<DeleteIcon />}
            color="secondary"
            onClick={onDeleteSelectedProducts}
          >
            Delete Selected Product(s)
          </Button>
          <DisplayAlert
          error={error}
          open={open}
          setOpen={setOpen}
        />
          <DataGrid
            rows={displayProducts}
            columns={columns}
            pageSize={25}
            checkboxSelection={true}
            loading={isPending}
            sortingOrder={['asc', 'desc', null]}
            disableSelectionOnClick={true}
            rowHeight={30}
            onSelectionModelChange={onSelectProducts}
          />
        </div>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);