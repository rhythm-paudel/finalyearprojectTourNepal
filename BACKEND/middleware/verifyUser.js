const jwt = require('jsonwebtoken');


const verifyRefreshToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const accessToken = authHeader.split(' ')[1];
  
    console.log(accessToken)
    jwt.verify(
        accessToken,
        process.env.ACCESS_SECRET_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.email = decoded.UserDetails.email;
            req.firstname = decoded.UserDetails.firstname;
            req.lastname = decoded.UserDetails.lastname;
            req.dateOfBirth = decoded.UserDetails.dateOfBirth;
            next();
        }
    );
}



module.exports = {verifyRefreshToken}