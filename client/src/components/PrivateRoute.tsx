import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, isLoggedIn, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            push
            to={{ pathname: "/signin", state: { from: location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
