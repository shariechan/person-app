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
	let  params = {
		first_name: "Sharina",
		last_name : "Dev",
		contact_number : "302132134"
	};
	routeFunction = "GET";
	console.info("[INFO]", routeFunction);
	
	switchHTTP(routeFunction, params).then( i => {
		callback(i);
	})

};