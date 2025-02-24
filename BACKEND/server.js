require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');
const {verifyRefreshToken} = require('./middleware/verifyUser');
const { verifyUserVerification } = require('./middleware/verifyDocumentStatus');

//connecting to databse
connectDB();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/emergencycontacts', require('./routes/emergencyContacts'));
app.use('/location', require('./routes/api/location'));
app.use('/getReviews',require('./routes/api/getReviews'));

//for verification of refresh token
app.use('/verifyJWT',require('./routes/verifyJWT'))

//using verification of user before letting them view screens
app.use(verifyRefreshToken)//this is named refreshToken, this is used for verification of access token
app.use('/userDetail', require('./routes/api/userDetail'));
app.use(verifyUserVerification)
app.use('/postComments',require('./routes/postComments'));

// app.use('/destinations', require('./routes/api/destinations'));



mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
});