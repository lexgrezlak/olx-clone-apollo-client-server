import React from 'react';
import { User } from '../common/types';
import { Redirect } from 'react-router-dom';

interface Props {
  user: User | null;
  handleLogout: any;
}

const AccountDashboard: React.FC<Props> = ({ user, handleLogout }) => {
  if (user === null) {
    return <Redirect push to="/login" />;
  }

  return (
    <div>
      hello {user.username}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default AccountDashboard;
