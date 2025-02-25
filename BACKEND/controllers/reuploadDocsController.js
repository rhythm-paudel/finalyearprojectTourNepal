const User = require('../model/User');

const handleReuploadDocs = async (req, res) => {
    const { visaStamp, passportCopy } = req.body;
    const { email } = req;
    if (!visaStamp || !passportCopy) return res.status(400).json({ 'message': 'Every Fields are not filled out Properly. Please Try Again!' });
    try {
        const userDB = await User.findOneAndUpdate(
            {email},
            {
                visaStamp:visaStamp,
                passportCopy:passportCopy,
                verificationStatus:"pending"
            },
            {new:true}
        );

        if (!userDB) return res.status(404).json({ 'message': 'User not found' });
        
        res.status(200).json({ 'message': 'Documents Reuploaded Successfully' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleReuploadDocs }