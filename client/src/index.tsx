import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  NormalizedCacheObject,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { createGlobalStyle } from "styled-components";
import { setContext } from "apollo-link-context";
import App from "./App";

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
