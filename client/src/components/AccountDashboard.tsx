import React from 'react';
import { User } from '../common/types';

interface Props {
  user: User;
  handleLogout: any;
}

const AccountDashboard: React.FC<Props> = ({ user, handleLogout }) => {
  return (
    <div>
      hello {user ? user.username : null}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default AccountDashboard;
