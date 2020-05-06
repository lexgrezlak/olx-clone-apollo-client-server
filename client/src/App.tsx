import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import Postings from "./components/Postings";
import NewPosting from "./components/NewPosting";
import AccountDashboard from "./components/AccountDashboard";
import Filters from "./components/Filters";
import AccountMessages from "./components/AccountMessages";
import AccountFollowed from "./components/AccountFollowed";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import { GET_CURRENT_USER } from "./graphql/queries";

const App: React.FC = () => {
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const { data } = useQuery(GET_CURRENT_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
    }
  }, [data]);

  function handleLogout() {
    window.localStorage.clear();
    setUser(null);
  }

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/new-posting">
            <NewPosting user={user} />
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
            <Login user={user} />
          </Route>
          <Route path="/">
            <Postings />
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </div>
  );
};

export default App;
