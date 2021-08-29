import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import ItemTemplate from './ItemTemplate';

function FeedPage(props) {
  const onClickHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.logoutSuccess) {
        props.history.push('/');
      } else {
        alert('로그아웃 에러');
      }
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={onClickHandler}>로그아웃</button>
      <ItemTemplate />
    </div>
  );
}

export default withRouter(FeedPage);
