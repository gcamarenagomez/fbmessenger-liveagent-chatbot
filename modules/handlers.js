"use strict";

let salesforce = require('./salesforce'), 
	messenger = require('./messenger'),
	formatter = require('./formatter');

var rut;

exports.hola = (sender) => {
	messenger.getUserInfo(sender).then(response => {
		messenger.send({text : `Hola ${response.first_name}! Por favor proporcióname tu RUT sin puntos ni guiones.`}, sender);
	});
};

exports.ayuda = (sender) => {
	messenger.send({text : `Puedes preguntarme cosas como "Consulta de Cuentas", "Consulta de Saldos", "Transacción Rechazada"`}, sender);
};

exports.buscaContacto = (sender, values) => {
	console.log('Valor recibido: ' + values[0]);
	rut = values[0];
	messenger.send({text : `Gracias! Estoy validando tu RUT en nuestro sistema...`}, sender);
	salesforce.findContact(values[0]).then(contact => {
		console.log('Variable global RUT: ' + rut);
		messenger.send({text : `Listo! Por favor indícame tu nombre completo.`}, sender);
	})
}