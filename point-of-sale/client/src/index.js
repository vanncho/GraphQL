import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './static/css/header.css';
import './static/css/notifications.css';
import './static/css/sections.css';
import './static/css/site.css';
import "toastr/build/toastr.min.css"

import Navigation from './components/common/Navigation';
import Routes from './components/common/Routes';
import Footer from './components/common/Footer';

const client = new ApolloClient({
    uri: 'http://localhost:4000/api',
    request: async operation => {
        
        const token = await localStorage.getItem('token');

        operation.setContext({
          headers: {
            authorization: token ? token : null
          }
        });
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <div id="container">
                <Navigation />
                <Routes />
                <Footer />
            </div>
        </BrowserRouter>
    </ApolloProvider>
, document.getElementById('root'));