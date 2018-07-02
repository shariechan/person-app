'use strict';

let http = require('http');
let url = require('url');
let route = require('./route');
let processAPI = require('./controller').default;


//create a server object:
http.createServer(function (req, res) {

  let reqUrl = url.parse(req.url, true).href;

  console.info("[URL]", reqUrl);

  if(reqUrl == "/favicon.ico") {
  	res.end();
  }else{
  	  new Promise((resolve, reject) => {
	  	let routeResult = route.findRoute(reqUrl, req.method);

	  	console.log(routeResult);

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		
	  	if(!routeResult )  reject({error : "invalid route"});
	  	else{
	  		processAPI(routeResult, (result)=>{
			//console.info("[INFO]", "HERE ---", result);

			if(result){
			  res.write(JSON.stringify({data : result})); //write a response to the client
		  	  resolve(true);
			}else{
		  	  res.write(JSON.stringify({error : "invalid params"})); //write a response to the client
		  	  reject({error : "invalid params"})
			}

		  });
	  	}


	}).then( r => res.end(), e => {res.end(), console.error("[ERROR]", e)})
  }
  


}).listen(8080, () => console.log("Server is listening already")); //the server object listens on port 8080