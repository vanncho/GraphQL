import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { loginMutation } from '../../queries/auth';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    loginUser(e) {
        e.preventDefault();

        this.props.loginUser({
            variables: {
                username: this.state.username,
                password: this.state.password
            }
        }).then(res => {

            // console.log('res');
            // console.log(res);        
            console.log('REACT LOGIN');
        console.log(res.data.login)
            localStorage.setItem('token', res.data.login);
        }).catch(err => {
            console.log('err');
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

export default graphql(loginMutation, {name: "loginUser" })(Login);