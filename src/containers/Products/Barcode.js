import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Barcode = (props) => {

  const {
    open,
    handleClose,
    setBarcodes,
  } = props;

  const [barcode, setBarocode] = useState({});

  const onChangeCategoryName = (event) => {
    setBarocode({value: event.target.value});
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onSubmitCategory = () => {
    setBarcodes(oldValue => ([...oldValue, barcode]));
    handleClose();
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
          fullWidth
          onChange={onChangeCategoryName}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSubmitCategory}
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
