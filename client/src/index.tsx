import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  from,
  ApolloLink,
} from '@apollo/client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
`;

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('olx-clone-user-token');
  operation.setContext(({ headers }: any) => ({
    headers: {
      authorization: token ? `bearer ${token}` : null,
      ...headers,
    },
  }));
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
