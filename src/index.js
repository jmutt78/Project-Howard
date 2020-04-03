import React from "react";
import ReactDOM from "react-dom";
import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloLink, split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { AUTH_TOKEN } from "./constant";
import { endpoint, webSocket } from "./config";

import App from "./App";
import "./index.css";
import "tachyons";

const httpLink = new HttpLink({
  uri: process.env.NODE_ENV === "development" ? endpoint : endpoint
});

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists

  operation.setContext({
    fetchOptions: {
      credentials: "include"
    }
    // headers: {
    //   Authorization: tokenValue ? `Bearer ${tokenValue}` : ""
    // }
  });
  return forward(operation);
});

// authenticated httplink
const httpLinkAuth = middlewareLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: webSocket,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`
    }
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkAuth
);

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([link]),
  cache: new InMemoryCache(),
  connectToDevTools: true
});

const token = localStorage.getItem(AUTH_TOKEN);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// operation.setContext({
//   headers: {
//     Authorization: tokenValue ? `Bearer ${tokenValue}` : ""
//   }
// });
