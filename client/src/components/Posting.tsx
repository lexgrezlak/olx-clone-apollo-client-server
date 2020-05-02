import React from 'react';
import { Item } from '../common/types';

interface Props {
  item: Item;
}

export const Posting: React.FC<Props> = ({ item }) => {
  return (
    <li>
      <div>title: {item.title}</div>
      <div>description: {item.description}</div>
      <div>price: {item.price}</div>
      <div>phone: {item.phone}</div>
      <div>category: {item.category}</div>
    </li>
  );
};
