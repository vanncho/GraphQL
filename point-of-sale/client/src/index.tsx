import * as React from 'react';
import * as ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from "apollo-link-http";
import { ApolloLink, concat } from 'apollo-link';

import './static/css/header.css';
import './static/css/notifications.css';
import './static/css/sections.css';
import './static/css/site.css';
import "toastr/build/toastr.min.css"

import Navigation from './components/common/Navigation';
import Routes from './components/common/Routes';
import Footer from './components/common/Footer';
import { DefaultOptions } from 'apollo-client/ApolloClient';

const defaultOptions: DefaultOptions = { 
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
};

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token') || null,
      } 
    });

    if (forward) {
        return forward(operation)
    }
    else {
        return null;
    }
});

const link = createHttpLink({ uri: 'http://localhost:4000/api' });

const client = new ApolloClient({
    link: concat(authMiddleware, link),
    cache: new InMemoryCache(),
    defaultOptions,
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter >
            <div id="container">
                <Navigation />
                <Routes />
                <Footer />
            </div>
        </BrowserRouter>
    </ApolloProvider>
, document.getElementById('root'));