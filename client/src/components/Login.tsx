import React, { useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useField } from '../hooks/index';
import { LOGIN } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

interface Props {
  setError: Function;
  setUser: Function;
}

const Login: React.FC<Props> = ({ setError, setUser }) => {
  const email = useField('email');
  const password = useField('password');
  const history = useHistory();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const tokenAndUser = result.data.login;
      setUser(tokenAndUser.user);
      localStorage.setItem('olx-clone-user', JSON.stringify(tokenAndUser));
      history.goBack();
    }
  }, [result.data, setUser]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({
      variables: { email: email.value, password: password.value },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ margin: '20px' }}>
        Login
      </Typography>
      <TextField fullWidth label="email" variant="outlined" {...email} />
      <TextField fullWidth label="password" variant="outlined" {...password} />
      <Button color="primary" size="large" variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default Login;
