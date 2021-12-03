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

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';
import { 
  validateInputValueAndShowErrorMessage,
  onForbidden
 } from '../../common/utils';

import {
  fetchDocumentType,
  createDocumentType,
  updateDocumentType,
  restStoreData,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageDocumentTypes.fetchDocumentTypePending,
    initialDocumentType: state.manageDocumentTypes.documentType,
    error: state.manageDocumentTypes.fetchDocumentTypeError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDocumentType: (id) => dispatch(fetchDocumentType(id)),
    onCreateDocumentType: (documentType) => dispatch(createDocumentType(documentType)),
    onUpdateDocumentType: (documentType) => dispatch(updateDocumentType(documentType)),
    onResetData: () => dispatch(restStoreData()),
  }
}

const DocumentType = (props) => {
  const {
    open,
    id,
    handleClose,
    isPending,
    initialDocumentType,
    error,
    onFetchDocumentType,
    onCreateDocumentType,
    onUpdateDocumentType,
    onResetData,
  } = props;

  const history = useHistory();

  const [documentType, setDocumentType] = useState({});
  const [openAlert, setOpenAlert] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (id !== 0) {
      onFetchDocumentType(id);
    }
  }, [id, onFetchDocumentType])

  useEffect(() => {
    if (id !== 0) {
      setDocumentType(initialDocumentType);
    } else {
      setDocumentType({});
    }
  }, [id, initialDocumentType])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const onChangeDocumentTypeName = (event) => {
    validateInputValueAndShowErrorMessage(
      setShowError,
      "^[A-Za-z\\s]+$",
      event,
      setErrorMessage,
      "Document type name should contain only letters!")
    setDocumentType({ ...documentType, name: event.target.value });
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onPressEnter = (event) => {
    if (event.charCode === 13) {
      onSubmitDocumentType();
    }
  }

  const onSubmitDocumentType = () => {
    if (!showError) {
      if (id !== 0) {
        onUpdateDocumentType(documentType);
      } else {
        onCreateDocumentType(documentType);
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
        <DialogTitle id="form-dialog-title">Add New Document Type</DialogTitle>
        :
        <ProgressLoading />}
        {initialDocumentType.status === 403 ? onForbidden(history, onResetData) :
      <DialogContent>
        <DialogContentText>
          Please enter the name for a new document type.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="Document Type"
          type="text"
          fullWidth
          required={true}
          error={showError}
          helperText={errorMessage}
          value={documentType.name}
          onChange={onChangeDocumentTypeName}
          onKeyPress={onPressEnter}
        />
      </DialogContent>}
      <DialogActions>
        <Button
          onClick={onSubmitDocumentType}
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

export default connect(mapStateToProps, mapDispatchToProps)(DocumentType);