const express = require('express');
var router = express.Router();

const TokenController = require('./../controllers/token-controller');
const BettingController = require('./../controllers/betting-controller');

//TokenController.jwtAuth,
router.get('/', (req, res) => {
    const betResult = BettingController.getBettfairData();
    res.status(200).send(betResult);
});

module.exports = router;