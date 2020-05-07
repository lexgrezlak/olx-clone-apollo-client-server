import React, { useState } from "react";
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

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        <Switch>
          <Route path="/newposting">
            {isLoggedIn ? <NewPosting /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/account/messages">
            {isLoggedIn ? <AccountMessages /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/account/followed">
            {isLoggedIn ? <AccountFollowed /> : <Redirect push to="/signin" />}
          </Route>
          <Route path="/account">
            {isLoggedIn ? (
              <AccountDashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Redirect push to="/signin" />
            )}
          </Route>
          <Route path="/filters">
            <Filters />
          </Route>
          <Route path="/signin">
            {!isLoggedIn ? (
              <SignInPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/signup">
            {!isLoggedIn ? (
              <SignUpPage setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Redirect to="/" />
            )}
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
