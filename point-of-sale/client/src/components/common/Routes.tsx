import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../home/Home';
import Register from '../auth/Register';
import Login from '../auth/Login';
import CreateReceipt from '../receipts/CreateReceipt';

const Routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/register" component={ Register } />
            <Route path="/login" component={ Login } />
            <PrivateRoute path="/create" component={ CreateReceipt } />
        </Switch>
    );
}

export default Routes;