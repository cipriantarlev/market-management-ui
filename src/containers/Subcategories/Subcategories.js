import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
  fetchSubcategories,
  deleteSubcategory,
  restStoreData,
} from '../actions';

import Subcategory from './Subcategory';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageSubcategories.isPending,
    subcategories: state.manageSubcategories.subcategories,
    error: state.manageSubcategories.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSubategories: () => dispatch(fetchSubcategories()),
    onDeleteSubategory: (id) => dispatch(deleteSubcategory(id)),
    onRestStoreData: () => dispatch(restStoreData()),
  }
}

const Subcategories = (props) => {
  const {
    isPending,
    subcategories,
    error,
    onFetchSubategories,
    onDeleteSubategory,
    onRestStoreData,
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(0);

  const [open, setOpen] = useState(false);
  const [subcategoryList, setSubcategoryList] = useState([]);

  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
      setSubcategoryList([]);
      onRestStoreData();
    }
  };

  useEffect(() => {
    onFetchSubategories();
    setSubcategoryList(subcategories);
    // eslint-disable-next-line
  }, [onFetchSubategories, subcategoryList])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    setTotalRows(subcategories.length);
  }, [subcategories])

  const onAddNewSubcategory = () => {
    setId(0);
    setOpenDialog(true);
  }

  const onUpdateSubcategory = (elementId) => {
    setId(elementId);
    setOpenDialog(true);
  }

  const removeSubcategory = (subcategoryId) => {
    const answer = window.confirm(`Are you sure you want to delete the subcategory with id: ${subcategoryId}?`);
    if (answer === true) {
      onDeleteSubategory(subcategoryId);
      setSubcategoryList([]);
      onRestStoreData();
    }
  }

  const changePage = (event, pageNr) => {
    if (pageNr <= totalRows) {
      setPage(pageNr)
    }
  }

  const renderTableContent = () => (
    !isPending ?
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead style={{ backgroundColor: "#808080ad" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subcategories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element) => (
                <TableRow key={element.id}>
                  <TableCell component="th" scope="row">
                    <Link className="no-underline" to="#" onClick={() => onUpdateSubcategory(element.id)} >
                      {element.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className="no-underline" to="#" onClick={() => onUpdateSubcategory(element.id)}>
                      {element.name}
                    </Link>
                  </TableCell>
                  <TableCell>{element.category.name}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => removeSubcategory(element.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                rowsPerPage={rowsPerPage}
                count={totalRows}
                page={page}
                onChangePage={changePage}
                onChangeRowsPerPage={(event) => setRowsPerPage(event.target.value)}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Subcategory
        open={openDialog}
        handleClose={handleClose}
        id={id}
      />
    </div>
    :
    <ProgressLoading />
  )

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 20 }}>
      <Button
        variant="contained"
        className="mb-3"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddNewSubcategory}
      >
        Add new Subcategory
      </Button>
      {error ?
        <DisplayAlert
          error={error}
          open={open}
          setOpen={setOpen}
        /> : null}
      {subcategories.status === 403 ? history.push("/forbidden") : renderTableContent()}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Subcategories);