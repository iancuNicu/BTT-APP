const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {AdminModel} =  require('./AdminModel');
const _ = require('lodash');

const adminSalt = "chapterhouse";

const {passport} = require('./admin-auth');

const loginAdminAuth = (req, res, next) => {
    passport.authenticate('login-admin', (err, admin) => {
        if(err){
            res.status(400).send(err);
        }
        else {
            if(admin.isAdmin === 'admintrue'){
                    res.admin = admin;
                    next();
            }
            else {
                res.status(400).send(new Error("Admin not authenticated"));
            }
        }
    })(req, res);
};

const jwtAuth = (req, res, next) => {
    passport.authenticate('admin-jwt', (err, token) => {
        if(err){
            res.status(400).send(err);
        }
        else {
            res.token = token;
            next();
        }
    }, {
        session:false
    })(req, res);
};

const signUpAdminAuth = (req, res, next) => {

    passport.authenticate('signup-admin', (err, user) => {
        if(err){
            res.status(400).send(err);
        }
        else{
            res.adminObj = {
                error: null
            };
            next();
        }
    },{
        session:false
    })(req, res);

};

router.post('/signup', signUpAdminAuth, function(req, res){
    if(res.adminObj.error){
        res.status(400).send(res.adminObj.error);
    }
    else{
        let body = _.pick(req.body,  ['password', 'email', 'isAdmin']);
        let admin = new AdminModel(body);
        return admin.save().then(() => {
            return admin.generateAuthToken()
        }).then((token) => {
            res.header('Authorization', token).json({email:admin.email, _id:admin._id});
        }).catch(e => {
            res.status(400).send(e);
        });
    }
});

router.post('/login', loginAdminAuth , function(req, res){
    const admin = res.admin;
    return admin.generateAuthToken().then((token) => {
        res.header('Authorization', token.token).json({email:admin.email, _id: admin._id});
    }).catch(e => res.status(400).send(e));
});

router.get('/', jwtAuth, function(req, res){
    res.headers('Authorization', res.token).send({
        token: "isValid"
    });
});

module.exports = router;

