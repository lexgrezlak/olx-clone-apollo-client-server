import React from "react";
import { Redirect } from "react-router-dom";

interface Props {
  user: any;
}

const AccountFollowed: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return <Redirect push to="/login" />;
  }

  return <div>followed</div>;
};

export default AccountFollowed;
