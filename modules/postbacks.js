"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter'),
    processor = require('./processor'),
    repeat = require('repeat');

let message = (session, seq, sender) => {
	console.log("Message session: %j", session);
	console.log("Message seq: " + seq);
	messenger.messages(session, seq).then(response => {
		if(response.statusCode==200){
			var msgs = JSON.parse(response.body);
			globalSequence = msgs.sequence;
			if(msgs.messages[0].type == 'ChatRequestSuccess'){
				console.log('Chat Request Success');
			}
			else if(msgs.messages[0].type == 'ChatEstablished'){
				console.log('Chat Established');
				messenger.send({text : `Gracias a partir de este momento ${msgs.messages[0].message.name} te atenderá...`}, sender);
			}
			else if(msgs.messages[0].type == 'ChatMessage'){
				console.log('Chat Message');
				messenger.send({text : `${msgs.messages[0].message.text}`}, sender);
			}
			else if(msgs.messages[0].type == 'AgentTyping'){
				console.log('Agent Typing');
			}
			message(globalSession, globalSequence, sender);
		}
		else if(response.statusCode==204){
			message(globalSession, globalSequence, sender);
		}
		else{
			console.log('Toca resincronizar chat');
			globalSession = {};
		}		
	});
};

exports.start_chat = (sender, values) => {
	messenger.getLiveAgentSession().then(session => {
		console.log("Session %j", session);
		console.log("Values " + values[1]);
		var key = session.key;
		console.log("key: " + key);
		messenger.chasitorInit(session.key, session.affinityToken, session.id, values[1]).then(chasitor => {
			console.log("Chasitor %j", chasitor);
			console.log("Chasitor Session %j", session);
			globalSession = session;
			globalSequence = -1;
			message(globalSession, globalSequence, sender);
		});
	});
};

exports.message = message;
	
