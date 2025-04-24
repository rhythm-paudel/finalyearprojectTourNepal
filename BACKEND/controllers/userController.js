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
                    verificationStatus:userDB.verificationStatus,deletionRequest:userDB.deletionRequest}
                );
         
                
           
    }catch(e){
        res.sendStatus(404);
    }

    
    

}

const updateUser = async (req,res)=>{
    const {updatedEmail,updatedPassword,oldPassword,deletionRequest,notificationToken} = req.body
    const {email} = req


    if(!updatedEmail && !updatedPassword && deletionRequest===undefined && !notificationToken) res.sendStatus(406) //not acceptable as there is nothing to change

    try{
        const userDB = await User.findOne({ email }).exec();

        if(!userDB) return res.sendStatus(404) //user not found


        if(updatedEmail&&updatedPassword){
            const match = await bcrypt.compare(oldPassword, userDB.password);
            if(!match)return res.status(400).json({ message: "Incorrect Old Password" });

            userDB.email = updatedEmail
            const hashedPwd = await bcrypt.hash(updatedPassword, 10);
            userDB.password = hashedPwd

            
        }
        if(updatedEmail&&!updatedPassword){
            const updateEmail = await User.findOneAndUpdate(
                {email},
                {
                    $set:{"email":updatedEmail}
                },
                {new:true}
            )
            if(!updateEmail){
                res.status(404).json({message:"User not found"})
                return
            }
            res.status(200).json({message:"User Email Updated"})
            return
        }
        if(updatedPassword&&oldPassword&&!updatedEmail){
            const match = await bcrypt.compare(oldPassword, userDB.password);
            if(!match)return res.status(400).json({ message: "Incorrect Old Password" });
            const hashedPwd = await bcrypt.hash(updatedPassword, 10);

            const result = await User.findOneAndUpdate({email},
                {
                    $set:{"password":hashedPwd}
                },
                {new:true}
            )
             if(!result){
                res.status(404).json({message:"Password could not be updated"})
                return
            }
            res.status(200).json({message:"Password Updated successfully."})
            return
        }

        if(deletionRequest===true){
            const result =await User.findOneAndUpdate(
                {email},
                {
                    $set:{"deletionRequest":deletionRequest}
                },
                {new:true}
            )
            if(!result){
                res.status(404).json({message:"User not found"})
                return
            }
            res.status(200).json({message:"User Deletion Request Updated"})
            return
        }
        

        if(notificationToken){
            const result =await User.findOneAndUpdate(
                {email},
                {
                    $set:{"notificationToken":notificationToken}
                },
                {new:true}
            )
            if(!result){
                res.status(404).json({message:"User not found"})
                return
            }
            res.status(200).json({message:"User Notification Token Updated"})
            return
        }
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
}

const getNotifications = async (req,res)=>{
    try{
        const {email} = req
        const userDB = await User.findOne({ email }).exec();

        if(!userDB) return res.sendStatus(404); //user not found

        const notifications = userDB.notificationList
        res.status(200).json({notifications})
    }catch(e){
        res.sendStatus(500)
    }
}



module.exports = {getUserDetails,updateUser,getNotifications}