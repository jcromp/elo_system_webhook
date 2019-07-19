const axios = require('axios');
const BASE_URL = 'http://localhost:8088'

var AXIOS = axios.create({
  baseURL: BASE_URL
});

module.exports = {
	callApi: function (){
		console.log("Called Function");

		// AXIOS({
		//   method: 'get',
		//   url: 'http://bit.ly/2mTM3nY'
		// })
		//   .then(function (response) {
		//  		console.log("Respionse Reveived");
		//     console.log(response);
		//   });
	},
	registerUser: function(fName, lName, email){
		const player = {
			firstName: fName,
			lastName: lName,
			email: email	
		};

		AXIOS.post('/player', player)
		.then(function(response){
			console.log("Post to /player responded: ");
			console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	getUserRating: function(userId){
		AXIOS.get('/player/' + userId + '/rating')
		.then(function(response){
			console.log("RATING RESPONSE");
			console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	submitResult: function(winnerId, loserId){
		const match = {
			winner: winnerId,
			loser: loserId
		}
		AXIOS.post('/match/result', match)
		.then(function(response){
			console.log("Match Result Response: ");
			console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	undoResult: function(winnerId, loserId){
		const match = {
			winner: winnerId,
			loser: loserId
		}
		AXIOS.post('/match/undo', match)
		.then(function(response){
			console.log("Match Undo Result Response: ");
			console.log(response);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	}
}
