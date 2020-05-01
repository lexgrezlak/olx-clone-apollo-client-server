import React from 'react';
import { useQuery } from '@apollo/client';
import { Posting } from './Posting';
import { ALL_POSTINGS } from '../graphql/queries';
import { Item } from '../common/types';

export const Postings: React.FC = () => {
  const postingsQuery = useQuery(ALL_POSTINGS);

  if (postingsQuery.loading) {
    return <div>loading</div>;
  }

  const items = postingsQuery.data.allPostings;

  return (
    <div>
      <ul>
        {items.map((item: Item) => (
          <Posting key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
