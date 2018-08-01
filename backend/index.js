/* ==================== */
/* REQUIRES             */
/* ==================== */

const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        bcrypt = require('bcrypt'),
        config = require('./config');

// DB
const knex = require('knex')({
    client: 'postgres',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : 'postgres',
        database : 'boardgamegen',
        charset  : 'utf8'
    }
});

// then connect bookshelf with knex
const bookshelf = require('bookshelf')(knex);



/* ==================== */
/* USE                  */
/* ==================== */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// headers to fix CORS issues
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



/* ==================== */
/* GLOBAL VARS          */
/* ==================== */

const PORT = process.env.PORT || 8181;
const workFactor = config.WORK_FACTOR;



/* ==================== */
/* MODELS               */
/* ==================== */

// Games model
const Game = bookshelf.Model.extend({
    tableName: 'games'
});

// User model
const User = bookshelf.Model.extend({
    tableName: 'users'
});

// UserGames model
const UserToGames = bookshelf.Model.extend({
    tableName: 'users_to_games',
    user_id: function() {
        return this.hasOne(User)
    },
    game_id: function() {
        return this.hasOne(Game)
    }
})



/* ==================== */
/* ROUTES               */
/* ==================== */

// /games/game GET route, for getting the results of a recommendation
app.get('/games/game', (req, res) => {

    // Log what's coming in to req.query
    // console.log('QUERY:', req.query.category, req.query.min_players);
    
    // Query database based on the info sent from frontend
    Game.where(function() {
            this.where(function() {
                this.where('category', 'like', '%' + req.query.category_1 + '%')
                .orWhere('category', 'like', '%' + req.query.category_2 + '%')
                .orWhere('category', 'like', '%' + req.query.category_3 + '%')
                .orWhere('category', 'like', '%' + req.query.category_4 + '%')
                .orWhere('category', 'like', '%' + req.query.category_5 + '%')
            })
            .andWhere('min_time', '>', req.query.min_time)
            .andWhere('min_players', '>', req.query.min_players)
            .andWhere('max_players', '<', (req.query.max_players + 1))
            .andWhere(function() {
                this.where('mechanic', 'like', '%' + req.query.mechanic_1 + '%')
                .orWhere('mechanic', 'like', '%' + req.query.mechanic_2 + '%')
                .orWhere('mechanic', 'like', '%' + req.query.mechanic_3 + '%')
            }) 
        })
        .fetchAll()

        // send the specific details back to frontend
        // in JSON format
        .then(results => {

            // send back 1 result
            res.json(results);
            console.log(results);
        })

        // or, if there's an error
        .catch(error => {
            console.log(error);
        })
});


// /users/new_user POST route, for saving a new user to the database
app.post('/users/new_user', (req, res) => {

    // At registration hash and salt the users password
    // and save them to DB
    bcrypt.genSalt(workFactor, (err, salt) => {
        if(err) {
            // if there is an error, handle it here and send a response back
            console.log(err);
            res.sendStatus(500);
            return;

        } else {
            // if there's no error
            // console.log('S:', salt);
            // hash password and stuff salt into it
            let password = req.body.password;
            
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    // If there's an error hashing the password, send a response back to front-end
                    console.log(err);
                    return;
                } else {

                    let newUser = new User ({
                        email: req.body.email,
                        password: hash,
                    });
                    // save the password and other info in DB here
                    // console.log('H:', hash);
                    newUser.save().then(savedUser => {
                        // send back the saved user
                        res.json(savedUser);
                    })
                    .catch(error => {
                        // console.log(error);
                        res.json(error);
                    });
                }
            });

        }
    }); // end salt/hash/save

});


// /usres/login POST route for when a user attempts a login
app.post('/users/login', (req, res) => {

    // Get their email and password guess
    let userEmail = req.body.email;
    let passwordGuess = req.body.password;

    // Find the row where that email exists, get the hashed password
    // emails must be unique in DB so this should get correct row
    User.where({ email: userEmail })
          .fetch()
          .then(results => {

            // Get the info needed (hashed password) from the fetched row
            // console.log(results);
            let userId = results.attributes.id;
            let hashedPassword = results.attributes.password;
            
            // compare with bcrypt
            bcrypt.compare(passwordGuess, hashedPassword, (error, result) => {
                if(error) {
                    console.log(error);
                    return;
                } else {
                    // console.log('It is', result, 'that the passwords matched');
                    if (result) {
                        // user is authenticated!
                        console.log('you did it');
                        res.sendStatus(200);
                    } else {
                        // passwords don't match
                        console.log('you didn\'t do it');
                        res.sendStatus(401);
                    }
                }
            });
            // end bcrypt compare

          })
          .catch(error => {
              console.log(error);
          })

});


// /users/save POST route for when a user saves a game recommendation
app.post('/users/save', (req, res) => {

    // create a new UserToGames object which contains a user id
    // and a game id
    let newSave = new UserToGames ({
        user_id: req.body.user_id,
        game_id: req.body.game_id
    });

    // save that to a new row in DB
    newSave.save().then(savedGame => {
        // send back the saved game
        res.json(savedGame);
    })
    .catch(error => {
        console.log(error);
    });

});



/* ==================== */
/* LISTEN               */
/* ==================== */

app.listen(PORT, () => {
    console.log('We are up on', PORT);
})