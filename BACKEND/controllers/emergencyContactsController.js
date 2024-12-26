const EmergencyContacts = require('../model/EmergencyContacts');

const getAllContacts =async (req,res)=>{

    try{
        const contacts = await EmergencyContacts.find();
        if (!contacts) return res.status(204).json({ 'message': 'No numbers found' });
        res.json(contacts);
    }catch(err){
        res.status(500).json({ 'message': err.message });
    }
}


module.exports = {getAllContacts}