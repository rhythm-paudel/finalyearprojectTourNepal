const {decryptRefreshToken} = require('../api/refreshTokenEncryption')
const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken =async (req,res)=>{
    const {encryptedToken} = req.body
    if (!encryptedToken) return res.sendStatus(401);
    let decryptedToken = decryptRefreshToken(encryptedToken).trim();
    console.log(decryptedToken);
    
   
     
    try{
     

      jwt.verify(
          decryptedToken,
          process.env.REFRESH_SECRET_TOKEN,
          async (err, decoded) => {
              if (err) return res.status(403).json({"err":err});
              const userDB = await User.findOne({ "email":decoded.email }).exec();
              if (!userDB) return res.sendStatus(403); //Forbidden 
              console.log(userDB);
              const accessToken = jwt.sign({
                "UserDetails": {
                  "email": userDB.email,
                  "firstname": userDB.firstname,
                  "lastname": userDB.lastname,
                  "dateOfBirth": userDB.dateOfBirth,
                  "visaVerified":userDB.visaVerified,
                  "passportVerified":userDB.passportVerified,
        
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