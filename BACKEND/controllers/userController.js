const bcrypt = require('bcrypt')

const getUserDetails = (req,res)=>{
   
    const { email,firstname,lastname,dateOfBirth } = req;
    
    res.json({email,firstname,lastname,dateOfBirth});
}

const updateUser = async (req,res)=>{
    const {updatedEmail,updatedPassword,oldPassword} = req.body
    const {email} = req


    if(!updatedEmail && !updatedPassword) res.sendStatus(406) //not acceptable as there is nothing to change

    try{
        const userDB = await User.findOne({ email }).exec();

        if(!userDB) res.sendStatus(404) //user not found


        if(updatedEmail&&updatedPassword){
            const match = await bcrypt.compare(oldPassword, userDB.password);
            if(!match)return res.status(400).json({ message: "Incorrect Old Password" });

            userDB.email = updatedEmail
            const hashedPwd = await bcrypt.hash(updatedPassword, 10);
            userDB.password = hashedPwd

            
        }
        if(updatedEmail&&!password){
            
        }
        if(password&&!updatedEmail){
            response = updateUserPassword(updatedPassword)
        }

        else{
            res.sendStatus(400)
        }
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
}



module.exports = {getUserDetails,updateUser}