import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Postings from "./components/Postings";
import NewPosting from "./components/NewPosting";
import AccountDashboard from "./components/AccountDashboard";
import Filters from "./components/Filters";
import AccountMessages from "./components/AccountMessages";
import AccountFollowed from "./components/AccountFollowed";
import SignInPage from "./components/SignInPage";
import Navigation from "./components/Navigation";
import Box from "@material-ui/core/Box";
import Copyright from "./components/Copyright";
import SignUpPage from "./components/SignUpPage";
import { GET_CURRENT_USER } from "./graphql/queries";
import { useApolloClient, useQuery } from "@apollo/client";

const App: React.FC = () => {
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const { data } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (data && data.currentUser) {
      console.log(data.currentUser);
      setUser(data.currentUser);
    }
  }, [client, data]);

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
          <Route path="/account/messages">
            {user ? <AccountMessages /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/account/followed">
            {user ? <AccountFollowed /> : <Redirect push to="/signin" />}
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
            {!user ? <SignInPage /> : <Redirect to="/" />}
          </Route>
          <Route path="/signup">
            {!user ? <SignUpPage /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            <Postings />
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
};

export default App;
