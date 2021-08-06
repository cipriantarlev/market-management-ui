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
  fetchDocumentType,
  createDocumentType,
  updateDocumentType,
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
  } = props;

  
  const history = useHistory();

  const [documentType, setDocumentType] = useState({});

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

  const onChangeDocumentTypeName = (event) => {
    setDocumentType({...documentType, name: event.target.value});
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onSubmitDocumentType = () => {
    if(id !== 0) {
      onUpdateDocumentType(documentType);
    } else {
      onCreateDocumentType(documentType);
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
        <DialogTitle id="form-dialog-title">Add New Document Type</DialogTitle>
        :
        <DialogTitle id="form-dialog-title">Loading data...</DialogTitle>}
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
          value={documentType.name}
          onChange={onChangeDocumentTypeName}
        />
      </DialogContent>
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