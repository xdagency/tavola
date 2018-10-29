import React, { Component, ReactDOM } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import bg from '../images/bg-illustration-02.png';

class GameDetails extends Component {

    constructor() {
        super();
        this.state = {
            // data
            results: true,
            resultsArr: [],
            result__id: 0,
            result__bgg_link: '',
            result__bgg_id: 0,
            result__name: '',
            result__avg_rating: 0,
            result__avg_time: 0,
            result__image: '',
            result__rank: 0,
            result__rankName: '',
            result__category: '',
            result__mechanic: '',
            // scrape
            scrape__loaded: false,
            bgb__price: 'N/A',
            bgb__link: '/'
        }
    }


    /* ==================== */
    // COMPONENT DID MOUNT
    /* ==================== */

    componentDidMount() {

        // Set the page title
        document.title = "Recommended Game";

        // create refs
        this.gameCard = React.createRef();

        // Hit server and find a game when component mounts
        // only if there is no game already in state
        if (this.state.resultsArr.length === 0) {
            this.getGame();
        }

    }



    /* ==================== */
    // GET GAME
    /* ==================== */

    getGame = () => {

        // Hit backend and get a game based on search params
        // send GET request to server with our full url + params
        axios.get(this.props.serverUrl + '/games/game?' + this.props.searchParams)

        // results
        .then(results => {

            // randomly choose a game from the array sent from server
            // console.log(results.data);

            // if the array we just got back is empty show an error
            // their choices ended up with 0 results
            if (results.data.length === 0) {
                // window.alert('No games found');
                this.setState({ results: false, scrape__loaded: false });
                return;
            }

            // console.log('FROM THE BACKEND', results.data);

            // data from endpoint stored in variable
            let theGame = results.data;

            // set the state which holds all the data for (1) game
            this.setState({
                result__id: theGame.id,
                result__bgg_link: theGame.bgg_link,
                result__bgg_id: theGame.game_id,
                result__name: theGame.names,
                result__avg_rating: theGame.avg_rating,
                result__avg_time: theGame.avg_time,
                // result__image: theGame.image_url,
                result__rank: theGame.rank,
                result__category: theGame.category,
                result__mechanic: theGame.mechanic

            }, () => {

                // set state callback
                // update title with game name
                document.title = "Recommended Game - " + this.state.result__name;
                // set the rank
                this.setRank();

            }) // end setState

            // Image path in DB is no longer working
            // Get the image directly from the BGG API instead
            return axios.get('https://www.boardgamegeek.com/xmlapi2/thing?id=' + this.state.result__bgg_id);

        })

        .then(result => {

            // save the data (the xml) into a variable
            let parser = new DOMParser();
            let xml = parser.parseFromString(result.data, 'text/xml');
            // console.log('RESULT FROM BGG API:', xml);

            // find the image url within the parsed data and set to variable
            let xmlImageUrl = xml.getElementsByTagName('image')[0].childNodes[0].nodeValue;
            // console.log(xmlImageUrl);

            this.setState({
                result__image: xmlImageUrl
            });
            
            // return a get request to get our scrape data
            // return axios.get(this.props.serverUrl + '/games/scrape?title=' + theGame.names);
            return axios.get(this.props.serverUrl + '/games/scrape?title=' + this.state.result__name);

        })

        // results from scrape endpoint
        .then(results => {

            // data from endpoint stored in variable
            let theScrape = results.data;

            // console.log('THE SCRAPE:', results.data);
            // set the state with scrape results
            // which holds the data for (1) scrape
            this.setState({
                scrape__loaded: true,
                bgb__link: theScrape.bgb__link,
                bgb__price: theScrape.bgb__price
            }) // end setState

        })

        // error
        .catch(error => {
            console.log(error);
        });

    }



    /* ==================== */
    // SET RANK
    /* ==================== */

    setRank = () => {

        // set default rank
        let rankName = 'Low';
        // depending on numerical 'rank' of game
        // set a string to represent the rank of that game
        if (this.state.result__rank < 101) { rankName = 'Very High'; }
        else if (this.state.result__rank < 1001) { rankName = 'High'; }
        else if (this.state.result__rank < 3001) { rankName = 'Average'; }
        else if (this.state.result__rank < 99000) { rankName = 'Low'; }

        this.setState({ result__rankName: rankName });
    }



    /* ==================== */
    // SELECT A GAME (Deprecated)
    /* ==================== */

    selectGame = () => {

        // set a random index value based on arr
        let randomIndex = Math.floor(Math.random() * this.state.resultsArr.length);
        this.setState({
            // pick out a random item from array and setState
            // with details of that item to show user
            result__id: this.state.resultsArr[randomIndex].id,
            result__bgg_link: this.state.resultsArr[randomIndex].bgg_link,
            result__name: this.state.resultsArr[randomIndex].names,
            result__avg_rating: this.state.resultsArr[randomIndex].avg_rating,
            result__avg_time: this.state.resultsArr[randomIndex].avg_time,
            result__image: this.state.resultsArr[randomIndex].image_url,
            result__rank: this.state.resultsArr[randomIndex].rank,
            result__category: this.state.resultsArr[randomIndex].category,
            result__mechanic: this.state.resultsArr[randomIndex].mechanic
        }, () => {

            // convert the actual rank, to an approximation
            // since I only have a snapshot of DB, actual ranks won't match BGG site

            let rankName = 'Low';
            if (this.state.resultsArr[randomIndex].rank < 101) { rankName = 'Very High'; }
            else if (this.state.resultsArr[randomIndex].rank < 1001) { rankName = 'High'; }
            else if (this.state.resultsArr[randomIndex].rank < 3001) { rankName = 'Average'; }
            else if (this.state.resultsArr[randomIndex].rank < 99000) { rankName = 'Low'; }

            this.setState({ result__rankName: rankName });

            document.title = "Recommended Game - " + this.state.result__name;

        });
    }



    /* ==================== */
    // NEW GAME
    /* ==================== */

    newGame = () => {

        window.scrollTo(300, this.gameCard.offsetTop);

        this.getGame();

    }



    /* ==================== */
    // SCRAPE ONLINE RETAILERS
    /* ==================== */

    scrapeSellers = (title) => {

        // scrape these online retailers for the game title
        // amazon, boardgamebliss, boardgames.ca

    }


    render() {

        // if there are no results
        if (this.state.results === false) {

            return (
                <div className="wrapper" style={{ backgroundImage: 'url(' + bg + ')', backgroundPosition: 'center bottom 16%' }}>

                    <div className="row">
                        <div className="col all12 text-center">
                            <h1>Couldn't find any games</h1>
                            <p>You may need to adjust your choices to match a game.</p>
                        </div>
                        <div className="col all12">
                            <div className="btn__container">
                                <div className="btn btn--alt"><Link to="/profile-builder">Try different selections</Link></div>
                            </div>
                        </div>
                        <div className="col all12">
                            &nbsp;
                        </div>
                    </div>
                    
                </div>
            );

        // if there are results
        } else {

            return (
                <div className="wrapper">

                    <div className="game__container">

                        <h3 className="a--fade-up">WE RECOMMEND</h3>

                        <div className="card a--fade-up a--delay-1" ref={this.gameCard}>
                            
                            <figure className="card__image">
                                <img src={this.state.result__image} title="Game Cover" alt="Boardgame Cover Photo" width="" />
                            </figure>
                            
                            <section className="card__content card__content--pad-left">
                                
                                <div className="row">
                                    <div className="col all12"><h1 className="card__heading">{this.state.result__name}</h1></div>
                                </div>
                                <div className="row">
                                    <div className="col xs3 md2"><FontAwesomeIcon className="data-icon" icon="star" /></div>
                                    <div className="col xs9 md10"><p className="data"><strong>Rating</strong><br />{this.state.result__avg_rating}</p></div>
                                    <div className="col xs3 md2"><FontAwesomeIcon className="data-icon" icon="list-ol" /></div>
                                    <div className="col xs9 md10"><p className="data"><strong>Rank</strong><br />{this.state.result__rankName}</p></div>
                                    <div className="col xs3 md2"><FontAwesomeIcon className="data-icon" icon="folder-open" /></div>
                                    <div className="col xs9 md10"><p className="data"><strong>Categories</strong><br />{this.state.result__category}</p></div>
                                </div>
                                
                                <p className="small"><a href={this.state.result__bgg_link}>View on BoardGameGeek &rarr;</a></p>
                                
                            </section>

                        </div>

                        <div className="card card--border-top a--fade-up a--delay-2">
                            <section className="card__content card__content--full">
                                <div className="btn__container">
                                    <div className="btn btn--alt"><button onClick={this.newGame}><FontAwesomeIcon icon="sync-alt" /> Different Game</button></div>
                                    <div className="btn btn--alt"><button disabled><FontAwesomeIcon icon="heart" /> Save Game</button></div>
                                </div>
                            </section>
                        </div>

                        <div className="card a--fade-up a--delay-3">
                            <section className="card__content card__content--full flex jc--sb">
                                
                                <article className="card__item">
                                    <h4>Boardgame Bliss</h4>
                                    <p>{this.state.bgb__price}</p>
                                    <a className="element-link" href={"https://www.boardgamebliss.com" + this.state.bgb__link} target="_blank"></a>
                                </article>

                            </section>
                        </div>

                    </div>

                </div>
            );

        }
    }
}

export default GameDetails;