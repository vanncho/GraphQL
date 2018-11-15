import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../home/Home.jsx';
import Register from '../auth/Register';
import Login from '../auth/Login';

const Routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
        </Switch>
    );
}

export default Routes;