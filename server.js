var express = require('express'),
	bodyParser = require('body-parser'),
	processor = require('./modules/processor'),
	handlers = require('./modules/handlers'),
	postbacks = require('./modules/postbacks'),
	global = require('./global'),
	FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN,
	app = express();

app.set('port', process.env.PORT || 8200);

app.use(bodyParser.json());

app.get('/webhook', (req, res) => {
	if(req.query['hub.verify_token'] === FB_VERIFY_TOKEN){
		res.send(req.query['hub.challenge']);
	}
	else{
		res.send('Error, wrong validation token');
	}
});

app.post('/webhook', (req, res) => {
	let events = req.body.entry[0].messaging;
	for(let i=0; i<events.length; i++){
		let event = events[i];
		let sender = event.sender.id;
		if(process.env.MAINTENANCE_MODE && ((event.message && event.message.text) || event.postback)){
			sendMessage({text : `Disculpe en este momento no puedo atenderle.`}, sender);
		}
		else if(event.message && event.message.text){
			let result = processor.match(event.message.text);
			if(result){
				let handler = handlers[result.handler];
				if(handler && typeof handler === "function"){
					handler(sender, result.match);
				}
				else{
					console.log("Handler " + result.handlerName + " is not defined.");
				}
			}
		}
		else if(event.postback){
			let payload = event.postback.payload.split(",");
			let postback = postbacks[payload[0]];
			if(postback && typeof postback === 'function'){
				postback(sender, payload);
			}
			else{
				console.log('Postback ' + postback + ' is not defined');
			}
		}
	}
	res.sendStatus(200);
});

app.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
