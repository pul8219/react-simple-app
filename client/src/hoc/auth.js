import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) props.history.push('/');
        }
        // 로그인 한 상태
        else if (!option) props.history.push('/main');
      });
    }, []);

    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
