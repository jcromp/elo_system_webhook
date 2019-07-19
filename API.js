const axios = require('axios');
const BASE_URL = 'http://localhost:8088'
const PAGE_ID = '1028040704061187'
const ACCESS_TOKEN = 'EAADB2iCJOGEBAPLsrz2zBD2aUmIZA0TERGYfZAVpAdA1K9gosaf8hhSXfPZB5wNer9zNUoOjlaLotMj2c2mEXbLObbytpkesY7JDofxsV8yHrewc9lMj586TbtGqZBsoUuvZBh3L2IK4JgqgA5gZAUaMWXcSP0TocpaTHBZBZCUZCqZChvXdMSLbazGaWht86lBaUZD'

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
	registerUser: function(user, callback){
		AXIOS.post('/player', user)
		.then(function(response){
			console.log(response.data);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	getUserRating: function(userId, callback){
		AXIOS.get('/player/' + userId + '/rating')
		.then(function(response){
			callback(response.data);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	submitResult: function(winnerName, loserName){
		const match = {
			winner: winnerName,
			loser: loserName
		}
		AXIOS.post('/match/result', match)
		.then(function(response){
			console.log(response.data);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	undoResult: function(posterId, winnerName, loserName){
		const match = {
			winner: winnerName,
			loser: loserName
		}
		AXIOS.post('/match/undo?id='+posterId, match)
		.then(function(response){
			console.log(response.data);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	getUserInformationFromFacebook: function(facebookId, callback){
		AXIOS({
		  method: 'get',
		  url: 'https://graph.facebook.com/v3.3/2438876172906024?fields=id%2Cfirst_name%2Clast_name%2Cemail&access_token=',
		  params: {
		    fields: 'first_name,last_name,email',
		    access_token: ACCESS_TOKEN
		  }
		})
		.then(function(response){
			var user = {
				firstName: response.data.first_name,
				lastName: response.data.last_name,
				email: response.data.email,
				facebookId: response.data.id
			};
			console.log("Converted FB Data into user:");
			console.log(user);
			callback(user);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	}
}
