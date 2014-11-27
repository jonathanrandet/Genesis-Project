var BaseView = require('./BaseView');
var Handlebars = require('handlebars');
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	checkValue: checkValue
});

function initialize(data){
	if(data){
		if(data.template){
			this.template = data.template;
		}
		if(data.model){
			this.model = data.model;
		}
	}
	else{
		throw new error(' initialize : FieldView need model and template');
	}

	this.render();
}

function render(){
	var template = Handlebars.compile(this.template);
	var html = template(this.toTemplateBindings());
	this.$el.html(html);
}

function toTemplateBindings(){
	var json = {};
	return json;
}

function checkValue(val){
	var type = this.model.get('type');
	var required = this.model.get('required');
	if(required){
		if(val === ''){
			return false;
		}
	}
}
