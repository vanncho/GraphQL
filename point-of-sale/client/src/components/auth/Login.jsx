import React, { Component } from 'react';

class Login extends Component {

    render() {

        return (
            <section className="clearfix" id="welcome-section">
                <div className="welcome-forms">
                    <div className="welcome-login-form">

                        <h1>Sign in</h1>
                        <form id="login-form">

                            <label for="username-login">Username</label>
                            <input
                                type="text"
                                name="username-login"
                                id="username-login"
                                placeholder="Username"
                            />

                            <label for="password-login">Password</label>
                            <input
                                type="password"
                                name="password-login"
                                id="password-login"
                                placeholder="Password"
                            />

                            <input id="loginBtn" type="submit" value="Login" />
                        </form>

                    </div>
                </div>
            </section>
        );
    }
}

export default Login;