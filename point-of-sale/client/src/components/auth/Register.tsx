import * as React from 'react';
import { graphql } from 'react-apollo';
import toastr from 'toastr';
import { registerUserMutation } from '../../queries/auth';

interface RegisterProps {
    history: any
    registerUser: Function
};

interface RegisterState {
    username: string,
    password: string,
    repeatPassword: string
};

class Register extends React.Component<RegisterProps, RegisterState> {

    constructor(props: RegisterProps) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        }
    }

    inputHandler(e: React.FormEvent<HTMLInputElement>): void {
        
        let target = e.target as HTMLInputElement;

        switch (target.name) {
            case 'username': this.setState({ username: target.value });
            case 'password': this.setState({ password: target.value });
            case 'repeatPassword': this.setState({ repeatPassword: target.value });
            default: break;
        }
    }

    submithUser(e: React.FormEvent<HTMLInputElement>): void {

        e.preventDefault();

        if (this.state.repeatPassword.length === 0) {
            toastr.error('Repeat password must not be empty!');
        }

        if (this.state.password.length === 0) {
            toastr.error('Password must not be empty!');
        }
        
        if (this.state.username.length === 0) {
            toastr.error('Username must not be empty!');
        }

        if (this.state.password !== this.state.repeatPassword) {
            toastr.error('Password and repeat password not match!');
            return;
        }

        if (this.state.username.length > 0 && this.state.password.length > 0) {

            this.props.registerUser({
                variables: {
                    username: this.state.username,
                    password: this.state.password
                }
            }).then((res: any) => {
                if (res.data.registerUser.username) {
                    this.props.history.push('/login');
                }
            }).catch((err: any) => {
                console.log(err);
            });
        }

    }

    render(): React.ReactNode {

        return (
            <section className="clearfix" id="welcome-section">
                <div className="welcome-forms">
                    <div className="welcome-rigister-form">

                        <h1>Register</h1>
                        <form id="register-form" onSubmit={ this.submithUser.bind(this) }>

                            <label htmlFor="username-register">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username-register"
                                placeholder="Username"
                                onChange={ this.inputHandler.bind(this) }
                            />

                            <label htmlFor="password-register">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password-register"
                                placeholder="Password"
                                onChange={ this.inputHandler.bind(this) }
                            />

                            <label htmlFor="password-register-check">Password check</label>
                            <input
                                type="password"
                                name="repeatPassword"
                                id="password-register-check"
                                placeholder="Repeat password"
                                onChange={ this.inputHandler.bind(this) }
                            />

                            <input id="registerBtn" type="submit" value="Register" />
                        </form>
                        
                    </div>
                </div>
            </section>
        );
    }
}

export default graphql<RegisterProps, RegisterState>(registerUserMutation, {name: "registerUser" })(Register);