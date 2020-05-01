import React from 'react';
import { useQuery } from '@apollo/client';
import { Posting } from './Posting';
import { Item } from '../common/types';
import { GET_POSTINGS } from '../graphql/queries';
import { useField } from '../hooks/index';
import Search from './Search';

interface Props {}

const Postings: React.FC<Props> = () => {
  const filter = useField('text');
  const { data, loading, error } = useQuery(GET_POSTINGS, {
    variables: { title: filter.value },
  });

  console.log(filter.value);

  return (
    <div>
      <Search filter={filter} />
      {!loading && !error && (
        <ul>
          {data.postings.map((item: Item) => (
            <Posting key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Postings;
