var express = require('express');
var router = express.Router();
const TokenController = require('../controllers/token-controller');

router.get('/', function(req, res){
    res.send({wentWell: 'YESSSS'});
});

router.post('/token', [TokenController.jwtExpireToken, TokenController.refreshTokenCheck], (req, res) => {
    if(res.expired){
        res.header('Authorization', res.token).send({
            expired:true
        })
    }
    else if(!res.expired) {
        res.status(200).send({
            expired: false
        });
    }
    else if(res.not_logged){
        res.status(401).send({
            not_logged: true
        });
    }
    else {
        res.status(401).send({
            not_logged: true
        });
    }
});

module.exports = router;
