"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

let message = (session, seq) => {
	console.log("Message session: %j", session);
	messenger.messages(session, seq).then(msgs => {
		console.log('Postback Messages %j', msgs.messages);
		console.log('Message type ' + msgs.messages[0].type);
		if(msgs.messages[0].type == 'ChatRequestSuccess'){
			messenger.messages(session.seq+1).then(msg2 =>{
				console.log('Postback Messages 2 %j', msg2.messages);
			});
		}
		
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
			message(session, -1);
		});
	});
};

exports.message = message;
	
