var BaseCollection = require('./BaseCollection');
var PageModel = require('../models/PageModel');

module.exports = BaseCollection.extend({
	model: PageModel,
	initialize : initialize
	//parse: parse
});

function initialize(){
	//console.log(this);
}