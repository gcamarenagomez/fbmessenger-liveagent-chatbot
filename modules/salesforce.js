"use strict";

let nforce = require('nforce'),
	SF_CLIENT_ID = process.env.SF_CLIENT_ID,
	SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
	SF_USER_NAME = process.env.SF_USER_NAME,
	SF_PASSWORD = process.env.SF_PASSWORD;

let org = nforce.createConnection({
	clientId : SF_CLIENT_ID,
	clientSecret : SF_CLIENT_SECRET,
	redirectUri : 'http://localhost:8200/oauth/_callback',
	mode : 'single',
	autoRefresh : true
});

let login = () => {
	org.authenticate({username : SF_USER_NAME, password : SF_PASSWORD}, err => {
		if(err){
			console.error('Authentication error');
			console.error(err);
		}
		else{
			console.log('Authentication successful');
		}
	});
};

let findContact = (rut) => {
	let where = "";
	if(rut){
		where = "WHERE RUT__c = " + rut;
	}
	return new Promise((resolve, reject) => {
		let q = `SELECT Id, FirstName, LastName, RUT__c, AccountId FROM Contact ${where} LIMIT 1`;
		org.query({query : q}, (err, resp) => {
			if(err){
				reject("Ocurrió un error");
			}
			else{
				console.log('Records: %j', resp.records);
				resolve(resp.records);
			}
		});
	});
};

login();

exports.org = org;
exports.findContact = findContact;