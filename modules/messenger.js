"use strict";

let request = require('request'),
	FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;

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