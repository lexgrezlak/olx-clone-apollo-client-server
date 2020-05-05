import React from "react";
import { Redirect } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

const AccountMessages: React.FC<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect push to="/login" />;
  }

  return <div>hello messages </div>;
};

export default AccountMessages;
