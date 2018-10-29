var express = require('express');
var router = express.Router();
var _ = require('lodash');
const {passport} = require('../middleware/authenticate');

const generalAuth = (req, res, next) => {
    passport.authenticate('general-jwt', {session:false} , (err, obj) =>{
        if(err){
            res.error = err;
            res.resObj = null;
            next();
        }
        else {
            res.error = null;
            res.resObj = obj;
            next();
        }
    })(req, res, next)
};

router.get('/', generalAuth, (req, res) => {
    if(res.error && !res.resObj){
        res.status(200).send(res.resObj);
    }
    else {
        res.status(401).send(res.error);
    }
});

router.post('/', (req, res, next) => {
        passport.authenticate('login', function(err, user) {
                if(err){
                    res.status(400).send(err);
                }
                else {
                    res.user = user.user;
                    next();
                }
        })(req, res)
    }
, (req, res) => {
    const user = res.user;
    return user.generateAuthToken().then((token) => {
        res.header('Authorization', token).send(user);
    }).catch(e => res.status(400).send(e));
});


module.exports = router;