const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    // Password regex pattern to check 
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const { email, password,firstname, lastname, dateOfBirth, visaStamp, passportCopy,dateOfEntry,nationality,intendedDays} = req.body;
    if (!email || !password || !firstname || !lastname || !dateOfBirth || !visaStamp 
        || !passportCopy || !dateOfEntry || !nationality || !intendedDays) 
        return res.status(400).json({ 'message': 'Every Fields are not filled out Properly. Please Try Again!' });

    if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
            message: 'Password must contain:\n- At least 8 characters\n- One uppercase letter\n- One number\n- One special character (@$!%*?&)'
        });
    }


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
            "verificationStatus":"pending" ,
            "dateOfEntry":dateOfEntry,
            "nationality":nationality,
            "intendedDays":intendedDays,
            "deletionRequest":false,
            "notificationList":[]
        });     

        console.log(result);

        res.status(201).json({ 'success': `New user ${firstname} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
        console.log(err.message)
    }
}



module.exports = { handleRegister };