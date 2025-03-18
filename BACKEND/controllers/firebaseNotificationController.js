const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const User = require('../model/User');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const sendNotifications = async(req, res) => {
  try {
    const {tokens, title, body, messagetype} = req.body;
    
    // Check if tokens is an array and if title and body are provided
    if(!tokens || !Array.isArray(tokens) || tokens.length === 0 || !title || !body) {
      return res.status(400).send("Invalid request: tokens array, title, and body are required");
    }
    

    // For multiple devices
    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (const user of tokens) {
      const { token, email } = user;   
      try {
        const message = {
          notification: {
            title: title,
            body: body
          },
          token: token
        };

        const response = await admin.messaging().send(message);
        const notificationMessage = `${title}: ${body}`;
        const notificationObject = {
          title: title,
          message: body,
          messagetype: messagetype // Include the type of the message (e.g., 'info', 'alert', etc.)
        };
        console.log("Sent successfully to", token, response);
        successCount++;
        await User.findOneAndUpdate(
          {email},
          { $push: { notificationList: notificationObject } },
          { new: true }
        
        )
      } catch (e) {
        console.error("Failed to send to", token, e);
        failureCount++;
        failures.push({ token, error: e.message });
      }
    }

    return res.status(200).send({
      success: successCount,
      failure: failureCount,
      failures: failures
    });
    
  } catch(e) {
    console.error("Error sending notifications:", e);
    res.status(500).send("Error sending notifications");
  }
}

module.exports = {sendNotifications};