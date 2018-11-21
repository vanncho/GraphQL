import * as React from 'react';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import { loginMutation } from '../../queries/auth';

interface LoginProps {
    history: any
    loginUser: Function
};

interface LoginState {
    username: string,
    password: string
};

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    inputHandler(e: React.FormEvent<HTMLInputElement>): void {
        let target = e.target as HTMLInputElement;

        switch (target.name) {
            case 'username': this.setState({ username: target.value });
            case 'password': this.setState({ password: target.value });
            default: break;
        }
        
    }

    loginUser(e: React.FormEvent<HTMLInputElement>): void {
        e.preventDefault();

        this.props.loginUser({
            variables: {
                username: this.state.username,
                password: this.state.password
            }
        }).then((res: any) => {

            if (res.data.login) {
                localStorage.setItem('token', res.data.login);
                this.props.history.push('/');
                toastr.success('Login successful.');
            } else {
                res.errors.map((err: { locations: Array<object>, message: string, path: string }) => toastr.error(err.message));
            }

        }).catch((err: any) => {
            console.log(err);
        });
    }

    render() {

        return (
            <section className="clearfix" id="welcome-section">
                <div className="welcome-forms">
                    <div className="welcome-login-form">

                        <h1>Sign in</h1>
                        <form id="login-form" onSubmit={ this.loginUser.bind(this) }>

                            <label htmlFor="username-login">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username-login"
                                placeholder="Username"
                                onChange={ this.inputHandler.bind(this) }
                            />

                            <label htmlFor="password-login">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password-login"
                                placeholder="Password"
                                onChange={ this.inputHandler.bind(this) }
                            />

                            <input id="loginBtn" type="submit" value="Login" />
                        </form>

                    </div>
                </div>
            </section>
        );
    }
}

export default graphql<LoginProps, LoginState>(loginMutation, { name: "loginUser" })(Login);