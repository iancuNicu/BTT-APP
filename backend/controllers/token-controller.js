const {passport} = require('./../middleware/routes-auth');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../db/models/UserModel');

const refreshSalt = "aplayerintheshadows";

const TokenController = {

    jwtExpireToken : (req, res, next) => {
        passport.authenticate('token-expire', (err, payload, exp) => {
            if(exp && exp.name === 'TokenExpiredError'){
                res.expired = true;
                next();
            }
            else if(!payload){
                res.expired = true;
                next();
            }
            else {
                if(err){
                    res.status(400).send(err);
                }
                else {
                    res.expired = false;
                    next();
                }
            }
        })(req, res, next);
    },

    //refresh token check works in conjunction with expire token check
    //if the token is expired then refresh token will check will activate
     refreshTokenCheck :async function(req, res, next){
        if(res.expired){
            const refToken = req.body.refreshToken;
            const id = req.body._id;
            const token = await UserModel.findById(id).then(user => {
                const isRefToken = (user.tokens.refreshToken === refToken && !user.tokens.refreshExpired ) ? refToken : null;
                if(isRefToken){
                   return user.generateAuthToken();
                }
                else {
                   return null;
                }
            })
                .catch(e => res.status(400).send(e));
            if(token){
                res.token = token;
                next();
            }
            else {
                res.not_logged = true;
                next();
            }
        }
        else {
            next();
        }
    },

     jwtAuth : (req, res, next) => {
        passport.authenticate('user-jwt', (err, user) => {
            if(err){
                res.status(400).send(err);
            }
            else{
                res.user = user;
                next();
            }
        }, {
            session:false
        })(req, res);
    }

};

module.exports = TokenController;

