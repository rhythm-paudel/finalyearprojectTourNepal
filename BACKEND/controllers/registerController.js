const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    const { email, password,firstname, lastname, dateOfBirth, visaStamp, passportCopy } = req.body;
    if (!email || !password || !firstname || !lastname || !dateOfBirth || !visaStamp || !passportCopy) return res.status(400).json({ 'message': 'Every Fields are not filled out Properly. Please Try Again!' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "email": email,
            "password": hashedPwd,
            "firstname":firstname,
            "lastname":lastname,
            "dateOfBirth": dateOfBirth,
            "visaStamp": visaStamp,
            "passportCopy":passportCopy,
            "visaVerified":false,
            "passportVerified":false,
            "verificationStatus":"pending"   
        });

        console.log(result);

        res.status(201).json({ 'success': `New user ${firstname} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
        console.log(err.message)
    }
}



module.exports = { handleRegister };