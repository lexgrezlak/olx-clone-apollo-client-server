import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { useApolloClient, useQuery } from "@apollo/client";
import Box from "@material-ui/core/Box";
import AllPostings from "./pages/AllPostings";
import NewPosting from "./pages/NewPosting";
import AccountDashboard from "./components/AccountDashboard";
import Filters from "./components/Filters";
import AccountMessages from "./components/AccountMessages";
import AccountFollowed from "./components/AccountFollowed";
import SignIn from "./pages/SignIn";
import Navigation from "./components/Navigation";
import Copyright from "./components/Copyright";
import SignUp from "./pages/SignUp";
import { GET_CURRENT_USER } from "./graphql/queries";
import FullPosting from "./pages/FullPosting";

export default function App() {
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const [followedPostings, setFollowedPostings] = useState([]);
  const { data, loading, error } = useQuery(GET_CURRENT_USER);
  const match = useRouteMatch("/posting/:id") as any;

  useEffect(() => {
    if (data && data.currentUser) {
      const { currentUser } = data;
      setUser(currentUser);
      setFollowedPostings(currentUser.followedPostings);
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
          <Route path="/newposting">
            {user ? <NewPosting /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/posting/:id">
            <FullPosting id={match ? match.params.id : null} />
          </Route>
          <Route path="/account/messages">
            {user ? <AccountMessages /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/account/followed">
            {user ? (
              <AccountFollowed followedPostings={followedPostings} />
            ) : (
              <Redirect push to="/signin" />
            )}
          </Route>
          <Route path="/account">
            {user ? (
              <AccountDashboard setUser={setUser} user={user} />
            ) : (
              <Redirect push to="/signin" />
            )}
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/signin">
            {!user ? <SignIn /> : <Redirect to="/" />}
          </Route>
          <Route path="/signup">
            {!user ? <SignUp /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            <AllPostings
              followedPostings={followedPostings}
              setFollowedPostings={setFollowedPostings}
            />
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
