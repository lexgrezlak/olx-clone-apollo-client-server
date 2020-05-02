import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Postings from './components/Postings';
import { NewPosting } from './components/NewPosting';
import Search from './components/Search';
import { GET_POSTINGS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { Item } from './common/types';

const App: React.FC = () => {
  const [needToRefetch, setNeedToRefetch] = useState(false);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new-posting">New Posting</Link>
        <Link to="/account">Account</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/followed">Followed</Link>
        <Link to="/filtered">Filters</Link>
      </nav>
      <Switch>
        <Route path="/new-posting">
          <NewPosting setNeedToRefetch={setNeedToRefetch} />
        </Route>
        <Route path="/account">{/* <Account /> */}</Route>
        <Route path="/">
          <Postings
            needToRefetch={needToRefetch}
            setNeedToRefetch={setNeedToRefetch}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
