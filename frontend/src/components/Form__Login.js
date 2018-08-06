import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Form__Login extends Component {

    constructor() {
        super();

        this.state = {
            user_email: '',
            user_password: '',
            loginError: '',
            loginErrorClass: 'none'
        }
    }


    componentDidMount() {

        this.fieldUserEmail = React.createRef();
        this.fieldUserPassword = React.createRef();

    }


    handleUserInput = (e) => {
        
        // grab the name of field
        const name = e.target.name;
        
        // update state for that field with value
        this.setState({
            [name]: e.target.value
        });
    }


    submitLogin = (e) => {

        e.preventDefault();

        let returningUser = {
            email: this.state.user_email,
            password: this.state.user_password
        }

        axios.post(this.props.serverUrl + '/users/login', returningUser)
            .then(results => {
                
                // console.log('RESULTS:', results);
                // if there's no error save a 'logged-in' state in localStorage
                localStorage.setItem('logged-in', true);
                localStorage.setItem('user-email', returningUser.email);
                this.props.onAuthenticated(returningUser.email);
                // then redirect to profile builder and set a token?
                this.props.history.push('/profile-builder');

            })
            .catch(error => {
                //if there was an error trying to login
                console.log('ERROR:', error);
                this.setState({
                    loginError: 'That email/password combination does not match',
                    loginErrorClass: 'block'
                });
            });

    }


    render() {

        return (
               
            <div className="form wrapper">

                <div className="card card--alert a--fade-up">
                    <div className="card__content card__content--full">
                        <p>Don't have an account? <Link to="/create-account">Create a new account</Link></p>
                    </div>
                </div>

                <div className="card a--fade-up a--delay-1">
                    <div className="card__content card__content--full">

                        <form name="" onSubmit={(e) => { this.submitLogin(e) }}>
 
                            <div className="row">

                                <div className="col all12">
                                    <h1>Login</h1>
                                </div>

                                <div className="col all6">
                                    <figure className="field field--tight">
                                        <label htmlFor="user_email">Email</label>
                                        <input type="text" name="user_email" id="user_email" value={this.state.user_email} onChange={(event) => this.handleUserInput(event)} ref={this.fieldUserEmail} />
                                    </figure>
                                </div>
                                <div className="col all6">
                                    <figure className="field field--tight">
                                        <label htmlFor="user_password">Password</label>
                                        <input type="password" name="user_password" id="user_password" value={this.state.user_password} onChange={(event) => this.handleUserInput(event)} ref={this.fieldUserPassword} />
                                    </figure>
                                </div>

                            </div>

                            <div className="row">

                                <div className="col all12">
                                    <section className={ 'alert ' + this.state.loginErrorClass }>
                                        <p className="small">{this.state.loginError}</p>
                                    </section>
                                </div>

                            </div>

                            <div className="btn__container">
                                <div className="btn btn--large"><button type="submit">Login</button></div>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(Form__Login);