import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Postings from './components/Postings';
import NewPosting from './components/NewPosting';
import { useApolloClient } from '@apollo/client';
import AccountDashboard from './components/AccountDashboard';
import Filters from './components/Filters';
import AccountMessages from './components/AccountMessages';
import AccountFollowed from './components/AccountFollowed';
import Login from './components/Login';
import { User } from './common/types';

const App: React.FC = () => {
  const [needToRefetch, setNeedToRefetch] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();
  const history = useHistory();

  useEffect(() => {
    const tokenAndUserJSON = window.localStorage.getItem('olx-clone-user');
    if (tokenAndUserJSON) {
      const tokenAndUser = JSON.parse(tokenAndUserJSON);
      setUser(tokenAndUser.user);
    }
  }, []);

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
    client.resetStore();
    history.push('/');
  };

  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new-posting">New Posting</Link>
          <Link to="/account">Account</Link>
          <Link to="/account/messages">Messages</Link>
          <Link to="/account/followed">Followed</Link>
          <Link to="/filtered">Filters</Link>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path="/new-posting">
            <NewPosting setNeedToRefetch={setNeedToRefetch} user={user} />
          </Route>
          <Route path="/account/messages">
            <AccountMessages user={user} />
          </Route>
          <Route path="/account/followed">
            <AccountFollowed user={user} />
          </Route>
          <Route path="/account">
            <AccountDashboard user={user} handleLogout={handleLogout} />
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} setError={setError} />
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
