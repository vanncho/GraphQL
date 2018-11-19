import * as React from 'react';
import { Link } from 'react-router-dom';

interface NavigationProps {};

interface NavigationState {
    authenticated: boolean
};

class Navigation extends React.Component<NavigationProps, NavigationState> {

    constructor(props: NavigationProps) {
        super(props);

        this.state = {
            authenticated: false
        }
    }

    displayNavigation() {

        // !
        const isAuthenticated = localStorage.getItem('token') !== null || false;

        if (isAuthenticated) {

            return (
                <React.Fragment>
                    <li>
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li>
                        <Link to="/overview">Overview</Link>
                    </li>
                    <li>
                        <Link className="logout" to="" onClick={() => { localStorage.clear(); return this.setState({ authenticated: false })} }>Logout</Link>
                    </li>
                </React.Fragment>
            );
        } else {

            return (
                <React.Fragment>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </React.Fragment>
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