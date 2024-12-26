const {decryptRefreshToken} = require('../api/refreshTokenEncryption')
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken =async (req,res)=>{
    const {encryptedToken} = req.body
    if (!encryptedToken) return res.sendStatus(401);
    let decryptedToken = decryptRefreshToken(encryptedToken).trim();
    console.log(decryptedToken);
    
    const userDB = await User.findOne({ "refreshToken":decryptedToken }).exec();
    console.log(userDB);
     
    try{
      if (!userDB) return res.sendStatus(403); //Forbidden 

      jwt.verify(
          decryptedToken,
          process.env.REFRESH_SECRET_TOKEN,
          (err, decoded) => {
              if (err || userDB.email !== decoded.email) return res.status(403).json({"err":err});
              const accessToken = jwt.sign({
                  "UserDetails": {
                    "email": userDB.email,
                    "firstname": userDB.firstname,
                    "lastname": userDB.lastname,
                    "dateOfBirth": userDB.dateOfBirth,
                    "visaStamp":userDB.visaStamp
                  }
                },
                  process.env.ACCESS_SECRET_TOKEN,
                  {expiresIn:'1d'}
                );
                res.json({accessToken })
          }
      );
    }catch(err){
      res.status(500).json({ 'message': err.message });
    }
}

module.exports = {handleRefreshToken}