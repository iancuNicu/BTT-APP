const express = require('express');
var trainingRouter = express.Router();
var adminTrainingRouter = express.Router();
var {TrainingModel} = require('./../db/models/TrainingModel');
const _ = require('lodash');
const {passport} = require('../admin/admin-auth');

const jwtAdminAuth = (req, res, next) => {
    passport.authenticate('admin-jwt', {session:false} ,(err, token) => {
        if(err){
            res.token = null;
            res.error = err;
            next();
        }
        else {
            res.token = token;
            next();
        }
    })(req, res, next);
};

const jwtUserAuth = (req, res, next) => {
  passport.authenticate('user-jwt', (err, token) => {
      if(err){
          res.token = null;
          res.error = err;
          next();
      }
      else {
          res.token = token;
          next();
      }
  },{
      session:false
  })(req, res);
};

const getTrainingCards = () => {
   return TrainingModel.find({}).limit(5).then(trainingList => {
        let picked = trainingList.forEach((training) => {
            return _.pick(training, ['Title', '_id', 'Description']);
        });
        return {
            picked,
            error: null
        };
    }).catch(e => ({
        picked: null,
       error: e
   }));
};

trainingRouter.get('/', jwtUserAuth, (req, res) => {
    if(res.error){
        res.status(400).send(res.error);
    }
    else {
        let trainingCards = getTrainingCards();
        if(!trainingCards.error){
            res.status(200).send(trainingCards.picked);
        }
        else {
            res.status(400).send(trainingCards.error);
        }
    }
});

adminTrainingRouter.get('/', jwtAdminAuth ,(req, res) => {
    if(res.token) {
        let trainingCards = getTrainingCards();
        if(!trainingCards.error){
            res.status(200).send(trainingCards.picked);
        }
        else {
            res.status(400).send(trainingCards.error);
        }
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