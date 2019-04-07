



var express = require('express');


var passport = require('passport');

var Strategy = require('passport-facebook').Strategy;



var trustProxy = false;
/*
if (process.env.DYNO) {

  // Apps on heroku are behind a trusted proxy

  trustProxy = true;

}
*/

// Configure the Twitter strategy for use by Passport.

//

// OAuth 1.0-based strategies require a `verify` function which receives the

// credentials (`token` and `tokenSecret`) for accessing the Twitter API on the

// user's behalf, along with the user's profile.  The function must invoke `cb`

// with a user object, which will be set at `req.user` in route handlers after

// authentication.

passport.use(new Strategy({

  clientID: process.env.FB_CLIENT_ID,

  clientSecret: process.env.FB_CLIENT_SECRET,

  callbackURL: "http://localhost:3000/oauth/facebook/callback",
 
  profileFields: ['id', 'displayName', 'photos'],
   enableProof: true,
  proxy: trustProxy

},

  function (token, tokenSecret, profile, cb) {

    // In this example, the user's Twitter profile is supplied as the user

    // record.  In a production-quality application, the Twitter profile should

    // be associated with a user record in the application's database, which

    // allows for account linking and authentication with other identity

    // providers.
    //
    // let recipes = JSON.parse(sessionStorage.getItem(this.state.user)) || [];
    let profilejSOn = (profile.json);

    // console.log("§§!"+profile.displayName);

    // console.log(profile.photos[0].value);
    //sessionStorage.setItem(1,  JSON.stringify({Name:profilejSOn.displayName ,Photo:profilejSOn.photos[0].value}));
    return cb(null, profile);

  }));





// Configure Passport authenticated session persistence.

//

// In order to restore authentication state across HTTP requests, Passport needs

// to serialize users into and deserialize users out of the session.  In a

// production-quality application, this would typically be as simple as

// supplying the user ID when serializing, and querying the user record by ID

// from the database when deserializing.  However, due to the fact that this

// example does not have a database, the complete Twitter profile is serialized

// and deserialized.

passport.serializeUser(function (user, cb) {

  cb(null, user);

});



passport.deserializeUser(function (obj, cb) {

  cb(null, obj);

});





// Define routes.

app = express();


// Use application-level middleware for common functionality, including

// logging, parsing, and session handling.

app.use(require('morgan')('combined'));

app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));

app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));



// Initialize Passport and restore authentication state, if any, from the

// session.

app.use(passport.initialize());

app.use(passport.session());
app.get('/', function (req, res) {
  // console.log("home send");
  res.render('home', { user: req.user });

});



app.get('/login',

  function (req, res) {

    console.log('ENV');

    console.log(process.env);

    console.log('Headers:');

    console.log("!req.headers!" + req.headers);

    res.render('login');

  });

app.get('/login/facebook',

  passport.authenticate('facebook')
);

app.get('/oauth/facebook/callback',

  passport.authenticate('facebook', { failureRedirect: '/login' }), function (req, res) {

    con.connect(function (err) {
      if (err) errorhandler(err);
      console.log("Connected!");

      var dataObj = { signout: 1, ip: req.ip, social: 'facebook', name: req.user.displayName, url: req.user.photos[0].value, id: req.user.id };

      var sql = 'INSERT INTO person set ?';
      console.log(dataObj);
      con.query(sql, dataObj, function (err, result) {
        if (err) errorhandler(err);
        console.log("1 record inserted " + JSON.stringify(result));
        var sqlUpdnull = "UPDATE person SET signout = '" + 0 + "'";
        con.query(sqlUpdnull, function (err, result0) {
          if (err) errorhandler(err);
         
        });

          var sqlUpd = "UPDATE person SET signout = '" + 1 + "'  WHERE id = '" + req.user.id + "'";
          con.query(sqlUpd, function (err, result0) {
            if (err) errorhandler(err);
            console.log(result0.affectedRows + " record(s) updated"+JSON.stringify(result0));
          });


      
      });
    });
    res.redirect('/');
  });


app.get('/profile',

  require('connect-ensure-login').ensureLoggedIn(),

  function (req, res) {

    console.log("profile send");
    res.render('profile', { user: req.user });

  });









module.exports = app;

