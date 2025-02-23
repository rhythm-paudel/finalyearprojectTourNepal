
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {encryptRefreshToken} = require('../api/refreshTokenEncryption')
const User = require('../model/User');


const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  
  try{
    const userDB = await User.findOne({ email }).exec();
    if (!userDB) return res.sendStatus(401);

    const match = await bcrypt.compare(password, userDB.password);
    
    if (match) {
      //ASSISING Access Token to the user
      const accessToken = jwt.sign({
        "UserDetails": {
          "email": userDB.email,
          "firstname": userDB.firstname,
          "lastname": userDB.lastname,
          "dateOfBirth": userDB.dateOfBirth,
          "verificationStatus":userDB.verificationStatus,

        }
      },
        process.env.ACCESS_SECRET_TOKEN,
        {expiresIn:'1d'}
      );

      //Creating Refresh Token for persist login
      const refreshToken = jwt.sign({
        
          "email": userDB.email
        
      },
        process.env.REFRESH_SECRET_TOKEN,
        {expiresIn:'7d'}
      );

      //SAVING REFRESH TOKEN OF THE USER IN DB
      userDB.refreshToken = refreshToken
      const result = await userDB.save();
      console.log(result)
      let encryptedToken = encryptRefreshToken(refreshToken)

      res.json({accessToken,encryptedToken});

    }
    else{
      return res
        .status(403)
        .json({ message: "Wrong Password" });
    }
  }catch(err){
    res.status(500).json({ 'message': err.message });
  }
};

module.exports = { handleLogin };
