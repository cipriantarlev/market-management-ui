import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { validateInputValueAndShowErrorMessage } from '../../common/utils';
import { checkIfBarcodeExistsService } from './helper';

const Barcode = (props) => {

  const {
    open,
    handleClose,
    setBarcodes,
    barcodeIndex,
    barcodes,
    setBarcodeIndex,
  } = props;

  const [barcode, setBarocode] = useState({});

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeCategoryName = (event) => {
    validateInputValueAndShowErrorMessage(
      setShowError,
      "^[0-9]+$",
      event,
      setErrorMessage,
      "Barcode value should contain only numbers!")
    setBarocode({ value: event.target.value });
  }

  useEffect(() => {
    if (barcodeIndex >= 0) {
      setBarocode({ ...barcodes[barcodeIndex] });
    }
  }, [barcodes, barcodeIndex])

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer) {
      setBarocode({});
      setBarcodeIndex(-1);
      handleClose();
    }
  }

  const onPressEnter = (event) => {
    if (event.charCode === 13) {
      onSubmit();
    }
  }

  const updateBarcodeList = () => (
    barcodes.filter((element, index) => index !== barcodeIndex)
  )

  const checkIfBarcodeExistsInDb = () => (
    new Promise((resolve) => {
      resolve(checkIfBarcodeExistsService(barcode.value));
    })
  )

  const checkIfBarcodeExistsInMemory = () => {
    const resultedArray = barcodes.filter((element) => barcode.value === element.value);
    return barcodes.includes(resultedArray[0]);
  }

  const onSubmit = async () => {
    if (checkIfBarcodeExistsInMemory()) {
      alert(`Barcode has been already added. Please try another.`);
    } else {
      if (barcode?.value !== undefined) {
        const barcodeByValue = await checkIfBarcodeExistsInDb();
        onSubmitBarcode(barcodeByValue);
      } else {
        alert(`You didn't provide a value for barcode. Please try again.`);
      }
    }
  }

  const onSubmitBarcode = (barcodeByValue) => {
    if (!showError) {
      if (!barcodeByValue) {
        if (barcodes[barcodeIndex] !== undefined) {
          setBarcodes([...updateBarcodeList(), barcode]);
        } else {
          setBarcodes(oldValue => ([...oldValue, barcode]));
        }
        setBarocode({});
        setBarcodeIndex(-1);
        handleClose();
      } else {
        alert(`Barcode already exists in database. Please try another.`);
      }
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      disableEscapeKeyDown={true}
    >
      <DialogTitle id="form-dialog-title">Add New Barcode</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the new barcode.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="Barcode"
          type="text"
          required={true}
          error={showError}
          helperText={errorMessage}
          value={barcode.value}
          fullWidth
          onChange={onChangeCategoryName}
          onKeyPress={onPressEnter}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSubmit}
          className="mr5 w4"
          variant="contained"
          color="primary"
        >
          Add
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

export default Barcode;