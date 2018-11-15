const express = require('express');
const router = express.Router();
const {AdminModel} =  require('./AdminModel');
const _ = require('lodash');

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

const signUpAdminAuth = (req, res, next) => {

    passport.authenticate('signup-admin', (err, admin) => {
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

module.exports = router;

