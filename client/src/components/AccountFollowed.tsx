import React from "react";
import { Redirect } from "react-router-dom";

interface Props {
  isLoggedIn: boolean;
}

const AccountFollowed: React.FC<Props> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect push to="/login" />;
  }

  return <div>followed</div>;
};

export default AccountFollowed;
