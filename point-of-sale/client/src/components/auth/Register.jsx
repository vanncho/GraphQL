import React, { Component } from 'react';
import toastr from 'toastr';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        }
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submithUser(e) {
        e.preventDefault();

        if (this.state.password !== this.state.repeatPassword) {
            toastr.error('Password and repeat password not match!');
        }
        
        console.log(this.state);
    }

    render() {

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

export default Register;