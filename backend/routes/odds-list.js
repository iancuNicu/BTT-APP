const express = require('express');
var router = express.Router();

const TokenController = require('./../controllers/token-controller');
//const BettingController = require('./../controllers/betting-controller');
const BettingExerciseController = require('./../controllers/exercise-betting-ctrl');

//exercise route until get data from bet sites
router.get('/', TokenController.jwtAuth ,(req, res) => {
    BettingExerciseController.getOdds().then(result => {
        res.status(200).send(result);
    }).catch(e => {
            console.log(e);
            res.status(400).send(e)
        });
});

module.exports = router;