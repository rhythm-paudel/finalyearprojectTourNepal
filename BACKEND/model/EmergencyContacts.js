//FOR NOW EMERGENCY NUMBER ARE ADDED MANUALLY IN THE DB (CAN BE DEVELOPED LATER )further development

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emegencyContactsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('EmergencyContacts', emegencyContactsSchema);