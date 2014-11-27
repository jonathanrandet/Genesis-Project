var BaseView = require('./BaseView');
var _ = require('underscore');
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	checkField: checkField,
	addModel: addModel
});

function initialize(data){
	this.checkParameters(data);
	//this.render();
}

function render(element){
	var html = this.template(this.toTemplateBindings());
	if(_.isUndefined(element)){
		this.$el.html(html);
	}
	else{
		this.ParentView.$(element).find(this.$el).html(html);
	}
}

function toTemplateBindings(){
	var json = this.collection.toJSON();
	json.module = this.ParentView.model.toJSON();
	return json;
}

function addModel(){
	var fields = this.ParentView.model.get('fields');
	var jsonTxt = '{';
	var that = this;
	_.each(fields, function(field, key){
		jsonTxt = jsonTxt +'"'+field.displayName+'": "'+that.$('[name='+field.name+']').val()+'",';
	});
	jsonTxt = jsonTxt.substring(0,jsonTxt.length-1);
	jsonTxt = jsonTxt + '}';
	json = JSON.parse(jsonTxt);
	this.ParentView.DataCollection.add(json);
	this.$el.find('form input').val(''); // Si la validation est ok
}


// Cette fonction est à définir
// Fonction pour la validation des champs. Elle ne renvoie rien si tous les champs sont ok sinon le msg d'erreur.
function checkField(val){
	var type = this.model.get('type');
	var required = this.model.get('required');
	if(required){
		if(val === ''){
			return false;
		}
	}
}
