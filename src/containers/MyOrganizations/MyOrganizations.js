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

import {
  fetchMyOrganizations,
  deleteMyOrganization
} from '../../actions/myOrganizationAction';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageMyOrganizations.isPending,
    myOrganizations: state.manageMyOrganizations.myOrganizations,
    error: state.manageMyOrganizations.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyOrganizations: () => dispatch(fetchMyOrganizations()),
    onDeleteMyOrganization: (id) => dispatch(deleteMyOrganization(id)),
  }
}

const MyOrganizations = (props) => {

  const {
    myOrganizations,
    isPending,
    error,
    onFetchMyOrganizations,
    onDeleteMyOrganization
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onFetchMyOrganizations();
  }, [onFetchMyOrganizations])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const onAddNewUser = () => {
    history.push("/my-organizations/0")
  }

  const removeMyOrg = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the user with id: ${id}?`);
    if (answer === true) {
      onDeleteMyOrganization(id);
      history.go(0);
    }
  }

  const renderTableContent = () => (
    !isPending ?
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{ backgroundColor: "#808080ad" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Fiscal Code</TableCell>
            <TableCell align="center">Bank Account</TableCell>
            <TableCell align="center">City</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myOrganizations.map((element) => (
            <TableRow key={element.id}>
              <TableCell component="th" scope="row">
                <Link className="no-underline" to={`/my-organizations/${element.id}`}>
                  {element.id}
                </Link>
              </TableCell>
              <TableCell align="center">
                <Link className="no-underline" to={`/my-organizations/${element.id}`}>
                  {element.name}
                </Link>
              </TableCell>
              <TableCell align="center">{element.fiscalCode}</TableCell>
              <TableCell align="center">{element.bankAccount}</TableCell>
              <TableCell align="center">{element.city}</TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeMyOrg(element.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :
    <ProgressLoading />
  )

  return (
    <div style={{ width: 'auto', margin: 100, }}>
      {myOrganizations.status === 403 ? history.push("/forbidden") : 
      <div>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        onClick={onAddNewUser}
      >
        Add new Organization
      </Button>
      <DisplayAlert
        error={error}
        open={open}
        setOpen={setOpen}
      />
      {renderTableContent()}
      </div>}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrganizations);