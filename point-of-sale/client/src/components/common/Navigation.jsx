import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        }
    }
    componentDidMount() {

        // get is authenticted
    }

    displayNavigation() {

        if (this.state.authenticated) {

            return (
                <Fragment>
                    <li>
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li>
                        <Link to="/overview">Overview</Link>
                    </li>
                    <li>
                        <Link className="logout" to="/logout">Logout</Link>
                    </li>
                </Fragment>
            );
        } else {

            return (
                <Fragment>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </Fragment>
            );
        }
    }

    displayCashier() {

        if (this.state.authenticated) {

            return (
                <div id="cashier">
                    <span>Cashier: </span>
                    <Link to="">Pesho</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <header className="clearfix" id="profile">
                { this.displayCashier() }
                <nav id="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        { this.displayNavigation() }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Navigation;