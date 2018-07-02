const model = require('./model');

/** Switch the HTTP method **/

const switchHTTP = (method, params) => {
	switch(method) {
		case "GET":
			return model.getPerson();
			break;
		case "POST":
			return model.postPerson(params);
			break;
	}
}


module.exports.default = (routeFunction, callback) => {
	
	console.log("RouteFunction", routeFunction); 

	let  params = {
		first_name: "Sharina",
		last_name : "Dev",
		contact_number : "302132134"
	};

	console.info("[INFO]", routeFunction);

	switchHTTP(routeFunction.method, params).then( i => {
		callback(i);
	})

};