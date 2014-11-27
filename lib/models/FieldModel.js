var BaseModel = require('./BaseModel');

module.exports = BaseModel.extend({
	defaults : {
		type : 'text',
		placeholder : ' Saisir un texte ',
		name: ' Field '
	},
	initialize: initialize,
	afterInit: afterInit
});


function initialize(){
	this.afterInit();
}

function afterInit(){
	console.log('Je suis dans FieldModel');
}