const {passport} = require('../middleware/authenticate');
const JWTStrategy   = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const {AdminModel} = require('./AdminModel');

const adminSalt = "chapterhouse";

passport.use('signup-admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done) => {
    const admins = AdminModel.find({});
    if(admins.length > 2){
        const err = new Error("Maximum number of admins reached");
        done(err, null);
    }
    else{
        done(null, null) ;
    }
}));

passport.use('admin-jwt', new JWTStrategy({
    secretOrKey: adminSalt,
    jwtFromRequest: ExtractJwt.fromHeader('Authorization')
},(payload, done) => {
    if(payload._id){
        AdminModel.findById(payload._id)
                  .then(admin => done(null, admin))
                  .catch(e => done(e, null))
    }
    else{
        done(new Error('Bad Authentication'));
    }
}));

passport.use('login-admin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done) => {
    return AdminModel.findOne({email}).then((admin) => {
        if(!admin){
            const err = new Error("No such admin");
            done(err, false ,null);
        }
        else{
            done(null, admin) ;
        }
    }).catch(e => {
        done(e, false ,null)
    });
}));

let opts = {};
opts.secretOrKey =  adminSalt;
opts.jwtFromRequest = function getTokenFromHeader(req) {
        return req.headers.authorization;
};

//used on every request, reads the specified header and checks it's validity
passport.use('admin-jwt', new JWTStrategy(opts, (jwt_payload, done) => {
    if(jwt_payload.isAdmin === "admintrue"){
        done(null, jwt_payload);
    }
    else {
        const err = new Error("Not Admin");
        done(err, null);
    }
}));

module.exports = {passport};

