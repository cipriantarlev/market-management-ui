import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import NavigationBar from '../NavBar/NavigationBar';

import { fetchUsers } from '../actions';

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
    error: state.fetchUsers.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => dispatch(fetchUsers())
  }
}

const Users = (props) => {

  const classes = useStyles();

  const {
    onFetchUsers,
    isPending,
    users,
    error
  } = props;

  useEffect(() => {
    onFetchUsers();
  }, [onFetchUsers])

  return (
    <div>
      <NavigationBar />

      <div style={{ width: 'auto', margin: 100, }}>
        {!isPending ?
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Roles</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.id}
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.roles.reduce((acc, role) => {
                        const result = `${role.role}, ${acc}`
                        return result.replace(/[, ]+$/, "");
                      }, '')}
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="secondary">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          :
          <h3>Loading data ...</h3>}
        {error ? <div style={{ color: 'red', textAlign: 'center', margin: 20, fontSize: '2em' }}>Error! Something went wrong!!!</div> : null}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);