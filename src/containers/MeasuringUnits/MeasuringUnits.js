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

import { fetchMeasuringUnits, deleteMeasuringUnit } from '../actions';
import MeasuringUnit from './MeasuringUnit';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageMeasuringUnits.isPending,
    measuringUnits: state.manageMeasuringUnits.measuringUnits,
    error: state.manageMeasuringUnits.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMeasuringUnits: () => dispatch(fetchMeasuringUnits()),
    onDeleteMeasuringUnit: (id) => dispatch(deleteMeasuringUnit(id)),
  }
}

const MeasuringUnits = (props) => {
  const {
    isPending,
    measuringUnits,
    error,
    onFetchMeasuringUnits,
    onDeleteMeasuringUnit
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
    onFetchMeasuringUnits();
  }, [onFetchMeasuringUnits])

  const onAddNewMeasuringUnit = () => {
    setId(0);
    setOpenDialog(true);
  }

  const onUpdateMeasuringUnit = (elementId) => {
    setId(elementId);
    setOpenDialog(true);
  }

  const removeMeasuringUnit = (measuringUnitId) => {
    const answer = window.confirm(`Are you sure you want to delete Measuring Unit with id: ${measuringUnitId}?`);
    if (answer === true) {
      onDeleteMeasuringUnit(measuringUnitId);
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
        onClick={onAddNewMeasuringUnit}
      >
        Add new Measuring Unit
      </Button>
      {!isPending ?
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead style={{ backgroundColor: "#808080ad" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {measuringUnits.map((element) => (
                  <TableRow key={element.id}>
                    <TableCell component="th" scope="row">
                      <Link className="no-underline" to="#" onClick={() => onUpdateMeasuringUnit(element.id)} >
                        {element.id}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link className="no-underline" to="#" onClick={() => onUpdateMeasuringUnit(element.id)}>
                        {element.name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => removeMeasuringUnit(element.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <MeasuringUnit
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


export default connect(mapStateToProps, mapDispatchToProps)(MeasuringUnits);