const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    visaStamp:{
        type:String,
        required:true
    },
    passportCopy:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    passportVerified:{
        type: Boolean,
        require: true
    },
    visaVerified:{
        type: Boolean,
        require: true
    },
    verificationStatus:{
        type: String,
        required: true
    },     
    // roles: {
    //     User: {
    //         type: Number,
    //         default: 2001
    //     },
    //     Editor: Number,
    //     Admin: Number
    // },

});

module.exports = mongoose.model('Users', userSchema);