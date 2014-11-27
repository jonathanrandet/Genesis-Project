var BaseCollection = require('./BaseCollection');
var FieldModel = require('../models/FieldModel');

module.exports = BaseCollection.extend({
	model: FieldModel,
	initialize : initialize
	//parse: parse
});

function initialize(){
	//console.log(this);
}