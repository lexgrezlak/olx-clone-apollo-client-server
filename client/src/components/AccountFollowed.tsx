import React from 'react';
import { User } from '../common/types';

interface Props {
  user: User;
}

const AccountFollowed: React.FC<Props> = ({ user }) => {
  return <div>followed</div>;
};

export default AccountFollowed;
