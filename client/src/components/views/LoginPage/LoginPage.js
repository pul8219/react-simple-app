import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {
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

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push('/main');
      } else {
        alert('로그인 에러: ' + response.payload.message);
      }
    });
  };

  const onClickHandler = (event) => {
    props.history.push('/register');
  };

  return (
    <div>
      <h1>Welcome!</h1>
      <form onSubmit={onSubmitHandler}>
        <label>ID</label>
        <input type="text" value={Id} onChange={onIdHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button type="submit">로그인</button>
      </form>
      <br />
      <button onClick={onClickHandler}>회원가입</button>
    </div>
  );
}

export default withRouter(LoginPage);
