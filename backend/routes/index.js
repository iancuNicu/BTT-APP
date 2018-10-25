var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //if user credentials are saved in browser history, check that they are a valid user
  //if valid user then send user object back to session
  //if not redirect to main page login-signUp
    res.send({wentWell: 'YESSSS'});
});

router.post('/', (req, res) => {
    res.send({});
});

module.exports = router;
