import React, { Component, PropTypes } from 'react';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faListOl, faFolderOpen, faArrowLeft, faSyncAlt, faHeart } from '@fortawesome/free-solid-svg-icons';
import Intro from './components/Intro';
import Form__GameProfile from './components/Form__GameProfile';
import GameDetails from './components/GameDetails';
import NoMatch from './components/NoMatch';

library.add(faStar, faListOl, faFolderOpen, faArrowLeft, faSyncAlt, faHeart);

class App extends Component {

  constructor() {
    super();
    this.state = {

        // user stuff
        loggedIn: false,
        user_id: 0,
        searchParams: '',
        submitted: false,

        // server stuff
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
            <Header />
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
              {/* <Route path="/login" render={(props) => { return <Login match={props} /> }} /> */}
              <Route component={NoMatch} />
          </Switch>

        </section>

      </div>
    );
  }
}

// <Header /> functional component
const Header = () => {
  return (
      <div>
        <header className="page__header">
          <figure className="brand">Tavola</figure>
          <nav className="main">
            <ul>
              <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
              <li><NavLink activeClassName="active" to="/profile-builder">Profile Builder</NavLink></li>
              <li><NavLink activeClassName="active" to="/suggest">Game Details</NavLink></li>
              <li><NavLink activeClassName="active" to="/login">Login (coming soon)</NavLink></li>
            </ul>
          </nav>
        </header>
        <nav className="sub">
          <ul>
            <li><a href="#0">Contact</a></li>
            <li><NavLink to="/terms">Terms of Use</NavLink></li>
            <li><a href="http://www.xeno-design.com">Created by Xeno Design</a></li>
          </ul>
        </nav>
      </div>
  )
}

export default App;
