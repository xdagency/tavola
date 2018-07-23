import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bg from '../images/bg-illustration-01.png';

class Intro extends Component {
    render() {
        return (
            <div className="wrapper" style={{ backgroundImage: 'url(' + bg +')' }}>
                
                <div className="card a--fade-up">
                    <div className="card__content card__content--full">
                        <h1 className="text-center">Answer 5 quick questions and find your next board game</h1>
                        <br />
                        <div className="btn__container">
                            <div className="btn btn--large"><Link to="/profile-builder">Get started</Link></div>
                        </div>
                    </div>
                </div>

                <div className="card card--alert a--fade-up a--delay-1">
                    <div className="card__content card__content--full">
                        <p>[App name] is currently in beta. If you find any issues or bugs it would super helpful if you reported them to <a href="mailto:matt@xeno-design.com">matt@xeno-design.com</a>. Thanks!</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Intro;