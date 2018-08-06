import React, { Component, PropTypes } from 'react';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faListOl, faFolderOpen, faArrowLeft, faSyncAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import Intro from './components/Intro';
import Form__GameProfile from './components/Form__GameProfile';
import GameDetails from './components/GameDetails';
import Form__Login from './components/Form__Login';
import Form__CreateAccount from './components/Form__CreateAccount';
import Account from './components/Account';
import NoMatch from './components/NoMatch';

library.add(faStar, faListOl, faFolderOpen, faArrowLeft, faSyncAlt, faHeart);

class App extends Component {

  constructor() {
    super();
    this.state = {

        // user stuff
        loggedIn: false,
        user_id: 0,
        user_email: '',
        searchParams: '',
        submitted: false,

        // server stuff
        //serverUrl: 'https://tavolaapp.herokuapp.com',
        serverUrl: 'http://localhost:8181',

        // data
        resultsArr: []

    }
  }

  /* ==================== */
  // COMPONENT DID MOUNT
  /* ==================== */

  componentDidMount() {
    
    document.title = "Board Game Generator";

    if (localStorage.getItem('logged-in') === 'true') {

      let user_email = localStorage.getItem('user-email');

      this.setState({
        loggedIn: true,
        user_email: user_email
      })
    }

  }


  /* ==================== */
  // COMPONENT DID UPDATE
  /* ==================== */

  componentDidUpdate() {
  }


  /* ==================== */
  // ON SUBMIT QUESTIONS
  /* ==================== */

  onSubmitQuestions = (str) => {

      // Set the state with the string of search parameters
      this.setState({
          submitted: true,
          searchParams: str
      });

  }


  /* ==================== */
  // ON USER AUTHENTICATED
  /* ==================== */

  onAuthenticated = (email) => {
      this.setState({
          loggedIn: true,
          user_email: email
      })
  }


  /* ==================== */
  // ON USER LOGOUT
  /* ==================== */

  onLogout = () => {
    localStorage.clear();
    this.setState({
        loggedIn: false
    })
  }


  render() {

    // check if user has submitted a set of search parameters
    // if not redirect any attempts at /suggest to /
    let userHasSubmitted = false;
    if (this.state.submitted === true) { 
      userHasSubmitted = true;
    }

    return (
      <div className="app">

        <section className="page__sidebar">
          <header className="page__header">
            <figure className="brand">Tavola</figure>
            <nav className="main">
              <ul>
                <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                <li><NavLink activeClassName="active" to="/profile-builder">Profile Builder</NavLink></li>
                <li><NavLink activeClassName="active" to="/suggest">Game Details</NavLink></li>
                {this.state.loggedIn ?
                  ( <li>{this.state.user_email}</li> ) : ( <span></span> )
                }
                {this.state.loggedIn ?
                  ( <li><NavLink activeClassName="active" to="/account">Account &amp; Logout</NavLink></li> ) : 
                  ( <li><NavLink activeClassName="active" to="/login">Login &amp; Account</NavLink></li> )
                }
              </ul>
            </nav>
          </header>
          <nav className="sub">
            <ul>
              <li><a href="mailto:matt@xeno-design.com">Contact</a></li>
              <li><NavLink to="/terms">Terms of Use</NavLink></li>
              <li><a href="http://www.xeno-design.com">Created by Xeno Design</a></li>
            </ul>
          </nav>
        </section>

        <section className="page__content">
          
          <Switch>
              <Route path="/" exact component={Intro} />
              <Route path="/profile-builder" render={(props) => { return <Form__GameProfile match={props} onSubmitQuestions={this.onSubmitQuestions} /> }} />
              <Route path="/suggest" render={(props) => ( 
                  !userHasSubmitted ? (
                  <Redirect to="/profile-builder" />
                  ) : (
                  <GameDetails match={props} serverUrl={this.state.serverUrl} user_id={this.state.user_id} searchParams={this.state.searchParams} /> 
                  )
              )} />
              <Route path="/login" render={(props) => ( 
                this.state.loggedIn ? (
                  <Redirect to="/profile-builder" />  
                ) : (
                  <Form__Login match={props} serverUrl={this.state.serverUrl} onAuthenticated={this.onAuthenticated} />
                )
              )} />
              <Route path="/create-account" render={(props) => { return <Form__CreateAccount match={props} serverUrl={this.state.serverUrl} onAuthenticated={this.onAuthenticated} /> }} />
              <Route path="/account" render={(props) => ( 
                !this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Account match={props} serverUrl={this.state.serverUrl} onLogout={this.onLogout} />
                )
              )} />
              <Route component={NoMatch} />
          </Switch>

        </section>

      </div>
    );
  }
}

export default App;
