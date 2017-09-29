"use strict";

let request = require('request'),
	FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN,
	ORG_ID = process.env.ORG_ID,
	LIVE_AGENT_DEPLOYMENT = process.env.LIVE_AGENT_DEPLOYMENT,
	LIVE_AGENT_BUTTON = process.env.LIVE_AGENT_BUTTON,
	LIVE_AGENT_LANGUAGE = process.env.LIVE_AGENT_LANGUAGE,
	SCREEN_RES = process.env.SCREEN_RES,
	VISITOR_NAME = process.env.VISITOR_NAME,
	CASE_RECORD_TYPE = process.env.CASE_RECORD_TYPE;

exports.send = (message, recipient) => {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {access_token: FB_PAGE_TOKEN},
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

exports.getUserInfo = (userId) => {
	return new Promise((resolve, reject) => {
		request({
			url : `https://graph.facebook.com/v2.6/${userId}`,
			qs : {fields:"first_name,last_name,profile_pic", access_token: FB_PAGE_TOKEN},
			method : 'GET'
		}, (error, response) => {
			if (error) {
                console.log('Error sending message: ', error);
                reject(error);
            } else if (response.body.error) {
                console.log('Error: ', response.body.error);
            } else {
                resolve(JSON.parse(response.body));
            }
		});
	});
};

exports.getLiveAgentSession = () => {
	return new Promise((resolve, reject) => {
		request({
			url : 'https://d.la2-c1-iad.salesforceliveagent.com/chat/rest/System/SessionId',
			method : 'GET',
			headers : {
				"X-LIVEAGENT-API-VERSION" : 40,
				"X-LIVEAGENT-AFFINITY" : null
			}
		}, (error, response) => {
			if(error){
				console.log('Error getting session id: ', error);
			}
			else if(response.body.error){
				console.log('Error: ', response.body.error);
			}
			else{
				console.log('Response: %j', response.body);
				resolve(JSON.parse(response.body));
			}
		});
	});
};

exports.chasitorInit = (key, token, id, acctId) => {
	console.log('Chasitor Key' + key);
	console.log('Chasitor Token ' + token);
	console.log('Chasitor Id' + id);
	console.log('Financial Account Id: ' + acctId);
	return new Promise((resolve, reject) => {
		request({
			url : 'https://d.la2-c1-iad.salesforceliveagent.com/chat/rest/Chasitor/ChasitorInit',
			method : 'POST',
			headers : {
				"X-LIVEAGENT-API-VERSION" : 40,
				"X-LIVEAGENT-AFFINITY" : token,
				"X-LIVEAGENT-SESSION-KEY" : key,
				"X-LIVEAGENT-SEQUENCE" : 1
			},
			json : {
				"organizationId" : ORG_ID,
				"deploymentId" : LIVE_AGENT_DEPLOYMENT,
				"buttonId" : LIVE_AGENT_BUTTON,
				"sessionId" : id,
				"userAgent" : "",
				"language" : LIVE_AGENT_LANGUAGE,
				"screenResolution" : SCREEN_RES,
				"visitorName" : VISITOR_NAME,
				"prechatDetails" : [
					{
						"label" : "LastName",
						"value" : "Camarena",
						"entityMaps" : [
							{
								"entityName" : "contact",
								"fieldName" : "LastName"
							}
						],
						"transcriptFields" : [
							"LastName__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "FirstName",
						"value" : "Gabriel",
						"entityMaps" : [
							{
								"entityName" : "contact",
								"fieldName" : "FirstName"
							}
						],
						"transcriptFields" : [
							"FirstName__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Email",
						"value" : "gcamarenagomez@salesforce.com",
						"entityMaps" : [
							{
								"entityName" : "contact",
								"fieldName" : "Email"
							}
						],
						"transcriptFields" : [
							"Email__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Status",
						"value" : "New",
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "Status"
							}
						],
						"transcriptFields" : [
							"caseStatus__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Origin",
						"value" : "Facebook",
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "Origin"
							}
						],
						"transcriptFields" : [
							"caseOrigin__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Subject",
						"value" : "Transacción Rechazada",
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "Subject"
							}
						],
						"transcriptFields" : [
							"subject__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Description",
						"value" : "FB: Quiero comprar el iPhone 8 pero mi tarjeta nueva no pasa en la tienda #bancoduda #bancosfdc",
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "Description"
							}
						],
						"transcriptFields" : [
							"description__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Record Type",
						"value" : CASE_RECORD_TYPE,
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "RecordTypeId"
							}
						],
						"transcriptFields" : [
							""
						],
						"displayToAgent" : false
					},
					{
						"label" : "Financial Account",
						"value" : acctId,
						"entityMaps" : [
							{
								"entityName" : "case",
								"fieldName" : "FinServ__FinancialAccount__c"
							}
						],
						"transcriptFields" : [
							"Financial_Account__c"
						],
						"displayToAgent" : true
					},
					{
						"label" : "Financial Account",
						"value" : acctId,
						"entityMaps" : [
							{
								"entityName" : "finServ__financialaccount__c",
								"fieldName" : "Id"
							}
						],
						"transcriptFields" : [
							"Financial_Account__c"
						],
						"displayToAgent" : false
					}
				],
				"prechatEntities" : [
					{
						"entityName" : "Contact",
						"saveToTranscript" : "contact",
						"linkToEntityName" : "Case",
						"linkToEntityField" : "ContactId",
						"entityFieldsMaps" : [
							{
								"fieldName" : "LastName",
								"label" : "LastName",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							},
							{
								"fieldName" : "FirstName",
								"label" : "FirstName",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							},
							{
								"fieldName" : "Email",
								"label" : "Email",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							}
						]
					},
					{
						"entityName" : "Contact",
						"saveToTranscript" : "contact",
						"linkToEntityName" : "Case",
						"linkToEntityField" : "ContactId",
						"entityFieldsMaps" : [
							{
								"fieldName" : "LastName",
								"label" : "LastName",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							},
							{
								"fieldName" : "FirstName",
								"label" : "FirstName",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							},
							{
								"fieldName" : "Email",
								"label" : "Email",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : true
							}
						]
					},
					{
						"entityName" : "FinServ__FinancialAccount__c",
						"showOnCreate" : true,
						"saveToTranscript" : "FinServ__FinancialAccount__c",
						"entityFieldsMaps" : [
							{
								"fieldName" : "Id",
								"label" : "Id",
								"doFind" : true,
								"isExactMatch" : true,
								"doCreate" : false
							}
						]
					},
					{
						"entityName" : "Case",
						"showOnCreate" : true,
						"saveToTranscript" : "Case",
						"entityFieldsMaps" : [
							{
								"fieldName" : "Status",
								"label" : "Status",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							},
							{
								"fieldName" : "Origin",
								"label" : "Origin",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							},
							{
								"fieldName" : "Subject",
								"label" : "Subject",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							},
							{
								"fieldName" : "Description",
								"label" : "Description",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							},
							{
								"fieldName" : "RecordTypeId",
								"label" : "Record Type",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							},
							{
								"fieldName" : "FinServ__FinancialAccount__c",
								"label" : "Financial Account",
								"doFind" : false,
								"isExactMatch" : false,
								"doCreate" : true
							}
						]
					}
				],
				"buttonOverrides" : [],
				"receiveQueueUpdates" : true,
				"isPost" : true
			}
		}, (error, response) => {
			if(error){
				console.log('Error initializing chat: ', error);
			}
			else if(response.body.error){
				console.log('Error: ', response.body.error);
			}
			else{
				console.log('Response: %j', response.body);
				resolve(response.body);
			}
		});
	});
};

exports.messages = (session, seq) => {
	return new Promise((resolve, reject) => {
		request({
			url : "https://d.la2-c1-iad.salesforceliveagent.com/chat/rest/System/Messages",
			method : 'GET',
			qs : {"ack" : seq},
			headers : {
				"X-LIVEAGENT-API-VERSION" : 40,
				"X-LIVEAGENT-AFFINITY" : session.affinityToken,
				"X-LIVEAGENT-SESSION-KEY" : session.key
			}
		}, (error, response) => {
			if(error){
				console.log('Error getting messages: ', error);
			}
			else if(response.body.error){
				console.log('Error: ', response.body.error);
			}
			else{
				console.log('Response: %j', response);
				//console.log('Response Status', response.status);
				resolve(response);
			}
		});
	});
};

exports.sendLAMessage = (session, message) => {
	console.log("Message : " + message);
	return new Promise((resolve, reject) => {
		request({
			url : "https://d.la2-c1-iad.salesforceliveagent.com/chat/rest/Chasitor/ChatMessage",
			method : 'POST',
			headers : {
				"X-LIVEAGENT-API-VERSION" : 40,
				"X-LIVEAGENT-AFFINITY" : session.affinityToken,
				"X-LIVEAGENT-SESSION-KEY" : session.key
			},
			json : {
				"text" : message
			}
		}, (error, response) => {
			if(error){
				console.log('Error posting message: ', error);
			}
			else if(response.body.error){
				console.log('Error: ', response.body.error);
			}
			else{
				console.log('Response: %j', response.body);
				globalSequence = globalSequence + 1; 
				resolve(response.body);
			}
		});
	});
};