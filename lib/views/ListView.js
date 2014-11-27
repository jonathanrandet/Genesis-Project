var Backbone = require('backbone');
var BaseView = require('./BaseView');
var _ = require('underscore');
var $ = require('jquery');
Backbone.$ = $;
 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	dataBindings: dataBindings,
	deleteModel: deleteModel,
	editModel: editModel,
	setCollection: setCollection,
	setData: setData
});

function initialize(data){
	this.checkParameters(data);
	//this.render();
}

function render(element){
	this.dataBindings();
	var html = this.template(this.toTemplateBindings());
	if(_.isUndefined(element)){
		this.$el.html(html);
	}
	else{
		this.ParentView.$(element).find(this.$el).html(html);
	}
}

function toTemplateBindings(){
	var json = {};
	json.empty = false;
	if(_.size(this.tbody) > 0){
		json.thead = this.thead;
		json.tbody = this.tbody;
		json.module = this.ParentView.model.toJSON();
	}
	else{
		json.empty = true;
	}

	return json;
}

function dataBindings(){
	that = this;
	this.thead = {}; this.tbody = {};
	var listField = this.ParentView.model.get('fields');
	var temp = '{', lastField = _.last(listField);

	_.each(listField, function(field){
		var listDisplay = true;
		if(field.listDisplay === false){ // Les colonnes s'affichent dans tous les cas sauf si listDisplay vaut false 
			listDisplay = false;
		}
		temp += '"'+field.displayName+'": {"label": "'+field.displayName+'", "display": '+listDisplay+'}';
		if(field !== lastField){
			temp += ', ';
		}
		else{
			temp += '}';
		}
	});
	this.thead = JSON.parse(temp);
	var datas = this.collection.toJSON();
	var tbody = [];
	_.each(datas, function(model){
		var line = "{";
		_.each(that.thead, function(item, key){
			var elm = JSON.stringify(item);
			elm = elm.substring(0, elm.length-1);
			elm += ', "value": "'+model[key]+'"}';
			line += '"'+key+'": '+elm+',';
		});

		line +=' "id": "'+model.id+'" }';
		line = JSON.parse(line);
		tbody.push(line);
	});
	this.tbody = tbody;

	//console.log(this.tbody[0].DisplayName_003.display);
}

function deleteModel(e){
	e.preventDefault();
	var $btn = $(e.currentTarget); 
	var id = $btn.data('id');

	if(confirm('Voulez vous vraiment supprimer ?')){
		this.ParentView.DataCollection.remove({id: id});
		this.render();
	}
}

function editModel(e){
	e.preventDefault();
	that = this;
	var $btn = $(e.currentTarget);
	var id = $btn.data('id');
	var model = this.ParentView.DataCollection.findWhere({id : id});
	this.ParentView.views.editView.setModel(model, e);
}

function setCollection(collection){
	if(collection){
		this.collection = collection;
	}
}

function setData(data){
	if(data){
		this.collection.reset(data);
	}
}