// get the client
'use strict';
const mysql = require('mysql2');
const MAIN_TABLE = 'person';

let connection; 


const init = (config) => {
 connection = mysql.createConnection({
		  host: 'localhost',
		  user: 'root',
		  database: 'exam_sharie'
		});
};

const getPerson = () => {
	console.info("[INFO]", "Getting a person list");
	init();
	return new Promise((resolve, reject) => {
		connection.query(
		  'SELECT * FROM `'+ MAIN_TABLE +'`',
		  [],
		  (err, results) =>  {
		    connection.end();
		    resolve(results);
		  }
		);
	});
}

const postPerson = (params) => {
	console.log("Params", params);
	console.info("[INFO]", "Creating a person");
	init();
	//const {first_name, last_name, contact_number} = params;
	let first_name= params.first_name;
	let last_name= params.last_name;
	let contact_number= params.contact_number;

	return new Promise((resolve, reject) => {
		connection.query(
			  "INSERT INTO person(first_name, last_name, contact_number) VALUES(?,?,?)",
			  [ first_name, last_name, contact_number],
			  (err, results) =>  {
			   resolve(results);
			   connection.end();
			  }
			);
	});

}

const updatePerson = (id, params) => {
	console.info("[INFO]", "Updating a person");
	init();
	let first_name= params.first_name;
	let last_name= params.last_name;
	let contact_number= params.contact_number;
	return new Promise((resolve, reject) => {
		connection.query(
	  "UPDATE person SET first_name = ?, last_name = ? ,contact_number = ? where id = ?",
	  [ first_name, last_name, contact_number, id],
	  (err, results) =>  {
	  	connection.end();
	    resolve(results);
	  }
	);
	});

	
}
const delPerson = (id) => {
	console.info("[INFO]", "Deleting a person");
	init();
	return new Promise((resolve, reject) => {
		connection.query(
	  "DELETE from person  where id = ?",
	  [ id],
	  (err, results) =>  {
	  	connection.end();
	     resolve(results);

	  }
	);
	});

	
}
module.exports = {
	init,
	getPerson,
	postPerson,
	updatePerson,
	delPerson
};