import axios from 'axios';
import React, { useState } from 'react';

function ItemInput(props) {
  const [Contents, setContents] = useState('');

  const onContentsHandler = (event) => {
    setContents(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!Contents) return alert('글 내용을 입력해주세요');
    props.onSubmitHandler(Contents);
    setContents('');
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          value={Contents}
          onChange={onContentsHandler}
          className="postInput"
        />
        <button type="submit">게시</button>
      </form>
    </div>
  );
}

export default ItemInput;
