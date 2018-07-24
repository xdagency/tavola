import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import bg from '../images/bg-illustration-02.png';

class Form__GameProfile extends Component {
    constructor() {
        super();
        this.state = {
            q__1: '',
            q__2: '',
            q__3: '',
            q__4: '',
            q__5: '',
            formClasses: 'form'
        }
    }


    /* ==================== */
    // COMPONENT DID MOUNT
    /* ==================== */

    componentDidMount() {
        document.title = "Profile Builder";
    }


    /* ==================== */
    // ON ANSWER CLICK
    /* ==================== */

    onAnswerClick = (q, a) => {

        // do some styles stuff here to move to next question

        // set state with search params
        this.setState({
            formClasses: 'form q__' + q,
            ['q__' + q]: a
        }, () => {

            // if it's last question submit full string to app.js
            if (q === 5) {
                let urlParams = this.state.q__1 + this.state.q__2 + this.state.q__3 + this.state.q__4 + this.state.q__5 + '';
                this.props.onSubmitQuestions(urlParams);
            }

        });

    }



    goBack = (q) => {

        this.setState({
            formClasses: 'form q__' + q
        });

    }

    
    render() {
        return (
            <div className={this.state.formClasses}>

                <div className="question__container a--fade-up">

                    <article className="question">
                        <div className="row">
                            <div className="col all12 text-center"><h5>1 of 5</h5></div>
                            <div className="col all12 text-center">
                                <h2>What’s your favourite type of movie or TV?</h2>
                                <p className="small"><strong>Why are you asking this?</strong> To figure out what categories to search.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Fantasy&category_2=Mythology') }}>Fantasy</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Science%20Fiction&category_2=Space') }}>Science Fiction</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Horror&category_2=Zombies') }}>Horror</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Sports&category_2=Racing') }}>Sports</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Ancient&category_2=Medieval') }}>Historical</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=World%War&category_2=Civil%20War') }}>War</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=World%War&category_2=Civil%20War') }}>Documentaries</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Farming&category_2=Industry') }}>Food</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Storytelling&category_2=Murder%20Mystery') }}>Mystery</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Humor&category_2=Bluffing') }}>Comedy</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(1, 'category_1=Party%20Game&category_2=Dexterity') }}>I don't like TV</button></div></div>
                        </div>
                    </article>

                    <article className="question">
                        <div className="row">
                            <div className="col all12 text-center"><h5>2 of 5</h5></div>
                            <div className="col all12 text-center">
                                <h2>What’s your favourite type of hobby?</h2>
                                <p className="small"><strong>Why are you asking this?</strong> To figure out what additional categories/sub-categories to search.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Electronic&category_4=Abstract%20Strategy') }}>Computer stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Civilization&category_4=Civil%20War') }}>History stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Action%20Dexterity&category_4=Abstract%20Strategy') }}>Building stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Novel-based&category_4=Book') }}>Reading stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Sports&category_4=Real-time') }}>Sports stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Pirates&category_4=Nautical') }}>Boat stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Transportation&category_4=Racing') }}>Car stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Deduction&category_4=Economic') }}>Learning stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(2, '&category_3=Renaissance&category_4=Mafia') }}>I don’t have any</button></div></div>
                            <div className="col all12 text-center"><div className="btn btn--simple"><a href="#0" onClick={() => { this.goBack(0) }}><FontAwesomeIcon icon="arrow-left" /> Back</a></div></div>
                        </div>
                    </article>

                    <article className="question">
                        <div className="row">
                            <div className="col all12 text-center"><h5>3 of 5</h5></div>
                            <div className="col all12 text-center">
                                <h2>How do you like to socialize?</h2>
                                <p className="small"><strong>Why are you asking this?</strong> To figure out player counts to filter out.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(3, '&min_players=1&max_players=1') }}>Just alone</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(3, '&min_players=1&max_players=6') }}>Small-sized groups</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(3, '&min_players=3&max_players=10') }}>Medium-sized groups</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(3, '&min_players=5&max_players=101') }}>Lots of people</button></div></div>
                            <div className="col all12 text-center"><div className="btn btn--simple"><a href="#0" onClick={() => { this.goBack(1) }}><FontAwesomeIcon icon="arrow-left" /> Back</a></div></div>
                        </div>
                    </article>

                    <article className="question">
                        <div className="row">
                            <div className="col all12 text-center"><h5>4 of 5</h5></div>
                            <div className="col all12 text-center">
                                <h2>How long is your attention span</h2>
                                <p className="small"><strong>Why are you asking this?</strong> To figure out what game length to filter.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(4, '&min_time=1&max_time=99999') }}>Doesn't matter</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(4, '&min_time=1&max_time=50') }}>Less than 30 min</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(4, '&min_time=1&max_time=120') }}>30-90 min</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(4, '&min_time=29&max_time=181') }}>90-180 min</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(4, '&min_time=59&max_time=99999') }}>180+ min</button></div></div>
                            <div className="col all12 text-center"><div className="btn btn--simple"><a href="#0" onClick={() => { this.goBack(2) }}><FontAwesomeIcon icon="arrow-left" /> Back</a></div></div>
                        </div>
                    </article>

                    <article className="question">
                        <div className="row">
                            <div className="col all12 text-center"><h5>5 of 5</h5></div>
                            <div className="col all12 text-center">
                                <h2>What’s your favourite thing about games?</h2>
                                <p className="small"><strong>Why are you asking this?</strong> To figure out what game mechanics to search.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Memory&mechanic_2=Pattern%20Recognition') }}>Solving puzzles</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Variable%20Player%20Powers&mechanic_2=Role%20Playing') }}>Role-playing</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Trading&mechanic_2=Partnetships') }}>Making trades</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Auction%20Bidding&mechanic_2=Set%20Collection') }}>Buying stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Campaign&mechanic_2=Battle') }}>Fighting</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Area%20Movement&mechanic_2=Modular%20Board') }}>Exploring</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Set%20Collection&mechanic_2=Card-Drafting') }}>Building stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Tile%20Placement&mechanic_2=Route') }}>Laying tiles</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Co-operative&mechanic_2=Voting') }}>Working with others</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Worker%20Placement&mechanic_2=Area%20Control') }}>Controlling stuff</button></div></div>
                            <div className="col sm12 md6 lg6"><div className="btn btn--form"><button onClick={() => { this.onAnswerClick(5, '&mechanic_1=Take%20That&mechanic_2=Trick-taking') }}>Winning!</button></div></div>
                            <div className="col all12 text-center"><div className="btn btn--simple"><a href="#0" onClick={() => { this.goBack(3) }}><FontAwesomeIcon icon="arrow-left" /> Back</a></div></div>
                        </div>
                    </article>

                    <article className="question bg" style={{ backgroundImage: 'url(' + bg + ')', backgroundPosition: 'center bottom 16%' }}>
                        <div className="btn__container center">
                            <div className="btn btn--large"><Link to="/suggest">Submit</Link></div>
                            <div className="btn-simple"><a href="#0" onClick={() => { this.goBack(4) }}><FontAwesomeIcon icon="arrow-left" /> Back</a></div>
                        </div>
                    </article>

                </div>

            </div>
        );
    }
}

export default Form__GameProfile;