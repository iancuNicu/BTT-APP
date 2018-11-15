const express = require('express');
var trainingRouter = express.Router();
var adminTrainingRouter = express.Router();
var {TrainingModel} = require('./../db/models/TrainingModel');
const _ = require('lodash');
const {passport} = require('../middleware/routes-auth');

const jwtAdminAuth = (req, res, next) => {
    passport.authenticate('admin-jwt', {session:false} ,(err, admin) => {
        if(err){
            res.admin = null;
            res.error = err;
            next();
        }
        else {
            res.admin = admin;
            next();
        }
    })(req, res, next);
};

const jwtUserAuth = (req, res, next) => {
    passport.authenticate('user-jwt',(err, user) => {
      if(err && !user){
          res.user = null;
          res.error = err;
          next();
      }
      else {
          res.user = user;
          next();
      }
  })(req, res);
};

const getTrainingCards = () => {
   return TrainingModel.find({}).limit(5).then(trainingList => {
        return {
            trainingList,
            error: null
        };
    }).catch(e => ({
        picked: null,
        error: e
   }));
};

trainingRouter.get('/',  jwtUserAuth, (req, res) => {
    if(res.error && !res.user){
        res.status(400).send(res.error);
    }
    else {
         getTrainingCards().then(trainingCards => {
            if(!trainingCards.error){
                res.status(200).send(trainingCards.trainingList);
            }
            else {
                res.status(400).send(trainingCards.error);
            }
        });
    }
});

adminTrainingRouter.get('/', jwtAdminAuth ,(req, res) => {
    if(res.admin && !res.error) {
        getTrainingCards().then(trainingCards => {
            if(!trainingCards.error){
                res.status(200).send(trainingCards.trainingList);
            }
            else {
                res.status(400).send(trainingCards.error);
            }
        });
    }
    else {
        res.status(401).send(res.error);
    }
});

adminTrainingRouter.post('/new', jwtAdminAuth, (req, res) => {
    if(res.token) {
       const body = _.pick(req.body, ['title', 'description', 'text', 'videoID']);
       const training = new TrainingModel(body);
       return training.save().then((resTr) => {
            res.status(200).send(resTr);
        }).catch(e => {
            console.log("Training error ", e);
            res.status(400).send(e);
        });
    }
    else {
        res.status(401).send(res.error);
    }
});

adminTrainingRouter.delete('/delete', jwtAdminAuth, (req, res) => {
    if(res.token){
        TrainingModel.deleteOne({_id: res.body._id}).then(() => {
            res.status(200).send({
                isDelete: true
            });
        }).catch(e => res.status(400).send(e))
    }
    else {
        res.status(401).send(res.error);
    }
});

module.exports = {trainingRouter, adminTrainingRouter};