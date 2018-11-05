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
    else {
        res.send({
            expired: false
        });
    }
});

module.exports = router;
