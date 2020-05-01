import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Postings } from './components/Postings';
import { NewPosting } from './components/NewPosting';

const App: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new-posting">New Posting</Link>
        <Link to="/konto">Account</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/followed">Followed</Link>
        <Link to="/filtered">Filtered</Link>
      </nav>
      <Switch>
        <Route path="/new-posting">
          <NewPosting />
        </Route>
        <Route path="/">
          <Postings />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
