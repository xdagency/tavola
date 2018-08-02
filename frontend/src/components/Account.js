import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import bg from '../images/bg-illustration-02.png';

class Account extends Component {

    componentDidMount() {
        document.title = "Account";
    }

    onLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="wrapper bg" style={{ backgroundImage: 'url(' + bg + ')' }}>

                <div className="card a--fade-up">
                    <div className="card__content card__content--full">
                        <h1>Account</h1>
                        <p>Account settings coming soon.</p>
                    </div>
                </div>

                <div className="card a--fade-up a--delay-1">
                    <div className="card__content card__content--full">
                        <h1>Favourites</h1>
                        <p>Favourites coming soon</p>
                    </div>
                </div>
                
                <div className="card a--fade-up a--delay-2">
                    <div className="card__content card__content--full">
                        <div className="btn__container">
                            <div className="btn btn--alt"><button onClick={this.onLogout}>Logout</button></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default withRouter(Account);