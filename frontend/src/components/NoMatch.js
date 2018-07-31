import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import bg from '../images/bg-illustration-03.png';

class NoMatch extends Component {

    componentDidMount() {
        document.title = "404 - Page couldn't be found";
    }

    render() {
        return (
            <div className="wrapper bg" style={{ backgroundImage: 'url(' + bg + ')' }}>
                <div className="row a--fade-in">
                    <div className="col all12 text-center">
                        <h1>404</h1>
                        <p>Bad roll. Whatever you were looking for can't be found. Sorry.</p>
                    </div>
                    <div className="col all12 text-center">
                        <div className="btn__container">
                            <div className="btn btn--alt"><Link to="/">Back home</Link></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default NoMatch;