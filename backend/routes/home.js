const express = require('express');
var router = express.Router();

const {passport} = require('../middleware/routes-auth');

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
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
};

router.get('/', jwtAuth ,(req, res) => {
    if(res.valid === true){
        res.send({
            user: res.user,
            token: res.token
        });
    }
    else {
        res.status(400).send(res.error);
    }
});

module.exports = router;