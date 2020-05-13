import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import Home from "./pages/Home";
import NewPosting from "./pages/NewPosting";
import Dashboard from "./pages/Dashboard";
import Filters from "./components/Filters";
import Messages from "./pages/Messages";
import Followed from "./pages/Followed";
import SignIn from "./pages/SignIn";
import Navigation from "./components/Navigation";
import SignUp from "./pages/SignUp";
import {
  GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
  GET_IS_LOGGED_IN,
} from "./graphql/queries";
import FullPosting from "./pages/FullPosting";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import EditPosting from "./pages/EditPosting";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

export default function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const { data: loggedData } = useQuery(GET_IS_LOGGED_IN);
  const postingMatch = useRouteMatch("/posting/:id") as any;
  const editMatch = useRouteMatch("/edit/:id") as any;
  const [followedPostingsIds, setFollowedPostingsIds] = useState<string[]>([]);

  const { data: followedData } = useQuery(
    GET_CURRENT_USER_FOLLOWED_POSTINGS_IDS,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  useEffect(() => {
    if (followedData?.currentUserFollowedPostings) {
      const ids = followedData.currentUserFollowedPostings.map(
        (posting: any) => posting.id
      );
      setFollowedPostingsIds(ids);
    }
  }, [followedData]);

  useEffect(() => {
    if (loggedData?.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedData]);

  return (
    <div className={classes.root}>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <PrivateRoute isLoggedIn={isLoggedIn} path="/newposting">
            <NewPosting />
          </PrivateRoute>
          <Route path="/posting/:id">
            <FullPosting
              id={postingMatch ? postingMatch.params.id : null}
              followedPostingsIds={followedPostingsIds}
            />
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
          <PrivateRoute isLoggedIn={isLoggedIn} path="/edit/:id">
            <EditPosting id={editMatch ? editMatch.params.id : null} />
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
            <Home followedPostingsIds={followedPostingsIds} />
          </Route>
          <Route path="/">
            <div>Page not found</div>
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
