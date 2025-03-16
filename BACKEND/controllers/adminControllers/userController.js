const User = require("../../model/User");
const bcrypt = require("bcrypt");

const userController = {
  addUser: async (req, res) => {
    const {
      email,
      firstname,
      lastname,
      dateOfBirth,
      password,
      nationality,
      intendedDays,
      dateOfEntry,
    } = req.body;

    console.log(req.body)
    if (
      !email ||
      !firstname ||
      !lastname ||
      !dateOfBirth ||
      !password ||
      !nationality ||
      !intendedDays ||
      !dateOfEntry
    )
      return res
        .status(400)
        .json({
          message:
            "Every Fields are not filled out Properly. Please Try Again!",
        });


    try {
      //check for existing user
      const existingUser = await User.findOne({ email: email }).exec();
      if (existingUser) return res.sendStatus(409); //Conflict

      const hashedPwd = await bcrypt.hash(password, 10);
      const result = await User.create({
        email: email,
        password: hashedPwd,
        firstname: firstname,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
        visaStamp: "none",
        passportCopy: "none",
        verificationStatus: "rejected",
        dateOfEntry: dateOfEntry,
        nationality: nationality,
        intendedDays: intendedDays,
        deletionRequest: false,
        notificationToken:""
      });
      console.log(result);
      res.status(201).json({ success: `New user ${firstname} created!` });
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err.message);
    }
  },
  editUser: async (req, res) => {

    const {id} = req.params
    const {user} = req.body
    if(!id) return res.sendStatus(400);
 
    if(!user) return res.sendStatus(400);
    console.log("id payo")
    try{
        const result = await User.findOneAndUpdate(
            {
                "_id":id
            },
            {
                $set:user
            },
            {new:true}
        )
        if(!result){
            res.status(404).json({message:"User not found"})
            return
        }
        res.status(200).json({message:"User Updated"})
    }catch(e){
        res.status(500).json({message:e.message})
    }

  },
  deleteUser: async (req, res) => {

    const {id} = req.params
    const {requestType} = req.body //approved or rejected true for approved and false for rejected
    if(requestType===null) return res.sendStatus(400);
    if(!id) return res.sendStatus(400);
    try{
        const user = await User.findById(id)
        if(!user) return res.sendStatus(404);
          if(requestType){
            const result = await User.findOneAndDelete(
                {
                    "_id":id
                }
            )
            if(!result){
                res.status(404).json({message:"User not found"})
                return
            }
            return res.status(200).json({message:"User Deleted"})
          }else if (!requestType){
            const result = await User.findOneAndUpdate(
                {
                    "_id":id
                },
                {
                    $set:{deletionRequest:false}
                },
                {new:true}
            )
            if(!result){
                res.status(404).json({message:"User not found"})
                return
            }
            return res.status(202).json({message:"Deletion Request Rejected"})
          }
        
        return res.status(404).json({message:"User cannot be deleted"})
    }catch(e){

    }
  },
  getAllUser: async (req,res)=>{

    try{

        const result = await User.find();

        if(!result) return res.sendStatus(404);
   
        return res.send(result)
    }catch(e){
        res.sendStatus(500)
    }

  },

  getUserById: async (req,res)=>{
    const {id} = req.params
    if(!id) return res.sendStatus(404);
    try{
        const result = await User.findById(id)
        res.json({result})
    }catch{
        res.sendStatus(500)
    }
  }
};

module.exports = {userController}
