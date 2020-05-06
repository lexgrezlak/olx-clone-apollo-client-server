import React from "react";
import { Redirect } from "react-router-dom";

interface Props {
  handleLogout: any;
  isLoggedIn: boolean;
}

const AccountDashboard: React.FC<Props> = ({ isLoggedIn, handleLogout }) => {
  if (!isLoggedIn) {
    return <Redirect push to="/login" />;
  }

  return (
    <div>
      hello man
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default AccountDashboard;
