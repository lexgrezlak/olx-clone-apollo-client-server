import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, user, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
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
