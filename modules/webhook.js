"use strict";

let request = require('request'),
	salesforce = require('./salesforce'),
	formatter = require('./formatter-messenger');

let sendMessage = (message, recipient) => {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {access_token : process.env.FB_PAGE_TOKEN},
		method : 'POST',
		json : {
			recipient : {id : recipient},
			message : message
		}
	}, (error, response) => {
		if(error){
			console.log('Error sending message: ', error);
		}
		else if(response.body.error){
			console.log('Error: ', response.body.error);
		}
	});
};

let processText = (text, sender) => {
	let match;
	match = text.match(/ayuda/i);
	if(match){
		sendMessage({text: `Puedes preguntarme cosas como: Consulta mis cuentas
Consulta el saldo de mi cuenta corriente
Razon de Rechazo de mi pago`}, sender);
		return;
	}

	match = text.match(/hola/i);
	if(match){
		sendMessage({text: `Hola! "${sender}"`}, sender);
		return;
	}
};

let handleGet = (req, res) => {
	if(req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN){
		res.send(req.query['hub.challenge']);
	}
	res.send('Error, wrong validation token');
};

let handlePost = (req, res) => {
	let events = req.body.entry[0].messaging;
	for(let i = 0; i<events.length; i++){
		let event = events[i];
		let sender = event.sender.id;
		if(process.env.MAINTENANCE_MODE && ((event.message && event.message.text) || event.postback)){
			sendMessage({text : `Disculpe, no estoy disponible en estos momentos.`}, sender);
		}
		else if(event.message && event.message.text){
			processText(event.message.text, sender);
		}
		else if(event.postback){
			let payload = event.postback.payload.split(',');

		}
	}
	res.sendStatus(200);
};

exports.handleGet = handleGet;
exports.handlePost = handlePost;