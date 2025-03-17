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
    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (const token of tokens) {
      try {
        const message = {
          notification: {
            title: title,
            body: body
          },
          token: token
        };

        const response = await admin.messaging().send(message);
        console.log("Sent successfully to", token, response);
        successCount++;
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