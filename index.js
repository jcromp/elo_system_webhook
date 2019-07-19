'use strict';
const FACEBOOK_GRAPH_API_BASE_URL = 'https://graph.facebook.com/v3.3/'

const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  APIBackend = require('./APIBackend'),
  APIFacebook = require('./APIFacebook'),

  app = express().use(body_parser.json()); // creates express http server


// Sets server port and logs message on success
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('webhook is listening on port: ' + port));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {

  // Return a '200 OK' response to all events
  res.status(200).send('EVENT_RECEIVED');

  const body = req.body;

  if(body.field === 'feed'){
    var msg = body.value.message;
    //Parse the feed to find out what API call to make
    if(/!rating/.test(msg)){
      handleRatingRequest(body.value);
    }
    else if(/!register/.test(msg)){
      handleRegister(body.value);
    }
    else if(/!result\s(.*?)def\s(.*)/.test(msg)){
      handleResult(body.value);
    }
    else if(/!undo\s(.*?)def\s(.*)/.test(msg)){
      handleUndo(msg, body.value.from.id)
    }
  }
});

function handleRatingRequest(value){
  /*
value:
   { item: 'status',
     post_id: '44444444_444444444',
     verb: 'add',
     published: 1,
     created_time: 1563536564,
     message: '!rating.',
     from: { name: 'Test Page', id: '1067280970047460' } } }
  */  
  APIBackend.getUserRating(value.from.id, (response) => {
    let message = "Hi " + value.from.name + " " + response;
    APIFacebook.postComment(value.post_id, message);
  });
}

function handleRegister(value){
  //Call the Users API to get the users information to register
  APIFacebook.getUserInformationFromFacebook(value.from.id, (user) => {
    console.log("Now Registering that user in the system");
    //Using the returned data, register them with the system.
    APIBackend.registerUser(user, (response) => {
      let msg = "Hi " + user.firstName + " welcome to the elo system";
      APIFacebook.postComment(value.post_id, msg);
   });
  });
}

function handleResult(value){
  let msg = value.message;
  let match = msg.match(/!result\s(.*?)def\s(.*)/);
  let winner = match[1];
  let loser = match[2];
  APIBackend.submitResult(winner, loser, (response) =>{
    APIFacebook.postComment(value.post_id, response);
  });
}

function handleUndo(msg, posterId){
  let match = msg.match(/!undo\s(.*?)def\s(.*)/);
  let winner = match[1];
  let loser = match[2];
  APIBackend.undoResult(posterId, winner, loser, (response) =>{
    APIFacebook.postComment(value.post_id, response);
  });
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

