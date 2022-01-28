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
  fetchCategory,
  createCategory,
  updateCategory,
} from '../../actions/categoryAction';
import { restStoreData } from '../../actions/restoreDataAction';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';
import {
  validateInputValueAndShowErrorMessage,
  onForbidden
} from '../../common/utils';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageCategories.fetchCategoryPending,
    initialCategory: state.manageCategories.category,
    error: state.manageCategories.fetchCategoryError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchCategory: (id) => dispatch(fetchCategory(id)),
    onCreateCategory: (category) => dispatch(createCategory(category)),
    onUpdateCategory: (category) => dispatch(updateCategory(category)),
    onResetData: () => dispatch(restStoreData()),
  }
}

const Category = (props) => {

  const {
    open,
    id,
    handleClose,
    isPending,
    initialCategory,
    error,
    onFetchCategory,
    onCreateCategory,
    onUpdateCategory,
    onResetData,
  } = props;

  const history = useHistory();

  const [category, setCategory] = useState({});
  const [openAlert, setOpenAlert] = useState(true);
  const [showNameError, setShowNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");

  useEffect(() => {
    if (id !== 0) {
      onFetchCategory(id);
    }
  }, [id, onFetchCategory])

  useEffect(() => {
    if (id !== 0) {
      setCategory(initialCategory);
    } else {
      setCategory({});
    }
  }, [id, initialCategory])

  useEffect(() => {
    setOpenAlert(true)
  }, [error])

  useEffect(() => {
    setOpenAlert(false)
  }, [])

  const onChangeCategoryName = (event) => {
    validateInputValueAndShowErrorMessage(
      setShowNameError,
      "^[A-Za-z\\s]+$",
      event,
      setNameErrorMessage,
      "Vat name should contain only letters, numbers, () or %!")
    setCategory({ ...category, name: event.target.value });
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? handleClose() : null;
  }

  const onPressEnter = (event) => {
    if (event.charCode === 13) {
      onSubmitCategory();
    }
  }

  const onSubmitCategory = () => {
    if (!showNameError) {
      if (id !== 0) {
        onUpdateCategory(category);
      } else {
        onCreateCategory(category);
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
        <DialogTitle id="form-dialog-title">Add New Category</DialogTitle>
        :
        <ProgressLoading />}
      {initialCategory.status === 403 ? onForbidden(history, onResetData) :
        <DialogContent>
          <DialogContentText>
            Please enter the name for a new category.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder="Category Name"
            type="text"
            fullWidth
            required={true}
            error={showNameError}
            helperText={nameErrorMessage}
            value={category.name}
            onChange={onChangeCategoryName}
            onKeyPress={onPressEnter}
          />
        </DialogContent>}
      <DialogActions>
        <Button
          onClick={onSubmitCategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
