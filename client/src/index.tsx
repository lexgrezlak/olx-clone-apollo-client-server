import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  createHttpLink,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { createGlobalStyle } from "styled-components";
import { setContext } from "apollo-link-context";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
  }
`;

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const httpLink = createHttpLink({
//   uri: "http://localhost:3000",
// });

const uploadLink = createUploadLink({
  uri: "http://localhost:4000",
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  // @ts-ignore
  link: from([authLink, uploadLink]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <GlobalStyle />
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
