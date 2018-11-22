import * as React from 'react';
import { Link } from 'react-router-dom';
import Logout from '../../components/auth/Logout';

interface NavigationProps { };

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

    displayNavigation(): React.ReactNode {

        const isAuthenticated: boolean = localStorage.getItem('token') !== null || false;

        if (isAuthenticated) {

            return (
                <React.Fragment>
                    <li>
                        <Link to="/create">Create Receipt</Link>
                    </li>
                    <li>
                        <Link to="/overview">Overview</Link>
                    </li>
                    <li>
                        <Logout />
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

    displayCashier(): React.ReactNode {

        const isAuthenticated: boolean = localStorage.getItem('token') !== null || false;

        if (isAuthenticated) {

            return (
                <div id="cashier">
                    <span>Cashier: </span>
                    <Link to="">{ localStorage.getItem('user') }</Link>
                </div>
            );
        }
    }

    render(): React.ReactNode {
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