const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UserModel} = require('../db/models/UserModel');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const salt = "wintersheart12";
const adminSalt = "chapterhouse";

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

passport.use('general-jwt', new JWTStrategy({
    jwtFromRequest: function getTokenFromHeader(req) {
        return req.headers.authorization;
    },
    secretOrKey:adminSalt
}, (payload, done) => {
    if(payload._id){
        done(null, {
            isValid:true
        });
    }
    else {
        const e = new Error("No user or Bad Authentication");
        done(e, null);
    }
}));

module.exports = {passport};

