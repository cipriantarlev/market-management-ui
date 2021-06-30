import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';

import { 
  fetchUser, 
  fetchRoles, 
  createUser, 
  updateUser,
  fetchUsers
} from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.fetchUsers.isPending,
    initialUser: state.fetchUsers.user,
    error: state.fetchUsers.error,
    roles: state.fetchUsers.roles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (id) => dispatch(fetchUser(id)),
    onFetchRoles: () => dispatch(fetchRoles()),
    onCreateUser: (user) => dispatch(createUser(user)),
    onUpdateUser: (user) => dispatch(updateUser(user)),
    onFetchUsers: () => dispatch(fetchUsers())
  }
}

const User = (props) => {

  const {
    onFetchUser,
    initialUser,
    roles,
    onFetchRoles,
    onCreateUser,
    onUpdateUser,
    onFetchUsers
  } = props;

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const salt = bcrypt.genSaltSync(10);

  useEffect(() => {
    onFetchRoles();
  }, [onFetchRoles]);

  useEffect(() => {
    if (id !== "0") {
      onFetchUser(id);
    }
  }, [id, onFetchUser])

  useEffect(() => {
    initializeRolesValue();
    if (id !== "0") {
      setUser(initialUser)
    } else {
      setSelectedRoles([]);
    }
  }, [initialUser, id])

  const initializeRolesValue = () => {
    let tempRoles = initialUser.roles !== undefined ? initialUser.roles.map(role => role.id) : [];
    setSelectedRoles(tempRoles);
  }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/users") : null;
  }

  const onSelectValue = (event) => {
    setSelectedRoles([].slice.call(event.target.selectedOptions).map(item => Number(item.value)));
    setUserRoler();
  }

  const setUserRoler = () => {
    let tempRole = [];
    selectedRoles.forEach(roleId => {
      roles.forEach(role => {
        if (role.id === roleId) {
          tempRole.push(role);
        }
      })
    })
    setUser(Object.assign(user, user, { roles: tempRole }));
  }


  const onChangeUserValues = (event) => {
    switch (event.target.id) {
      case "formGridUsername":
        setUser({ ...user, username: event.target.value });
        break;
      case "formGridPassword":
        setUser({ ...user, password: event.target.value });
        break;
      case "formGridConfirmPassword":
        setConfirmPassword(event.target.value);
        break;
      case "formGridEmail":
        setUser({ ...user, email: event.target.value });
        break;
      default:
        setUser({ ...user });
        break;
    }
  }

  const onSubmitUser = () => {
    if (user.password && confirmPassword && user.password === confirmPassword) {
      const hashPassword = bcrypt.hashSync(user.password, salt);
      setUser(Object.assign(user, user, { password: hashPassword }));
      setUserRoler();
      if(id !== "0") {
        onUpdateUser(user);
      } else {
        onCreateUser(user);
      }
      onFetchUsers();
      history.push("/users");
    } else {
      setInvalidPassword(true);
      setConfirmPassword('');
    }
  }

  return (
    <div className="w-40 center mt4">
      <Form>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={onChangeUserValues}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={onChangeUserValues}
            isInvalid={invalidPassword}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            isInvalid={invalidPassword}
            onChange={onChangeUserValues}
            aria-describedby="passwordHelpBlock"
          />
          {invalidPassword ?
            <Form.Text id="passwordHelpBlock" style={{color: 'red'}}>
              Passwords don't match
            </Form.Text>
            : null
          }
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={onChangeUserValues}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridMultipleOptions">
          <Form.Label>Roles</Form.Label>
          <Form.Control
            as="select"
            htmlSize={2}
            multiple
            value={selectedRoles}
            onChange={onSelectValue}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.role}</option>
            ))}

          </Form.Control>
        </Form.Group>
        <div>
          <Button
            className="ml3 w4"
            variant="primary"
            onClick={onSubmitUser}
          >
            Submit
          </Button>
          <Button
            className="btn btn-warning ml5 w4"
            onClick={onClickCancel}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(User);

