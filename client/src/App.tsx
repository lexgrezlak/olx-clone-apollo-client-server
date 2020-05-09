import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import Box from "@material-ui/core/Box";
import Home from "./pages/Home";
import NewPosting from "./pages/NewPosting";
import Dashboard from "./pages/Dashboard";
import Filters from "./components/Filters";
import Messages from "./pages/Messages";
import Followed from "./pages/Followed";
import SignIn from "./pages/SignIn";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import SignUp from "./pages/SignUp";
import { GET_IS_LOGGED_IN } from "./graphql/queries";
import FullPosting from "./pages/FullPosting";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  const client = useApolloClient();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const { data } = useQuery(GET_IS_LOGGED_IN);
  const match = useRouteMatch("/posting/:id") as any;

  useEffect(() => {
    console.log(data);
    if (data?.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [client, data]);

  if (isLoggedIn === null) return null;

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/newposting">
            <NewPosting />
          </PrivateRoute>
          <Route path="/posting/:id">
            <FullPosting id={match ? match.params.id : null} />
          </Route>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/account/messages">
            <Messages />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/account/followed">
            <Followed />
          </PrivateRoute>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/account">
            <Dashboard />
          </PrivateRoute>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/signin">
            <SignIn isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/signup">
            {!isLoggedIn ? <SignUp /> : <Redirect to="/account" />}
          </Route>
          <Route exact path="/">
            <Home />
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
