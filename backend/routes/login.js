var express = require('express');
var router = express.Router();
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
    const token = user.generateAuthToken();
    if(!token){
        const e = new Error('Bad Authentication');
        res.status(401).send(e);
    }
    else {
        user.generateRefreshToken().then(obj => {
            res.header('Authorization', token).send(obj);
        })
            .catch(e => res.status(400).send(e))
    }
});


module.exports = router;