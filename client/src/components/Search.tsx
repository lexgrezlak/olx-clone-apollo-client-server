import React, { useEffect, useState } from 'react';
import { useField } from '../hooks/index';

interface Props {
  filter: object;
}

const Search: React.FC<Props> = ({ filter }) => {
  return (
    <div>
      <input
        {...filter}
        name="search"
        placeholder="Find something for yourself"
      />
    </div>
  );
};

export default Search;
