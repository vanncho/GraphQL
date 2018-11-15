import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './static/css/header.css';
import './static/css/notifications.css';
import './static/css/sections.css';
import './static/css/site.css';
import "toastr/build/toastr.min.css"

import Navigation from './components/common/Navigation';
import Routes from './components/common/Routes';
import Footer from './components/common/Footer';

ReactDOM.render(
        <BrowserRouter>
            <div id="container">
                <Navigation />
                <Routes />
                <Footer />
            </div>
        </BrowserRouter>
, document.getElementById('root'));