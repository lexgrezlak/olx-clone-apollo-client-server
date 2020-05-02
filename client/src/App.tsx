import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Postings from './components/Postings';
import { NewPosting } from './components/NewPosting';
import Search from './components/Search';
import { GET_POSTINGS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { Item } from './common/types';
import AccountDashboard from './components/AccountDashboard';
import Filters from './components/Filters';
import AccountMessages from './components/AccountMessages';
import AccountFollowed from './components/AccountFollowed';
import Login from './components/Login';
import styled from 'styled-components';
const Header = styled.header`
  width: 100%;
`;

const App: React.FC = () => {
  const [needToRefetch, setNeedToRefetch] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div>
      <Header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new-posting">New Posting</Link>
          <Link to="/account">Account</Link>
          <Link to="/account/messages">Messages</Link>
          <Link to="/account/followed">Followed</Link>
          <Link to="/filtered">Filters</Link>
        </nav>
      </Header>
      <main>
        <Switch>
          <Route path="/new-posting">
            <NewPosting setNeedToRefetch={setNeedToRefetch} />
          </Route>
          <Route path="/account/messages">
            {user ? <AccountMessages user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/account/followed">
            {user ? <AccountFollowed user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/account">
            {user ? <AccountDashboard user={user} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Postings
              needToRefetch={needToRefetch}
              setNeedToRefetch={setNeedToRefetch}
            />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
