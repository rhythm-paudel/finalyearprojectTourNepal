const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userReviews = new Schema({
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      },
      reviews: [{
        text: { type: String, required: true },
        email: {type:String, required:true},
        firstname: {type:String, required:true},
        lastname: {type:String, required:true},
        date: { type: Date, default: Date.now }
      }]
});

module.exports = mongoose.model('Reviews', userReviews);