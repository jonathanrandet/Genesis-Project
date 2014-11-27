var Backbone = require('backbone');
var BaseView = require('./BaseView');
var $ = require('jquery');
Backbone.$ = $; 
var _ = require('underscore');
var FieldCollection = require('../collections/FieldCollection');
var DataCollection = require('../collections/DataCollection');
var AddView = require('./AddView'); // ajoutera les autres view après
var ListView = require('./ListView');
var SearchView = require('./SearchView');
var EditView = require('./EditView');
var StateView = require('./StateView');


module.exports = Backbone.View.extend({
	el: 'html',
	initialize: initialize,
	render: render,
	setDataCollection: setDataCollection,
	setAddView: setAddView,
	setListView: setListView,
	setSearchView: setSearchView,
	setEditView: setEditView,
	setStateView: setStateView,
	getView: getView,
	// Fonctions utilisateur 
	getData: getData,
	editView: editView,
	addView: addView,
	listView: listView,
	searchView: searchView,
	allViews: allViews
});


function initialize(data){
	console.log(data);
	this.views = {};
	if(data){
		if(data.model){
			this.model = data.model;
		}
		if(data.template){
			this.templates = data.template;
		}
		if(data.parentView){
			this.ParentView = data.parentView;
		}

		this.setDataCollection();
		this.setAddView();
		this.setListView();
		this.setSearchView();
		this.setEditView();
	}
	this.listenTo(this.DataCollection, 'add remove change', function(){ // A changer lorsque j'aurai une fonction qui ne rendra que la listView
		this.views.listView.setCollection(this.DataCollection);
		this.views.listView.render();
	});
}

function getView(name){
	if(_.isString(name) && name.search('View') === -1){
		name = name.toLowerCase();
		name+='View';
	}
	return this.views[name];
}


function setAddView(){
	var collection = new FieldCollection(this.model.get('fields'));
	var className = this.model.get('className');
	this.views.addView = new AddView({
		el: '[data-template='+className+'-add]', //******************** Trouver un moyen de changer le el dynamiquement (en param)********************
		template: this.templates.addview,
		collection: collection,
		parentView: this
	});
}

function setListView(){
	var className = this.model.get('className');
	this.views.listView = new ListView({
		el: '[data-template='+className+'-list]', //'[data-template=""]'
		template: this.templates.listview,
		collection: this.DataCollection,
		parentView: this
	});
}

function setSearchView(){
	var collection = new FieldCollection(this.model.get('search'));
	var className = this.model.get('className');
	this.views.searchView = new SearchView({
		el: '[data-template='+className+'-search]',
		template: this.templates.searchview,
		collection: collection,
		parentView: this
	});
}

function setEditView(){
	var collection = new FieldCollection(this.model.get('fields'));
	var className = this.model.get('className');
	this.views.editView = new EditView({
		el: '[data-template='+className+'-edit]',
		template: this.templates.editview,
		collection: collection,
		parentView: this
	});
}



function setStateView(name, data){
	var that = this;
	if(_.isUndefined(this.views.StateView)){
		this.views.StateView = [];	
	}
	if(!_.isUndefined(name)){
		this.views.StateView[name] = new StateView({
			parentView: this
		});
		if(!_.isUndefined(data)){
			_.each(data, function(value,key){
				if(key === 'el'){
					that.views.StateView[name].setElement(value);
				}
				else{
					that.views.StateView[name][key] = value;
				}
				
			});
		}
	}
}


// Le codeur peut creer une collection et la passer en param (trouver un moyen)
// C'est dans cette fonction que je ferais les fetch des données
function setDataCollection(datas){ 
	var collection = [];
	if(!_.isUndefined(datas)){
		collection = datas;
	}
	else{
		// Données fictive 
		var data = [];
		data.push({DisplayName_001: 'Randet', DisplayName_002: 'Jonathan', DisplayName_003: '23', id: '001'});
		data.push({DisplayName_001: 'Mouanda', DisplayName_002: 'Carole', DisplayName_003: '26', id: '002'});
		collection = new DataCollection(data); 
	}
	this.DataCollection = collection;
}


function render(){
	this.views.addView.render();
	this.views.listView.render();
	this.views.searchView.render();
}


//************************************  FONCTION A UTILISATION FINALE  ***************************************************//
//	C'est fonction  sont celles que les utilisateurs finaux manipulerons pour créer leurs applications.					 //
//	Elles effectuent des opérations sur les divers objets du module.  													 //	
//***********************************************************************************************************************//

// nom : getData
// description :
// param : identifiant du model a renvoyer 
// renvoie : une collection si id est undefined, un model si id est defini  
// erreur : 
function getData(id){
	var data = {};
	if(!_.isUndefined(this.DataCollection)){
		if(id){
			data = this.DataCollection.findWhere({id: id});
		}
		else{
			data = this.DataCollection;
		}
	}
	return data;
}

// nom : ListView
// description : Rend la ListView du module
// param : aucun
// renvoie : rien 
// erreur : 
function listView(){
	if(!_.isUndefined(this.views) && !_.isUndefined(this.views.listView)){
		this.views.listView.render();
	}
}

// nom : AddView
// description : Rend la AddView du module
// param : aucun
// renvoie : rien 
// erreur : 
function addView(){
	if(!_.isUndefined(this.views) && !_.isUndefined(this.views.addView)){
		this.views.addView.render();
	}
}

// nom : SearchView
// description : Rend la SearchView du module
// param : aucun
// renvoie : rien 
// erreur : 
function searchView(){
	if(!_.isUndefined(this.views) && !_.isUndefined(this.views.searchView)){
		this.views.searchView.render();
	}
}

// nom : EditView
// description : Rend la EditView du module
// param : aucun
// renvoi : rien 
// erreur : 
function editView(){
	if(!_.isUndefined(this.views) && !_.isUndefined(this.views.editView)){
		this.views.editView.render();
	}
}

// nom : AllViews
// description : Rend la AddView, la SearchView et la ListView (permettant d'éditer et de supprimer une un élément de la liste)
// param : aucun
// renvoi : rien 
// erreur : 
function allViews(){
	if(!_.isUndefined(this.views)){
		if(!_.isUndefined(this.views.addView)){
			this.views.addView.render();
		}
		if(!_.isUndefined(this.views.listView)){
			this.views.listView.render();
		}
		if(!_.isUndefined(this.views.searchView)){
			this.views.searchView.render();
		}
	}
	else{
		throw new Error('allViews : Your module need AddView, ListView and/or SearchView');
	}

}