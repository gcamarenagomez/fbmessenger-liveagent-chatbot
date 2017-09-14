"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

let message = (session) => {
	var i = -1;
	console.log("Message session: %j", session);
	messenger.messages(session, i).then(msgs => {
		console.log('Postback Messages %j', msgs);
		i = i+1;
		messenger.messages(session, i).then(msg2 => {
			console.log('Postback Messages 2 %j', msg2);
		})
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
	
