var BaseCollection = require('./BaseCollection');
var DataModel = require('../models/DataModel');

module.exports = BaseCollection.extend({
	model: DataModel,
	initialize : initialize
	//parse: parse
});

function initialize(){
	//Hack en attendant le save id
	this.on('add', function(model){
		if(model.get('id') === undefined){
			model.set('id', model.cid);
		}
	});
}

// Fonction pour le pager

/*function parse(data){
	if(data){
		console.log('toto');
		console.log(data);
	}
}*/