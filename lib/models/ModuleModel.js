var BaseModel = require('./BaseModel');
var _ = require('underscore');

module.exports = BaseModel.extend({
	initialize: initialize,
	afterInit: afterInit
});


function initialize(data){
	
	if(_.isFunction(this.afterInit)){
		this.afterInit();
	}
}

function afterInit(){
	console.log('Je suis dans ModuleModel');
}