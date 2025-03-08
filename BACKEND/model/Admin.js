const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        Admin: {
            type: Number,
            default: 5001
        },
        SuperAdmin: Number, //for later
        SubAdmin: Number //for later 
    },
    permissions: {
        type: [String],
        default: ['manage_users', 'manage_content']
    },
    refreshToken: {
        type: String
    },
    
});

module.exports = mongoose.model('AdminUsers', adminUserSchema);