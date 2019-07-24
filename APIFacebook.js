const axios = require('axios');
const BASE_URL = 'https://graph.facebook.com/v3.3'
const PAGE_ID = '1028040704061187'
const ACCESS_TOKEN = 'EAADB2iCJOGEBAIOtZBYXTusbCG784nMMcyB16kCeFldqqZBZBRY9vtlZCVsxeBo0PjmTFZBMYU8ZA2GpH2XZBol9syIqFqMUqGos4uhl5AUVt1iS8JbP1Cl9aUDcb07mHC55abMHu4WYmEm9GKPDrZBMv4ChyfBb1gIcymAWCJuppgDZBzc15wcm1nkYreZBGltloZD'


var AXIOS = axios.create({
  baseURL: BASE_URL
});


module.exports = {
	getUserInformationFromFacebook: function(facebookId, callback){
		AXIOS({
		  method: 'get',
		  url: '/2438876172906024?fields=id%2Cfirst_name%2Clast_name%2Cemail&access_token=',
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
			callback(user);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	},
	postComment: function(postId, comment){
		AXIOS.post('/'+postId+'/comments?message='+comment+'&access_token='+ACCESS_TOKEN)
		.then((response) => {
			console.log("Comment Posted: " + comment);
		})
		.catch(function (error) {
		    console.log(error);
	  	});
	}
}
