"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter'),
    processor = require('./processor'),
    repeat = require('repeat');

let message = (session, seq, sender) => {
	console.log("Message session: %j", session);
	console.log("Message seq: " + seq);
	messenger.messages(session, seq).then(msgs => {
		console.log('Postback Messages %j', msgs.messages);
		console.log('Message type ' + msgs.messages[0].type);
		globalSequence = msgs.sequence;
		if(msgs.messages[0].type == 'ChatRequestSuccess'){
			//message(session, seq + 1, sender);
			/*messenger.messages(session, seq+1).then(msg2 =>{
				console.log('Postback Messages 2 %j', msg2.messages);
			});*/
			console.log('Chat Request Success');
		}
		else if(msgs.messages[0].type == 'ChatEstablished'){
			console.log('Chat Established');
			messenger.send({text : `Gracias a partir de este momento ${msgs.messages[0].message.name} te atenderá...`}, sender);
			/*message(session, seq + 1, sender);
			globalSequence = globalSequence + 1;*/
			

		}
		else if(msgs.messages[0].type == 'ChatMessage'){
			console.log('Chat Message');
			messenger.send({text : `${msgs.messages[0].message.text}`}, sender);
			//globalSequence = globalSequence + 1
		}
		else if(msgs.messages[0].type == 'AgentTyping'){
			messenger.send({text : ``},sender);
		}
		/*else{
			message(session, seq +1, sender);
			globalSequence = seq + 1;
		}*/
		
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
			globalSequence = -2;
			setInterval(function(){
				globalSequence = globalSequence + 1;
				console.log('Global Sequence ' + globalSequence);
				message(globalSession, globalSequence, sender);
			}, 5000);
			//message(session, -1, sender);
		});
	});
};

exports.message = message;
	
