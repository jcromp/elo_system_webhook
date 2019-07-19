To send a messaage from the Bot to Josh
URL: https://graph.facebook.com/v3.3/me/messages?access_token=EAADB2iCJOGEBAFaKZCD2GUZBg8G6yXYzcxNq0SSmJb7ZCG0ORTdMdI3psxs9ZCXArKCBBLnYA8WJNmMgdNVlJzIoVQXVunKsbX97O6LRRYlxRcU00XBMhYNgn5sdtoJEXtSgkHh2vpxUD4Jix78CZAMJeMqZAJ6FXUVyAzoZA6eGgZDZD
Body:
{
"messaging_type": "Text",
"recipient":{
  "id":"2438876172906024"
},
"message":{
  "text":"Fine thanks"
},
"messaging_type": "RESPONSE"
}


Any message to the bot will appear in the "Heroku logs" output.


To post to the page use
curl -i -X POST \
 "https://graph.facebook.com/v3.3/1028040704061187/feed?message=Hello%20World!&access_token=EAADB2iCJOGEBAAfVr6dDzTVdpIsgLraCsyeaeWiFLZCIzPx39rLzkltt4kRP7w0mNeZCTbQjkkdGNZBNQjSMqofzOGsqC9BZCZB35KjyLboovNpZBxrLyxxkQcYSpVROoCNPMHGB3RLQ5v6esCv2zeeZB5reOouwaexUTAghkZCScE5KLnfaj98NThsytG58pexmxVLCZCqmrOgZDZD"
 
 To get all the posts use:
 curl -i -X GET \
 "https://graph.facebook.com/v3.3/1028040704061187/feed?access_token=EAADB2iCJOGEBAAfVr6dDzTVdpIsgLraCsyeaeWiFLZCIzPx39rLzkltt4kRP7w0mNeZCTbQjkkdGNZBNQjSMqofzOGsqC9BZCZB35KjyLboovNpZBxrLyxxkQcYSpVROoCNPMHGB3RLQ5v6esCv2zeeZB5reOouwaexUTAghkZCScE5KLnfaj98NThsytG58pexmxVLCZCqmrOgZDZD"