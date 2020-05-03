import React from 'react';
import { User } from '../common/types';
import { Redirect } from 'react-router-dom';

interface Props {
  user: User | null;
}

const AccountMessages: React.FC<Props> = ({ user }) => {
  if (user === null) {
    return <Redirect push to="/login" />;
  }

  return <div>account messages</div>;
};

export default AccountMessages;
