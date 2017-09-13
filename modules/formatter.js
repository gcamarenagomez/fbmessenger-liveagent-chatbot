"use strict";

let moment = require("moment"),
    numeral = require("numeral");

exports.formatAccounts = finAccounts => {
	let elements = [];
	finAccounts.forEach(acct => {
		elements.push({
			title: acct.get('name'),
			subtitle: `${acct.get("FinServ__FinancialAccountNumber__c")} · ${numeral(acct.get("FinServ__Balance__c")).format('$0.0')}`,
			"image_url" : acct.get("ImageUrl__c"),
			"buttons" : [
				{
                    "type": "postback",
                    "title": "Desactivar",
                    "payload": "schedule_visit," + acct.getId()
                },
                {
                    "type": "postback",
                    "title": "Reportar Robo",
                    "payload": "contact_broker," + acct.getId()
                },
                {
                    "type": "postback",
                    "title": "Transacción rechazada",
                    "payload": "contact_me," + acct.getId()
                }
			]
		})
	});
	return{
		"attachment" : {
			"type": "template",
            "payload": {
                "template_type": "generic",
                "elements": elements
            }
		}
	};
};