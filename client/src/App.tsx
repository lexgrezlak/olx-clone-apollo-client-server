import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import Box from "@material-ui/core/Box";
import AllPostings from "./pages/AllPostings";
import NewPosting from "./pages/NewPosting";
import Dashboard from "./pages/Dashboard";
import Filters from "./components/Filters";
import AccountMessages from "./components/AccountMessages";
import AccountFollowed from "./components/AccountFollowed";
import SignIn from "./pages/SignIn";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import SignUp from "./pages/SignUp";
import { GET_CURRENT_USER } from "./graphql/queries";
import FullPosting from "./pages/FullPosting";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const match = useRouteMatch("/posting/:id") as any;

  useEffect(() => {
    if (data && data.currentUser) {
      const { currentUser } = data;
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, [client, data]);

  if (loading) return null;
  if (error) return <div>error</div>;

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <PrivateRoute user={user} path="/newposting">
            <NewPosting />
          </PrivateRoute>
          <Route path="/posting/:id">
            <FullPosting id={match ? match.params.id : null} />
          </Route>
          <PrivateRoute user={user} path="/account/messages">
            <AccountMessages />
          </PrivateRoute>
          <PrivateRoute user={user} path="/account/followed">
            <AccountFollowed />
          </PrivateRoute>
          <PrivateRoute user={user} path="/account">
            <Dashboard />
          </PrivateRoute>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/signin">
            {!user ? <SignIn /> : <Redirect to="/account" />}
          </Route>
          <Route path="/signup">
            {!user ? <SignUp /> : <Redirect to="/account" />}
          </Route>
          <Route exact path="/">
            <AllPostings />
          </Route>
          <Route path="/">
            <div>Page not found</div>
          </Route>
        </Switch>
      </main>
      <footer>
        <Box mt={8}>
          <Copyright />
        </Box>
      </footer>
    </div>
  );
}
