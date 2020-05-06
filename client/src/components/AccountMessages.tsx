import React from "react";
import { Redirect } from "react-router-dom";

interface Props {
  user: any;
}

const AccountMessages: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return <Redirect push to="/login" />;
  }

  return <div>hello messages </div>;
};

export default AccountMessages;
