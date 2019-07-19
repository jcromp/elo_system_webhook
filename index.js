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

  if(body.field === 'feed'){
    var msg = body.value.message;
    console.log("Message:");
    console.log(msg);
    //Parse the feed to find out what API call to make
    if(/!rating/.test(msg)){
      handleRatingRequest(body.value.from);
    }
    else if(/!register/.test(msg)){
      handleRegister(msg, body.value.from);
    }
    else if(/!result\s(.*?)def\s(.*)/.test(msg)){
      handleResult(msg);
    }
    else if(/!undo\s(.*?)def\s(.*)/.test(msg)){
      handleUndo(msg, body.value.from.id)
    }
  }
});

function handleRatingRequest(from){
  //{ name: 'Test Page', id: '1067280970047460' } } }
  API.getUserRating(from.id, (response) => {
    console.log("Hi " + from.name + " " + response);
  });
}

function handleRegister(from){
  //{ name: 'Test Page', id: '1067280970047460' } } }
  //Call the Users API to get the users information to register
  API.getUserInformationFromFacebook(from.id, (user) => {
    console.log("Now Registering that user in the system");
    //Using the returned data, register them with the system.
    API.registerUser(user, (response) => {
     console.log("Hi " + user.firstName + " welcome to the elo system");
   });
  });
}

function handleResult(msg){
  let match = msg.match(/!result\s(.*?)def\s(.*)/);
  let winner = match[1];
  let loser = match[2];
  API.submitResult(winner, loser, () =>{
    console.log("Result Submited");
  });
}

function handleUndo(msg, posterId){
  let match = msg.match(/!undo\s(.*?)def\s(.*)/);
  let winner = match[1];
  let loser = match[2];
  API.undoResult(posterId, winner, loser);
}


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
