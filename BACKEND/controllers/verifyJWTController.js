const decryptRefreshToken = require('../api/refreshTokenEncryption')
const jwt = require('jsonwebtoken');

//to check if the refresh token is valid and not expired
const verifyJWT = async (req,res)=>{
    const authHeader = req.headers.Authorization || req.headers.authorization;

    
    try{
        //if the header is does not start with bearer 
        if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        
        //extracting token part
        let refreshToken = authHeader.split(' ')[1];

        //decrypting encrypted token stored in the device
        refreshToken = decryptRefreshToken.decryptRefreshToken(refreshToken);
    
        
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_TOKEN,
            (err,decoded)=>{
                if(err)return res.status(403).json({'message':authHeader});//invalid token
                return res.sendStatus(200); //the token status is still valid and not expired
            }
        )
    }catch(e){
        res.sendStatus(404);
    }
    
}


module.exports = {verifyJWT}