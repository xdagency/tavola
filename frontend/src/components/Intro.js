import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bg from '../images/bg-illustration-01.png';

class Intro extends Component {

    componentDidMount() {
        document.title = "Tavola - Welcome";
    }

    render() {
        return (
            <div className="wrapper" style={{ backgroundImage: 'url(' + bg +')' }}>
                
                <div className="card a--fade-up">
                    <div className="card__content card__content--full">
                        <h1 className="text-center">Find your next board game in 2 minutes</h1>
                        <p className="text-center">Tavola will ask you 5 simple questions about your general taste, create a taste profile and find a board game that matches it.</p>
                        <br />
                        <div className="btn__container">
                            <div className="btn btn--large"><Link to="/profile-builder">Get started</Link></div>
                        </div>
                    </div>
                </div>

                <div className="card card--alert a--fade-up a--delay-1">
                    <div className="card__content card__content--full">
                        <p>[Tavola] is currently in beta. If you find any issues or bugs it would super helpful if you reported them to <a href="mailto:matt@xeno-design.com">matt@xeno-design.com</a>. Thanks!</p>
                    </div>
                </div>

            </div>
        );
    }
}

export default Intro;