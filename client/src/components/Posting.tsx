import React from 'react';
import { Item } from '../common/types';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

interface Props {
  item: Item;
}

export const Posting: React.FC<Props> = ({ item }) => {
  return (
    <ListItem>
      <ListItemText>title: {item.title}</ListItemText>
      <ListItemText>description: {item.description}</ListItemText>
      <ListItemText>price: {item.price}</ListItemText>
      <ListItemText>phone: {item.phone}</ListItemText>
      <ListItemText>category: {item.category}</ListItemText>
    </ListItem>
  );
};
