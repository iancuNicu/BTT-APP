const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UserModel} = require('../db/models/UserModel');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const salt = "wintersheart12";

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
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

passport.use('user-jwt', new JWTStrategy({
    secretOrKey: salt,
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('jwt')
}, (payload, done) => {
    return UserModel.findById(payload._id).then(user => {
        done(null, user);
    })
                    .catch(e => {
                        done(e, null);
                    });
}));

module.exports = {passport};

