import React from 'react';
import { Item } from '../common/types';

interface Props {
  item: Item;
}

export const Posting: React.FC<Props> = ({ item }) => {
  return (
    <li>
      <div>price: {item.price}</div>
      <div>title: {item.title}</div>
      <div>location: {item.location}</div>
      <div>date: {item.date}</div>
    </li>
  );
};
