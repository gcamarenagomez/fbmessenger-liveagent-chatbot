"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

let message = (session) => {
	console.log("Message session: %j", session);
	messenger.messages(session).then(msgs => {
		console.log('Postback Messages %j', msgs);
	});
};

exports.start_chat = (sender, values) => {
	messenger.getLiveAgentSession().then(session => {
		console.log("Session %j", session);
		var key = session.key;
		console.log("key: " + key);
		messenger.chasitorInit(session.key, session.affinityToken, session.id).then(chasitor => {
			console.log("Chasitor %j", chasitor);
			console.log("Chasitor Session %j", session);
			message(session);
		});
	});
};

exports.message = message;
	
