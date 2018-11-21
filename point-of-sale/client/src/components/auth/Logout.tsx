import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps  } from 'react-router';
import { graphql } from 'react-apollo';
import toastr from 'toastr';

import { logoutMutation } from '../../queries/auth.js';

interface LogoutProps<RouteComponentProps> { 
    logout: Function,
    history: any
};

class Logout extends React.Component<LogoutProps<RouteComponentProps>, any> {
    
    constructor(props: LogoutProps<RouteComponentProps>) {
        super(props);

        this.state = {
            username: "string",
            password: "string",
            repeatPassword: "string" 
        }
    }

    logout() {

        const token: string | null = localStorage.getItem('token');

        this.props.logout({
            variables: {
                token
            }
        }).then((res: { data: { logout: boolean }}) => {

            if (res.data.logout) {

                localStorage.clear();
                toastr.success('Logout successful.');
                this.props.history.push('/login');

            } else {
                toastr.error('There is a problem log you out!', 'Upss...');
            }
            
        }).catch((err: any) => {
            console.log(err)
        });
    }

    render() {
        return(
            <span className="logout" onClick={ this.logout.bind(this) }>Logout</span>
        );
    }
};


export default withRouter<any>(
    graphql<LogoutProps<RouteComponentProps>, any>(logoutMutation, { name: "logout" })(Logout)
);