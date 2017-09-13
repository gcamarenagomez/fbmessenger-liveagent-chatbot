"use strict";

let salesforce = require('./salesforce'), 
	messenger = require('./messenger'),
	formatter = require('./formatter');

exports.hola = (sender) => {
	messenger.getUserInfo(sender).then(response => {
		messenger.send({text : `Hola ${response.first_name}! Por favor proporcióname tu RUT sin puntos ni guiones.`}, sender);
	});
};

exports.ayuda = (sender) => {
	messenger.send({text : `Puedes preguntarme cosas como "Consulta de Cuentas", "Consulta de Saldos", "Transacción Rechazada"`}, sender);
};

exports.buscaContacto = (sender, values) => {
	messenger.send({text : `Gracias, comienzo la búsqueda de cuentas para el RUT ${values[0]}`}, sender);
}