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
  fetchSubcategory,
  createSubcategory,
  updateSubcategory,
  fetchCategories
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageSubcategories.fetchSubategoryPending,
    initialSubcategory: state.manageSubcategories.subcategory,
    error: state.manageSubcategories.fetchSubcategoryError,
    categories: state.manageCategories.categories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSubcategory: (id) => dispatch(fetchSubcategory(id)),
    onCreateSubcategory: (subcategory) => dispatch(createSubcategory(subcategory)),
    onUpdateSubcategory: (subcategory) => dispatch(updateSubcategory(subcategory)),
    onFetchCategories: () => dispatch(fetchCategories()),
  }
}

const Subcategory = (props) => {
  const {
    open,
    id,
    handleClose,
    isPending,
    initialSubcategory,
    error,
    categories,
    onFetchSubcategory,
    onCreateSubcategory,
    onUpdateSubcategory,
    onFetchCategories,
  } = props;

  const history = useHistory();

  const [subccategory, setSubcategory] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    if (id !== 0) {
      onFetchSubcategory(id);
    }
  }, [id, onFetchSubcategory])

  useEffect(() => {
    onFetchCategories();
  }, [onFetchCategories])

  const intializeCategoryValue = () => {
    let tempCategory = initialSubcategory.category !== undefined ? initialSubcategory.category.id : 1;
    setSelectedCategory(tempCategory);
  }

  useEffect(() => {
    intializeCategoryValue();
    if (id !== 0) {
      setSubcategory(initialSubcategory);
    } else {
      setSubcategory({});
      setSelectedCategory(1);
    }// eslint-disable-next-line
  }, [id, initialSubcategory])

  const onChangeSubcategory = (event) => {
    if (event.target.id === "name") {
      setSubcategory({ ...subccategory, name: event.target.value });
    } else {
      let categoryObj = categories.find(category => category.id === Number(event.target.value));
      setSelectedCategory(Number(event.target.value));
      setSubcategory(Object.assign(subccategory, subccategory, { category: categoryObj }));
    }
  }

  const onCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    if (answer) {
      handleClose()
      if (id === 0) {
        setSubcategory({});
        setSelectedCategory(1);
      }
    }
  }

  const onSubmitSubcategory = () => {
    if (id !== 0) {
      onUpdateSubcategory(subccategory);
    } else {
      onCreateSubcategory(subccategory);
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
        <DialogTitle id="form-dialog-title">Add New Subcategory</DialogTitle>
        :
        <DialogTitle id="form-dialog-title">Loading data...</DialogTitle>}
      <DialogContent>
        <DialogContentText>
          Please enter the name for a new subccategory.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          placeholder="Subcategory Name"
          type="text"
          fullWidth
          value={subccategory.name}
          onChange={onChangeSubcategory}
        />
        <TextField
          autoFocus
          margin="dense"
          id="category"
          label="Subcategory Name"
          type="text"
          fullWidth
          select={true}
          value={selectedCategory}
          onChange={onChangeSubcategory}
        >
          {categories.map(category => (
            <option className="pointer dim black" key={category.id} value={category.id}>{category.name}</option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSubmitSubcategory}
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

export default connect(mapStateToProps, mapDispatchToProps)(Subcategory);