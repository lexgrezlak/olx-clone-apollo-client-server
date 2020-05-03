import React, { useEffect } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useField } from '../hooks/index';
import { LOGIN } from '../graphql/queries';
import { useMutation } from '@apollo/client';

interface Props {
  setError: Function;
  setToken: Function;
}

const Login: React.FC<Props> = ({ setError, setToken }) => {
  const username = useField('text');
  const password = useField('password');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('olx-clone-user-token', token);
    }
  }, [result.data, setToken]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({
      variables: { username: username.value, password: password.value },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" style={{ margin: '20px' }}>
        Login
      </Typography>
      <TextField fullWidth label="username" variant="outlined" {...username} />
      <TextField fullWidth label="password" variant="outlined" {...password} />
      <Button color="primary" size="large" variant="contained" type="submit">
        Add
      </Button>
    </form>
  );
};

export default Login;
