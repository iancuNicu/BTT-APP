var express = require('express');
var router = express.Router();
var _ = require('lodash');

const {UserModel} = require('../db/models/UserModel');

router.post('/', function(req, res) {
  let body = _.pick(req.body,  ['password', 'email']);
  let user = new UserModel(body);

  return user.save().then(() =>  {
     return user.generateAuthToken();
  }).then((token) => {
    res.header('Authorization', token).send(user);
  }).catch(e => {
    res.status(400).send(e);
  });

});

module.exports = router;
