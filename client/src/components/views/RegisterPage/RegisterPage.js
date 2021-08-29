import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Id, setId] = useState('');
  const [Password, setPassword] = useState('');

  const onIdHandler = (event) => {
    setId(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const body = {
      id: Id,
      password: Password,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.registerSuccess) {
        props.history.push('/');
      } else {
        alert(response.payload.message);
      }
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={onSubmitHandler}>
        <label>ID</label>
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
