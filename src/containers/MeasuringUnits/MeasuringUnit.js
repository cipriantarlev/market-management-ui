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
  fetchMeasuringUnit,
  createMeasuringUnit,
  updateMeasuringUnit,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.manageMeasuringUnits.fetchMeasuringUnitPending,
    initialMeasuringUnit: state.manageMeasuringUnits.measuringUnit,
    error: state.manageMeasuringUnits.fetchMeasuringUnitError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMeasuringUnit: (id) => dispatch(fetchMeasuringUnit(id)),
    onCreateMeasuringUnit: (measuringUnit) => dispatch(createMeasuringUnit(measuringUnit)),
    onUpdateMeasuringUnit: (measuringUnit) => dispatch(updateMeasuringUnit(measuringUnit)),
  }
}
const MeasuringUnit = (props) => {
  const {
    open,
    id,
    handleClose,
    isPending,
    initialMeasuringUnit,
    error,
    onFetchMeasuringUnit,
    onCreateMeasuringUnit,
    onUpdateMeasuringUnit,
  } = props;


  const history = useHistory();

  const [measuringUnit, setMeasuringUnit] = useState({});

  useEffect(() => {
    if (id !== 0) {
      onFetchMeasuringUnit(id);
    }
  }, [id, onFetchMeasuringUnit])

  useEffect(() => {
    if (id !== 0) {
      setMeasuringUnit(initialMeasuringUnit);
    } else {
      setMeasuringUnit({});
    }
  }, [id, initialMeasuringUnit])

  const onChangeMeasuringUnitValues = (event) => {
    if (event.target.id === "name") {
      setMeasuringUnit({ ...measuringUnit, name: event.target.value });
    }
}

const onCancel = () => {
  const answer = window.confirm('Are you sure you want to cancel?');
  return answer === true ? handleClose() : null;
}

const onSubmitMeasuringUnit = () => {
  if (id !== 0) {
    onUpdateMeasuringUnit(measuringUnit);
  } else {
    onCreateMeasuringUnit(measuringUnit);
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
    {error ? <div className="tc red f3">Something went wrong during measuring units featchin!</div> : null}
    {!isPending ?
      <DialogTitle id="form-dialog-title">Add New Measuring Unit</DialogTitle>
      :
      <DialogTitle id="form-dialog-title">Loading data...</DialogTitle>}
    <DialogContent>
      <DialogContentText>
        Please enter the name for a new measuring unit.
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        placeholder="Name"
        type="text"
        fullWidth
        value={measuringUnit.name}
        onChange={onChangeMeasuringUnitValues}
      />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onSubmitMeasuringUnit}
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

export default connect(mapStateToProps, mapDispatchToProps)(MeasuringUnit);