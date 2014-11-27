var BaseView = require('./BaseView');
var _ = require('underscore');

 
module.exports = BaseView.extend({
	initialize: initialize,
	render: render,
	toTemplateBindings: toTemplateBindings,
	setModel: setModel,
	setCollection: setCollection
});

function initialize(data){
	this.checkParameters(data);
	if(this.ParentView && this.ParentView.ParentView){
		this.AncestorView = this.ParentView.ParentView;
	}
	console.log(this.AncestorView);
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
	var json = {};
	if(!_.isUndefined(this.dataTemplating)){
		json = this.dataTemplating(json);
	}
	return json;
}



//************************************  FONCTION A UTILISATION FINALE  ***************************************************//
//	C'est fonction  sont celles que les utilisateurs finaux manipulerons pour créer leurs applications.					 //
//	Elles effectuent des opérations sur les divers objets du module.  													 //	
//***********************************************************************************************************************//

// nom : setModel
// param : le model à utiliser 
// renvoie : rien
// erreur : rien
// description :
function setModel(model){
	if(model){
		this.model = model;
	}
}

// nom : setCollection
// param : la collection à utiliser 
// renvoie : rien
// erreur : rien
// description :
function setCollection(collection){
	if(collection){
		this.collection = collection;
	}
}

// nom : dataTemplating
// param : aucun 
// renvoie : rien
// erreur : rien
// description : fait un traitement sur les données utilisée dans le template 
function dataTemplating(json){}