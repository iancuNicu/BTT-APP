const validator = require('validator');
const {mongoose} = require('../db/mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSalt = "chapterhouse";

const AdminSchema = new mongoose.Schema({
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
    isAdmin: {
        type: String,
        required: true
    }
});

AdminSchema.pre('save', function(next){
    let admin = this;

    if(admin.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(admin.password, salt, (e, hash) => {
                admin.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

AdminSchema.methods.toJSON = function() {
    let admin = this;
    let adminObj = admin.toObject();

    return _.pick(adminObj, ['_id' ,'email', 'password']);
};

AdminSchema.statics.verifyToken = function(token) {
    let result;
    try {
        result = jwt.verify(token, adminSalt)
    }
    catch(e) {
        return Promise.reject(e);
    }
    const id = result._id;
    return AdminModel.findById(id)
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

AdminSchema.methods.generateAuthToken = function(){
    let admin = this;

    let token ;
    if(admin.isAdmin === "admintrue"){
      token  = jwt.sign({_id: admin._id.toHexString(), isAdmin: admin.isAdmin}, adminSalt, { expiresIn: '0.5h' });
    }
    return admin.save().then(()=> {
        return {token};
    });

};

AdminSchema.pre('validate', function(next){
    let admin = this;
    if(admin.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(admin.password, salt, (e, hash) => {
                admin.password = hash;
                next();
            });
        });

    } else {
        next();
    }
});


const AdminModel =  mongoose.model('Admin', AdminSchema);

module.exports = {AdminModel};