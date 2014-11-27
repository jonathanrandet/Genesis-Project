var BaseCollection = require('./BaseCollection');
var BlockModel = require('../models/BlockModel');

module.exports = BaseCollection.extend({
	model: BlockModel,
	initialize : initialize
	//parse: parse
});

function initialize(){
	//console.log(this);
}