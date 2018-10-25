var express = require('express');
var router = express.Router();
var _ = require('lodash');
const {passport} = require('../middleware/authenticate');

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