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
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { fetchVatList, deleteVat } from '../actions';
import Vat from './Vat';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageVat.isPending,
    vatList: state.manageVat.vatList,
    error: state.manageVat.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVatList: () => dispatch(fetchVatList()),
    onDeleteVat: (id) => dispatch(deleteVat(id)),
  }
}

const VatList = (props) => {

  const {
    isPending,
    vatList,
    error,
    onFetchVatList,
    onDeleteVat
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    onFetchVatList();
  }, [onFetchVatList])

  const onAddNewVat = () => {
    setId(0);
    setOpenDialog(true);
  }

  const onUpdateVat = (elementId) => {
    setId(elementId);
    setOpenDialog(true);
  }

  const removeVat = (categoryId) => {
    const answer = window.confirm(`Are you sure you want to delete Vat with id: ${categoryId}?`);
    if (answer === true) {
      onDeleteVat(categoryId);
      history.go(0);
    }
  }

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 30 }}>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddNewVat}
      >
        Add new Vat
      </Button>
      {!isPending ?
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead style={{ backgroundColor: "#808080ad" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vatList.map((element) => (
                  <TableRow key={element.id}>
                    <TableCell component="th" scope="row">
                      <Link className="no-underline" to="#" onClick={() => onUpdateVat(element.id)} >
                        {element.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link className="no-underline" to="#" onClick={() => onUpdateVat(element.id)}>
                        {element.name}
                      </Link>
                    </TableCell>
                    <TableCell>{element.value}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeVat(element.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Vat
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

export default connect(mapStateToProps, mapDispatchToProps)(VatList);