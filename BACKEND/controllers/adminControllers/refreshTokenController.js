const jwt = require('jsonwebtoken');
const AdminUser = require('../../model/Admin');

const handleRefreshToken =async (req,res)=>{
    const cookies = req.cookies;
    console.log(cookies);
    
    if (!cookies?.jwt) return res.sendStatus(401);
    try{
        jwt.verify(
            cookies.jwt,
            process.env.REFRESH_SECRET_TOKEN_ADMIN,
            async (err, decoded) => {
                if (err) return res.status(403).json({"err":err}); //forbidden
                const adminDB = await AdminUser.findOne({ "email":decoded.AdminDetail.email }).exec();
                if (!adminDB) return res.sendStatus(403); //Forbidden 
                const accessToken = jwt.sign({
                    "AdminDetail": {
                      "email": adminDB.email,
                    },
                  },
                  process.env.ACCESS_SECRET_TOKEN_ADMIN,
                  {expiresIn:'1d'}
                );
                res.json({ accessToken,"AdminDetail":{"email":adminDB.email,"username":adminDB.username}});
            }
        )
    }catch(e){
        res.sendStatus(403);
    }
    
}

module.exports = {handleRefreshToken}