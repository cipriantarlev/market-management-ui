import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

import { 
  fetchMeasuringUnits, 
  deleteMeasuringUnit,
  restStoreData,
} from '../actions';

import MeasuringUnit from './MeasuringUnit';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

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
    onRestStoreData: () => dispatch(restStoreData()),
  }
}

const MeasuringUnits = (props) => {
  const {
    isPending,
    measuringUnits,
    error,
    onFetchMeasuringUnits,
    onDeleteMeasuringUnit,
    onRestStoreData,
  } = props;

  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(0);
  const [measuringUnitList, setMeasuringUnitList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
      setMeasuringUnitList([]);
      onRestStoreData();
    }
  };

  useEffect(() => {
    onFetchMeasuringUnits();
    setMeasuringUnitList(measuringUnits);
    // eslint-disable-next-line
  }, [onFetchMeasuringUnits, measuringUnitList])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

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
      setMeasuringUnitList([]);
      onRestStoreData();
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
      {error ? 
      <DisplayAlert 
        error={error}
        open={open}
        setOpen={setOpen}
      /> : null}
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
        <ProgressLoading />}
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(MeasuringUnits);