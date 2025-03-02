const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const sendNotifications = async(req, res) => {
  try {
    const {tokens, title, body} = req.body;
    
    // Check if tokens is an array and if title and body are provided
    if(!tokens || !Array.isArray(tokens) || tokens.length === 0 || !title || !body) {
      return res.status(400).send("Invalid request: tokens array, title, and body are required");
    }
    
    // For multiple devices
    if(tokens.length > 1) {
      const messages = tokens.map(token => ({
        notification: {
          title: title,
          body: body
        },
        token: token
      }));
      
      const batchResponse = await admin.messaging().sendAll(messages);
      console.log(`${batchResponse.successCount} messages were sent successfully`);
      
      if(batchResponse.failureCount > 0) {
        console.log('List of failures:', batchResponse.responses.filter(resp => !resp.success));
      }
      
      return res.status(200).send({
        success: batchResponse.successCount,
        failure: batchResponse.failureCount
      });
    } 
    // For a single device
    else {
      const message = {
        notification: {
          title: title,
          body: body
        },
        token: tokens[0]
      };
      
      const response = await admin.messaging().send(message);
      console.log("Sent successfully", response);
      
      return res.status(200).send({
        success: 1,
        response: response
      });
    }
  } catch(e) {
    console.error("Error sending notifications:", e);
    res.status(500).send("Error sending notifications");
  }
}

module.exports = {sendNotifications};