const Route = require('route-parser');

const genericUrl = new Route('/person');
const rowUrl = new Route('/person/:id');
const postUrl = new Route('/person/:id');
const deleteUrl = new Route('/person/:id');

const apiRoutes = [
		 {
				url: '/person',
				method: 'GET',
				matchRoute : genericUrl

		}, 
		{
				url: '/person/:id',
				method: 'GET',
				matchRoute : rowUrl

		}, 
		 {
				url: '/person',
				method: 'POST',
				matchRoute : genericUrl
		},
		 {
				url: '/person/:id',
				method: 'PUT',
				matchRoute : postUrl

		},
		 {
				url: '/person/:id',
				method: 'DELETE',
				matchRoute: deleteUrl
		}

];


module.exports = {
	findRoute : (reqUrl, method) => {
		console.log("reqUrl", reqUrl, method);
		return apiRoutes.find((el) => {
		  return el.matchRoute.match(reqUrl);
		});
	}
};