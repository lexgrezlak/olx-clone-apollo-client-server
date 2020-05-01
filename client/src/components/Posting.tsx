import React from 'react';

interface PostingProps {
  posting: Posting;
}

const Posting: React.FC<PostingProps> = ({ posting }) => {
  return (
    <div>
      <div>price: {posting.price}</div>
      <div>title: {posting.title}</div>
      <div>location: {posting.location}</div>
      <div>date: {posting.date}</div>
    </div>
  );
};

export default Posting;
