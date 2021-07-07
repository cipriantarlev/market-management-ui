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

import { fetchCategories, deleteCategory } from '../actions';
import Category from './Category';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageCategories.isPending,
    categories: state.manageCategories.categories,
    error: state.manageCategories.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCategories: () => dispatch(fetchCategories()),
    onDeleteCategory: (id) => dispatch(deleteCategory(id)),
  }
}

const Categories = (props) => {

  const {
    isPending,
    categories,
    error,
    onFetchCategories,
    onDeleteCategory
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(0);

  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    onFetchCategories();
  }, [onFetchCategories])

  useEffect(() => {
    setTotalRows(categories.length);
  }, [categories])

  const onAddNewCategory = () => {
    setId(0);
    setOpenDialog(true);
  }

  const onUpdateCategory = (elementId) => {
    setId(elementId);
    setOpenDialog(true);
  }

  const removeCategory = (categoryId) => {
    const answer = window.confirm(`Are you sure you want to delete the user with id: ${categoryId}?`);
    if (answer === true) {
      onDeleteCategory(categoryId);
      history.go(0);
    }
  }

  const changePage = (event, pageNr) => {
    if(pageNr <= totalRows){
      setPage(pageNr)
    }
  }

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 30 }}>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddNewCategory}
      >
        Add new Category
      </Button>
      {!isPending ?
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead style={{ backgroundColor: "#808080ad" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element) => (
                  <TableRow key={element.id}>
                    <TableCell component="th" scope="row">
                      <Link className="no-underline" to="#" onClick={() => onUpdateCategory(element.id)} >
                        {element.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link className="no-underline" to="#" onClick={() => onUpdateCategory(element.id)}>
                        {element.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeCategory(element.id)}
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
          <Category
            open={openDialog}
            handleClose={handleClose}
            id={id}
          />
        </div>
        :
        <h3>Loading data ...</h3>}
      {error ? <div style={{ color: 'red', textAlign: 'center', margin: 20, fontSize: '2em' }}>Error! Something went wrong!!!</div> : null}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);