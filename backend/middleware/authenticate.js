const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UserModel} = require('../db/models/UserModel');
const passportJWT = require("passport-jwt");

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.email);
});

// used to deserialize the user
passport.deserializeUser(function(email, done) {
    UserModel.find(email, function (err, user) {
        done(err, user);
    });
});

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    (email, password, done) => {
        return UserModel.findByCredentials(email, password).then((user) => {
            if(!user.user){
              return done(user.error, false, null);
            }
            else {
                return done(null, user);
            }
        }).catch(e => {
            done(e, false ,null)
        });
    }
));

module.exports = {passport};

