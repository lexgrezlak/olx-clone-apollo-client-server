import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/client";
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
  const [needToRefetch, setNeedToRefetch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useQuery(GET_CURRENT_USER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (data && data.currentUser) {
      setIsLoggedIn(true);
    }
  }, [data, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/new-posting">
            <NewPosting
              setNeedToRefetch={setNeedToRefetch}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/account/messages">
            <AccountMessages isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/account/followed">
            <AccountFollowed isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/account">
            <AccountDashboard
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/login">
            <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
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
