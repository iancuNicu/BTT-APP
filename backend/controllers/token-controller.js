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
     refreshTokenCheck : function(req, res, next){
        if(res.expired){
            const refToken = req.body.refreshToken;
            const id = req.body._id;
            UserModel.findById(id).then(user => {
                const isRefToken = (user.tokens.refreshToken === refToken && !user.tokens.refreshExpired ) ? refToken : null;
                if(isRefToken){
                    res.token = user.generateAuthToken();
                    next();
                }
                else {
                    res.status(401).send({
                        not_logged: true
                    });
                }
            })
                .catch(e => res.status(400).send(e));
        }
        else {
            next();
        }
    },

};

module.exports = TokenController;

