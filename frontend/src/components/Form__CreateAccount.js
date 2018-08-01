import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Form__CreateAccount extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            emailValid: false,
            emailText: 'Must be a valid email (have @ and .)',
            emailTextClass: 'invalid',
            password: '',
            passwordText: 'Password must be 8 characters long with at least 1 number and 1 capital',
            passwordTextClass: 'invalid',
            passwordValid: false,
            password_confirm: '',
            passwordConfirmText: 'Passwords must match',
            passwordConfirmTextClass: 'invalid',
            passwordConfirmValid: false,
            formValid: false,
            createAccountError: '',
            createAccountErrorClass: 'none'
        }
    }


    componentDidMount() {

        // create refs
        this.fieldEmail = React.createRef();
        this.fieldPassword = React.createRef();
        this.fieldPasswordConfirm = React.createRef();

    }


    handleUserInput = (e) => {
        
        // grab the name of field
        const name = e.target.name;
        
        // update state for that field with value
        this.setState({
            [name]: e.target.value
        });

        // if email
        if (name === 'email') {
            const emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if (emailValid) {
                this.setState({
                    emailValid: true,
                    emailText: 'Valid email.',
                    emailTextClass: 'valid'
                })
            } else {
                this.setState({
                    emailValid: false,
                    emailText: 'Must be a valid email (have @ and .)',
                    emailTextClass: 'invalid'
                })
            }
        }

        // if password
        if (name === 'password') {
            // 1 number, 1 capital, at least 8 characters
            const passValid = e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g);
            if (passValid) {
                this.setState({
                    passwordValid: true,
                    passwordText: 'Valid password',
                    passwordTextClass: 'valid'
                })
            } else {
                this.setState({
                    passwordValid: false,
                    passwordText: 'Password must be 8 characters long with at least 1 number and 1 capital',
                    passwordTextClass: 'invalid'
                })
            }
        }

        // if password confirm
        if (name === 'password_confirm') {
            if (e.target.value === this.state.password) {
                this.setState({
                    passwordConfirmValid: true,
                    passwordConfirmText: 'Passwords match',
                    passwordConfirmTextClass: 'valid'
                })
            } else {
                this.setState({
                    passwordConfirmValid: false,
                    passwordConfirmText: 'Passwords must match',
                    passwordConfirmTextClass: 'invalid'
                })
            }
        }
    }


    submitCreateAccount = () => {

        // event.preventDefault();

        // If anything is false, don't submit the form
        // and show an error
        if (this.state.emailValid === false || this.state.passwordValid === false || this.state.passwordConfirmValid === false) {
            // console.log('Something is not valid');
            return;
        }

        // console.log('All valid, submitting form');
        // otherwise submit the form
        // POST request to create a new account
        let newUser = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(this.props.serverUrl + '/users/new_user', newUser)
            .then(results => {
                console.log(results);
                // if there's an error from backend
                if (results.data.name == 'error') {
                    this.setState({
                        createAccountError: 'That email already exists. Try something else.',
                        createAccountErrorClass: 'block'
                    });
                    return;
                }
                
                // if there's no error do something
                // redirect to profile builder and set a token?

            })
            .catch(error => {
                //if there was an error creating the account
                console.log(error);
            });

    }


    render() {

        return (
               
            <div className="form wrapper">

                <div className="card card--alert a--fade-up">
                    <div className="card__content card__content--full">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>

                <div className="card a--fade-up a--delay-1">
                    <div className="card__content card__content--full">
                        
                        <div className="row">

                            <div className="col all12">
                                <h1>Create a new account</h1>
                            </div>

                            <div className="col all12">
                                <figure className="field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} ref={this.fieldEmail} />
                                    <p className={'small ' + this.state.emailTextClass }>{ this.state.emailText }</p>
                                </figure>
                            </div>
                            <div className="col all6">
                                <figure className="field">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" value={this.state.password} onChange={(event) => this.handleUserInput(event)} ref={this.fieldPassword} />
                                    <p className={'small ' + this.state.passwordTextClass }>{this.state.passwordText}</p>
                                </figure>
                            </div>
                            <div className="col all6">
                                <figure className="field">
                                    <label htmlFor="password_confirm">Confirm Password</label>
                                    <input type="password" name="password_confirm" id="password_confirm" value={this.state.password_confirm} onChange={(event) => this.handleUserInput(event)} ref={this.fieldPassword} />
                                    <p className={'small ' + this.state.passwordConfirmTextClass }>{this.state.passwordConfirmText}</p>
                                </figure>
                            </div>

                        </div>

                        <div className={ 'alert ' + this.state.createAccountErrorClass }>
                            <p className="small">{this.state.createAccountError}</p>
                        </div>

                        <div className="btn__container">
                            <div className="btn btn--large"><button onClick={this.submitCreateAccount}>Create account</button></div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Form__CreateAccount;