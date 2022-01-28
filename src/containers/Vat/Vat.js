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
} from '../../actions/vatAction';
import { restStoreData } from '../../actions/restoreDataAction';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';
import { 
  validateInputValueAndShowErrorMessage,
  onForbidden
 } from '../../common/utils';

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
    onCreateVat: (vat) => dispatch(createVat(vat)),
    onUpdateVat: (vat) => dispatch(updateVat(vat)),
    onResetData: () => dispatch(restStoreData()),
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
    onResetData,
  } = props;

  const history = useHistory();

  const [vat, setVat] = useState({});
  const [openAlert, setOpenAlert] = useState(true);
  const [showNameError, setShowNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [showValueError, setShowValueError] = useState(false);
  const [valueErrorMessage, setValueErrorMessage] = useState("");

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

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const onChangeVatValues = (event) => {
    if (event.target.id === "name") {
      validateInputValueAndShowErrorMessage(
        setShowNameError,
        "^[a-zA-Z0-9()%\\s]+$",
        event,
        setNameErrorMessage,
        "Vat name should contain only letters, numbers, () or %!")
      setVat({ ...vat, name: event.target.value });
    }
    if (event.target.id === "value") {
      validateInputValueAndShowErrorMessage(
        setShowValueError,
        "^([0-9]|[1-9][0-9])$",
        event,
        setValueErrorMessage,
        "Vat value should contain only numbers. Max value is 99.")
      setVat({ ...vat, value: event.target.value });
    }
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onPressEnter = (event) => {
    if (event.charCode === 13) {
      onSubmitVat();
    }
  }

  const onSubmitVat = () => {
    if(!showNameError && !showValueError){
      if (id !== 0) {
        onUpdateVat(vat);
      } else {
        onCreateVat(vat);
      }
      handleClose();
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableEscapeKeyDown={true}
    >
      {error ?
        <DisplayAlert
          error={error}
          open={openAlert}
          setOpen={setOpenAlert}
        /> : null}
      {!isPending ?
        <DialogTitle id="form-dialog-title">Add New Vat</DialogTitle>
        :
        <ProgressLoading />}
        {initialVat.status === 403 ? onForbidden(history, onResetData) :
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
          required={true}
          error={showNameError}
          helperText={nameErrorMessage}
          value={vat.name}
          onChange={onChangeVatValues}
        />
        <TextField
          margin="dense"
          id="value"
          placeholder="Vat Value"
          type="text"
          fullWidth
          required={true}
          error={showValueError}
          helperText={valueErrorMessage}
          value={vat.value}
          onChange={onChangeVatValues}
          onKeyPress={onPressEnter}
        />
      </DialogContent>}
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
