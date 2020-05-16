import React from "react";
import { useApolloClient } from "@apollo/client";
import { Button } from "@material-ui/core";

function SignOutButton() {
  const client = useApolloClient();

  async function handleLogout() {
    window.localStorage.clear();
    await client.resetStore();
  }

  return (
    <Button onClick={handleLogout} variant="outlined">
      Sign Out
    </Button>
  );
}

export default SignOutButton;
