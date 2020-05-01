import React from 'react';
import { useQuery } from '@apollo/client';
import Posting from './Posting';
import { ALL_POSTINGS } from '../graphql/queries';

interface PostingInterface {
  title: string;
  id: number;
}

const Postings: React.FC = () => {
  const postingsQuery = useQuery(ALL_POSTINGS);

  if (postingsQuery.loading) {
    return <div>loading</div>;
  }

  const postings = postingsQuery.data.allPostings;

  return (
    <div>
      {postings.map((posting: PostingInterface) => (
        <Posting key={posting.id} posting={posting} />
      ))}
    </div>
  );
};

export default Postings;
