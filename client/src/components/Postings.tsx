import React from 'react';
import { useQuery } from '@apollo/client';
import { Posting } from './Posting';
import { Item } from '../common/types';
import { GET_POSTINGS } from '../graphql/queries';
import { useField } from '../hooks/index';
import Search from './Search';
import { List } from '@material-ui/core';

interface Props {
  needToRefetch: boolean;
  setNeedToRefetch: Function;
}

const Postings: React.FC<Props> = ({ needToRefetch, setNeedToRefetch }) => {
  const filter = useField('text');
  const { data, loading, error, refetch } = useQuery(GET_POSTINGS, {
    variables: { title: filter.value },
  });

  const makeRefetch = async () => {
    await refetch();
    setNeedToRefetch(false);
  };

  if (needToRefetch) makeRefetch();

  return (
    <div>
      <Search filter={filter} />
      {!loading && !error && (
        <List>
          {data.postings.map((item: Item) => (
            <Posting key={item.id} item={item} />
          ))}
        </List>
      )}
    </div>
  );
};

export default Postings;
