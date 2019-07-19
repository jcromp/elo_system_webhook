const axios = require('axios');
const BASE_URL = 'http://localhost:8088'
const PAGE_ID = '1028040704061187'
const ACCESS_TOKEN = 'EAADB2iCJOGEBAPLsrz2zBD2aUmIZA0TERGYfZAVpAdA1K9gosaf8hhSXfPZB5wNer9zNUoOjlaLotMj2c2mEXbLObbytpkesY7JDofxsV8yHrewc9lMj586TbtGqZBsoUuvZBh3L2IK4JgqgA5gZAUaMWXcSP0TocpaTHBZBZCUZCqZChvXdMSLbazGaWht86lBaUZD'

var AXIOS = axios.create({
  baseURL: BASE_URL
});


module.exports = {
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
	submitResult: function(winnerName, loserName, callback){
		const match = {
			winner: winnerName,
			loser: loserName
		}
		AXIOS.post('/match/result', match)
		.then(function(response){
			callback("Thanks. Results registered.");
		})
		.catch(function (error) {
			if(error.response.status == '404'){
				let msg = "Sorry. " + error.response.data.errors[0];
		    	callback(msg);
			}
	  	});
	},
	undoResult: function(posterId, winnerName, loserName, callback){
		const match = {
			winner: winnerName,
			loser: loserName
		}
		AXIOS.post('/match/undo?id='+posterId, match)
		.then(function(response){
			callback(response.data);
		})
		.catch(function (error) {
			if(error.response.status == '404'){
				let msg = "Sorry. " + error.response.data.errors[0];
				callback(msg);
			}
			else if(error.response.status =='401'){
				callback("Only administrators can undo matches. Please contact an administrator.");
			}
	  	});
	}
}
