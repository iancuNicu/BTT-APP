const {passport} = require('./authenticate');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const salt = "wintersheart12";

passport.use('jwt', new JWTStrategy({
    secretOrKey: salt,
    jwtFromRequest: ExtractJWT.fromHeader('Authorization')
}, (payload, done) => {
    console.log("Routes Auth");
    done(null, 'AAAA');
}));

module.exports = {passport};

