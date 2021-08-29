import React from 'react';

function Item({ item }) {
  return (
    <div className="postCard">
      <p className="postContents">{item.contents}</p>
      <p className="postAuthor">작성자: {item.author}</p>
    </div>
  );
}

export default Item;
