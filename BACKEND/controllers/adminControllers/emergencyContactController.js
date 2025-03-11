const EmergencyContacts = require('../../model/EmergencyContacts');



const emergencyContactsController = {
    editContacts: async (req, res) => {
        const {id,editValues} = req.body
        if(!id || !editValues) return res.sendStatus(400) //bad request
    
        try{
            const result = await EmergencyContacts.findOneAndUpdate(
                {
                    "_id":id
                },
                {
                    $set:{
                        "name":editValues.name,
                        "number":editValues.number
                    }
                },
                {new:true}
            )
            if(!result){
                res.status(404).json({message:"Contact not found"})
                return
            }
            res.status(200).json({message:"Contact Updated"})
            return
            
    
        }catch(err){
            console.log(err)
            res.status(500).json({ 'message': err.message });
            return
        }
    },
    deleteContacts: async (req, res) => {
        const {id} = req.params
        if(!id) return res.sendStatus(400) //bad request
    
        try{
            const result = await EmergencyContacts.findOneAndDelete(
                {
                    "_id":id
                }
            )
            if(!result){
                res.status(404).json({message:"Contact not found"})
                return
            }
            res.status(200).json({message:"Contact Deleted"})
            return
            
    
        }catch(err){
            console.log(err)
            res.status(500).json({ 'message': err.message });
            return
        }
    },
    addContacts: async (req, res) => {
        const {name,number} = req.body
        if(!name || !number) return res.sendStatus(400) //bad request
    
        try{
            const contact = await EmergencyContacts.findOne({ name }).exec();

            if(contact){
                res.status(400).json({message:"Contact already exists"})
                return
            }
            const result = await EmergencyContacts.create({
                name,
                number
            })
            if(!result){
                res.status(404).json({message:"Contact not found"})
                return
            }
            res.status(200).json({id:result._id,message:"Contact Added"})
            return
            
    
        }catch(err){
            console.log(err)
            res.status(500).json({ 'message': err.message });
            return
        }
    }
}

module.exports = {emergencyContactsController}