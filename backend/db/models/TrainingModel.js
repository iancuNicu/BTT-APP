const {mongoose} =  require('../mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const TrainingSchema = new mongoose.Schema({
    title: {
        type:String,
        minlength: 6,
        required: true
    },
    description: {
        type:String,
        minlength: 6,
        required: true
    },
    text: {
        type:String,
        minlength:10,
        required:true
    },
    videoID: {
        type:String,
        minlength:6,
        required:false
    }
});

const TrainingModel = mongoose.model('Training', TrainingSchema);

module.exports = {TrainingModel};