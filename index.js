'use strict';
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v3.3/'

const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  API = require('./API'),


  app = express().use(body_parser.json()); // creates express http server


// Sets server port and logs message on success
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('webhook is listening on port: ' + port));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {

  // Return a '200 OK' response to all events
  res.status(200).send('EVENT_RECEIVED');

  const body = req.body;
  console.log("BODY: ");
  console.log(body);
  //API.registerUser("Test User", "LastName", "testEmail@domain.com");
  //API.getUserRating(1);
  //API.submitResult(1,2);
  API.undoResult(1,2);
  setTimeout(() => {API.getUserRating(1);}, 3000);
  if (body.object === 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    if (body.entry && body.entry.length <= 0){
      return;
    }
    body.entry.forEach((pageEntry) => {
      // Iterate over each messaging event and handle accordingly
      pageEntry.messaging.forEach((messagingEvent) => {
        console.log({messagingEvent});
        handleMessage(messagingEvent.sender.id, messagingEvent);
      });
    });
  }
  else if(body.field === 'feed'){
    console.log("FEED RECIEVED");
  }
});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = 'random123';

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

function handleMessage(sender_psid, message) {
  // check if it is a location message
  console.log('handleMEssage message:', JSON.stringify(message));

  //Auto Reply
  callSendAPI(sender_psid, "This is an Automated Response: " + message);
}

function callSendAPI(sender_psid, response) {
  // Construct the message body
  console.log('message to be sent: ', response);
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "url": `${FACEBOOK_GRAPH_API_BASE_URL}me/messages`,
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    console.log("Message Sent Response body:", body);
    if (err) {
      console.error("Unable to send message:", err);
    }
  });
}
