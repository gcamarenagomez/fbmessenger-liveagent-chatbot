"use strict";

let salesforce = require('./salesforce'),
    messenger = require('./messenger'),
    formatter = require('./formatter');

exports.start_chat = (sender, values) => {
	messenger.getLiveAgentSession().then(session => {
		console.log("Session %j", session);
		var key = session.get('key');
		console.log("key: " + key);
		/*messenger.chasitorInit(session.get('key'), session.get('token'), session.get('id')).then(chasitor => {
			console.log("Chasitor %j", chasitor);
		})*/
	});
}
