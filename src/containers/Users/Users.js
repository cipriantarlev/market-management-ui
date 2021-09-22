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
  fetchUsers,
  deleteUser,
} from '../actions';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

import './style.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.fetchUsers.isPending,
    users: state.fetchUsers.users,
    error: state.fetchUsers.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(fetchUsers()),
    onDeleteUser: (id) => dispatch(deleteUser(id)),
  }
}

const Users = (props) => {

  const classes = useStyles();

  const {
    onFetchUsers,
    isPending,
    users,
    error,
    onDeleteUser,
  } = props;

  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const onAddNewUser = () => {
    history.push("/users/0")
  }

  const removeUser = (id) => {
    const answer = window.confirm(`Are you sure you want to delete the user with id: ${id}?`);
    if (answer === true) {
      onDeleteUser(id);
      history.go(0);
    }
  }

  return (
    <div style={{ width: 'auto', margin: 100, }}>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        onClick={onAddNewUser}
      >
        Add new User
      </Button>
      <DisplayAlert 
        error={error}
        open={open}
        setOpen={setOpen}
      />
      {!isPending ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#808080ad" }}>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Roles</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Link className="no-underline" to={`/users/${user.id}`}>
                      {user.id}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Link className="no-underline" to={`/users/${user.id}`}>
                      {user.username}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">
                    {user.roles.reduce((acc, role) => {
                      const result = `${role.role}, ${acc}`
                      return result.replace(/[, ]+$/, "");
                    }, '')}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeUser(user.id)}
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
        <ProgressLoading />}
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);