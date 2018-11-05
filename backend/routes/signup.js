var express = require('express');
var router = express.Router();
var _ = require('lodash');

const {UserModel} = require('../db/models/UserModel');

router.post('/', function(req, res) {
  let body = _.pick(req.body,  ['password', 'email']);
  let user = new UserModel(body);

  user.save().then(() => {
      const token =  user.generateAuthToken();
      if(!token){
          const e = new Error('Bad Authentication');
          res.status(401).send(e);
      }
      else {
        user.generateRefreshToken().then(res => {
            res.header('Authorization', token);
            res.status(200).send(res);
        })
            .catch(e => res.header(400).send(e))
      }
  })

});

module.exports = router;
