"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter'),
    processor = require('./processor'),
    repeat = require('repeat');

let message = (session, seq, sender) => {
	console.log("Message session: %j", session);
	messenger.messages(session, seq).then(msgs => {
		console.log('Postback Messages %j', msgs.messages);
		console.log('Message type ' + msgs.messages[0].type);
		if(msgs.messages[0].type == 'ChatRequestSuccess'){
			message(session, seq + 1, sender);
			/*messenger.messages(session, seq+1).then(msg2 =>{
				console.log('Postback Messages 2 %j', msg2.messages);
			});*/
		}
		else if(msgs.messages[0].type == 'ChatEstablished'){
			messenger.send({text : `Gracias a partir de este momento ${msgs.messages[0].message.name} te atenderá...`}, sender);
			//message(session, seq + 1, sender);
			Repeat(message(session, globalSequence + 1, sender)).every(2,'sec').for(2,'minutes').start.in(1,'sec');
		}
		else if(msgs.messages[0].type == 'ChatMessage'){
			messenger.send({text : `${msgs.messages[0].message.text}`}, sender);
			//message(session, seq + 1, sender);
			globalSequence = seq + 1;
			
		}
		else{
			message(session, seq +1, sender);
			globalSequence = seq + 1;
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
			globalSession = session;
			message(session, -1, sender);
		});
	});
};

exports.message = message;
	
