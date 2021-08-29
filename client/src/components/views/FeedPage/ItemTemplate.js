import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ItemInput from './ItemInput';
import ItemList from './ItemList';

function ItemTemplate() {
  const [Items, setItems] = useState([]);

  const onSubmitHandler = (contents) => {
    const body = {
      contents: contents,
    };

    const addItems = async () => {
      const response = await axios.post('/api/items', body);
      setItems([...Items, response.data.itemInfo]);
    };
    addItems();
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get('/api/items');
      setItems(response.data.items);
    };
    fetchItems();
  }, []);

  return (
    <div>
      <ItemInput onSubmitHandler={onSubmitHandler} />
      <ItemList items={Items} />
    </div>
  );
}

export default ItemTemplate;
