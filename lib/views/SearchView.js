var BaseView = require('./BaseView');
var _ = require('underscore');
var DataCollection = require('../collections/DataCollection');
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	searchModel: searchModel
});


function initialize(data){
	this.checkParameters(data);
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
	return json;
}

function searchModel(){
	that = this;
	var result = this.ParentView.DataCollection.toJSON();
	_.each(this.collection.toJSON(), function(field){
		var column = field.searchField;
		var value = '';
		// Traitement pour les checkbox
		if(field.type === 'checkbox'){
			value = that.$('[name="'+field.name+'"]').prop('checked'); 
			result = _.filter(result, function(model){
				if(value){
					return that.compareValue(field.comparator, model[column].toLowerCase(), field.value);
				}
				else return true;
			});
		}
		// Traitement pour le reste
		else{
			value = that.$('[name="'+field.name+'"]').val().toLowerCase(); 
			result = _.filter(result, function(model){
				if(model[column].toLowerCase().search(value) !== -1) {return true;}
				else {return false;}
			});
		}

	});

	var collection = new DataCollection(result);
	this.ParentView.views.listView.setCollection(collection);
	this.ParentView.views.listView.render();
} 



