import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom';

import { fetchUser, fetchRoles } from '../actions';

const mapStateToProps = (state) => {
  return {
    isPending: state.fetchUsers.isPending,
    user: state.fetchUsers.user,
    error: state.fetchUsers.error,
    roles: state.fetchUsers.roles,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUser: (id) => dispatch(fetchUser(id)),
    onFetchRoles: () => dispatch(fetchRoles()),
  }
}

const User = (props) => {

  const {
    onFetchUser,
    user,
    roles,
    onFetchRoles
  } = props;

  const [selectedRoles, setSelectedRoles] = useState([])

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    onFetchUser(id);
    onFetchRoles();
  }, [onFetchUser, onFetchRoles, id]);


  // const onSetSelectedValue = () => {
  //   debugger;
  //   let roless = user.roles.map(role => role.id);
  //   setSelectedRoles(roless);
  // }

  const onClickCancel = () => {
    const answer = window.confirm('Are you sure you want to cancel?');
    return answer === true ? history.push("/users") : null;
  }

  const onSelectValue = (event) => {
     setSelectedRoles([].slice.call(event.target.selectedOptions).map(item => item.value))
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
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
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
          <Button className="ml3 w4" variant="primary" type="submit">
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

