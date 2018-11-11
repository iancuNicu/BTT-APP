const {passport} = require('./../admin/admin-auth');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const {UserModel} = require('./../db/models/UserModel');
const jwt = require('jsonwebtoken');

const salt = "wintersheart12";

passport.use('user-jwt', new JWTStrategy({
    secretOrKey: salt,
    jwtFromRequest: function(req){
        return req.headers.authorization;
    }
}, (payload, done) => {
    return UserModel.findById(payload._id).then(user => {
        done(null, user);
    })
        .catch(e => {
            done(e, null);
        });
}));

passport.use('token-expire', new JWTStrategy({
    secretOrKey:salt,
    jwtFromRequest: function(req){
        return req.headers.authorization;
    }
}, (verifyObj, done) => {
       if(verifyObj._id){
           done(null, verifyObj);
       }
       else{
           const error = new Error("Token invalid or expired!");
           done(error, null);
       }
}));

module.exports = {passport};

