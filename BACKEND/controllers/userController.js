const bcrypt = require('bcrypt')
const User = require('../model/User');
const jwt = require("jsonwebtoken");

const getUserDetails =async (req,res)=>{
    try{
               
                
                const { email } = req;
           
                const userDB = await User.findOne({ email }).exec();
        
                if(!userDB) return res.sendStatus(404); //user not found
          
                
                res.status(200).json({email:userDB.email, firstname:userDB.firstname, 
                    lastname:userDB.lastname, dob:userDB.dateOfBirth, 
                    verificationStatus:userDB.verificationStatus}
                );
         
                
           
    }catch(e){
        res.sendStatus(404);
    }

    
    

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