import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  fetchVat,
  createVat,
  updateVat,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageVat.fetchVatPending,
    initialVat: state.manageVat.vat,
    error: state.manageVat.fetchVatError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVat: (id) => dispatch(fetchVat(id)),
    onCreateVat: (category) => dispatch(createVat(category)),
    onUpdateVat: (category) => dispatch(updateVat(category)),
  }
}

const Vat = (props) => {

  const {
    open,
    id,
    handleClose,
    isPending,
    initialVat,
    error,
    onFetchVat,
    onCreateVat,
    onUpdateVat,
  } = props;


  const history = useHistory();

  const [vat, setVat] = useState({});

  useEffect(() => {
    if (id !== 0) {
      onFetchVat(id);
    }
  }, [id, onFetchVat])

  useEffect(() => {
    if (id !== 0) {
      setVat(initialVat);
    } else {
      setVat({});
    }
  }, [id, initialVat])

  const onChangeVatValues = (event) => {
    if (event.target.id === "name") {
      setVat({ ...vat, name: event.target.value });
    }
    if (event.target.id === "value") {
      setVat({ ...vat, value: event.target.value });
    }
}

const onCancel = () => {
  const answer = window.confirm('Are you sure you want to cancel?');
  return answer === true ? handleClose() : null;
}

const onSubmitVat = () => {
  if (id !== 0) {
    onUpdateVat(vat);
  } else {
    onCreateVat(vat);
  }
  handleClose();
  history.go(0);
}

return (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="form-dialog-title"
    disableEscapeKeyDown={true}
  >
    {error ? <div className="tc red f3">Something went wrong during category!</div> : null}
    {!isPending ?
      <DialogTitle id="form-dialog-title">Add New Vat</DialogTitle>
      :
      <DialogTitle id="form-dialog-title">Loading data...</DialogTitle>}
    <DialogContent>
      <DialogContentText>
        Please enter the values for a new vat.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        placeholder="Vat Name"
        type="text"
        fullWidth
        value={vat.name}
        onChange={onChangeVatValues}
      />
      <TextField
        autoFocus
        margin="dense"
        id="value"
        placeholder="Vat Value"
        type="text"
        fullWidth
        value={vat.value}
        onChange={onChangeVatValues}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onSubmitVat}
        className="mr5 w4"
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button
        onClick={onCancel}
        variant="contained"
        className="btn btn-warning ml5 w4"
        style={{
          color: '#212529',
          backgroundColor: '#ffc107',
          borderColor: '#ffc107',
        }}
      >
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);
}

export default connect(mapStateToProps, mapDispatchToProps)(Vat);
