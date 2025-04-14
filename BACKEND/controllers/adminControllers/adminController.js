const bcrypt = require("bcrypt");
const AdminUser = require("../../model/Admin");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const {username,password} = req.body
    if(!username || !password) return res.sendStatus(400) //bad request

    try{

        
        const adminDB = await AdminUser.findOne({username}).exec()
        if(!adminDB) return res.sendStatus(401) //unauthorized
     

        
        const match = await bcrypt.compare(password,adminDB.password)
        if(!match) return res.sendStatus(401) //unauthorized

        const accessToken = jwt.sign({
            "AdminDetail": {
                "email": adminDB.email,
            },
            },
            process.env.ACCESS_SECRET_TOKEN_ADMIN,
            {expiresIn:'1d'}
      
        );

        //Creating Refresh Token for persist login
        const refreshToken = jwt.sign({
            "AdminDetail": {
                "email": adminDB.email,
            },
            },
            process.env.REFRESH_SECRET_TOKEN_ADMIN,
            {expiresIn:'7d'}
        );
        adminDB.refreshToken = refreshToken
        await adminDB.save();
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite: 'None',secure: false, maxAge:24*60*60*1000});
        res.status(200).json({accessToken,"AdminDetail":{"email":adminDB.email,"username":adminDB.username}});
    }catch(err){
        console.log(err)
        res.status(500).json({ 'message': err.message });
    }
}




module.exports = {login}