import React from 'react';
import Item from './Item';

function ItemList({ items }) {
  return (
    <div>
      {items.length === 0 ? (
        <h2>No Posts Yet :(</h2>
      ) : (
        items.map((item) => <Item item={item} key={item._id} />)
      )}
    </div>
  );
}

export default ItemList;
