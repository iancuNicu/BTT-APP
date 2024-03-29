const {mongoose} =  require('../mongoose');
const validator = require('validator');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = "wintersheart12";
const refreshSalt = "aplayerintheshadows";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} nu este un email valid'
        }
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    tokens: {
            refreshToken: {
                type: String,
                required: false,
                minlength: 6
            },
            refreshExpired: false
        }
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';

  return jwt.sign({_id: user._id.toHexString(), access}, salt, { expiresIn: 300 });
};

UserSchema.methods.generateRefreshToken = function(){
    const user = this;
    const access = 'refresh-auth';
    const date = new Date();
    const refreshToken = jwt.sign({_id: user._id.toHexString(), access, date},refreshSalt, { expiresIn: '7d' } );
    user.tokens.refreshToken = refreshToken;
    return user.save().then((user) => ({
        user,
        refreshToken
    }))
               .catch(e => e);
};

UserSchema.statics.verifyToken = function(token) {
    let result;
    try {
        result = jwt.verify(token, salt)
    }
    catch(e) {
        return Promise.reject(e);
    }
    const id = result._id;
    return UserModel.findById(id)
                    .then(user => ({
                        user,
                        token,
                        error: null
                    }))
                    .catch(e =>  ({
                        user: null,
                        token: null,
                        error: e
                    }));
};

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id' ,'email']);
};

UserSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (e, hash) => {
                user.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});

UserSchema.statics.findByCredentials = (email, password) => {
    return UserModel.findOne({email}).then((user) => {
        if(!user) {
            return new Promise(function(resolve, reject) {
                reject(new Error("Parola sau email incorect!"));
            });
        }
        else {
            return new Promise((resolve,reject) => {
                bcrypt.compare(password, user.password, (err, res) => {
                    if(res){
                        resolve({user});
                    }
                    else
                        reject(new Error("Parola gresita!"));
                })
            });
        }
    }).catch(e => {
        return ({user: null, error: e});
    });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = {UserModel, UserSchema};