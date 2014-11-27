var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var Handlebars = require('handlebars');
Backbone.$ = $;

module.exports = Backbone.View.extend({
  	initialize: initialize,
  	render: render,
  	toTemplateBindings : toTemplateBindings,
  	quickAction: quickAction,
  	addAction: addAction,
  	checkParameters: checkParameters,
  	compareValue: compareValue,
  	setTemplate: setTemplate,
  	clear: clear,
  	events: {
  		'click [data-click]': 'quickAction', // click
  		'keyup [data-keyup]': 'quickAction', // keyup
  		'keydown [data-keydown]': 'quickAction', // keydown
  		'focus [data-focus]': 'quickAction', // focusin
  		'blur [data-blur]': 'quickAction', // focusout
  		'mouseover [data-hover]': 'quickAction', // mouseover
  		'mouseleave [data-mouseleave]': 'quickAction', // mouseleave
  		'mouseenter [data-mouseenter]': 'quickAction', //mouseenter
  		'change [data-change]': 'quickAction' // change
  	}
});

function initialize(options) {
  if (options && options.template) {
    this.template = options.template;
  }
  this.render();
}

function render(){
	if(!_.isUndefined(this.template)){
		var template = Handlebars.compile(this.template);
		var html = template(this.toTemplateBindings());
		this.$el.html(html);
	}
}

function checkParameters(data){
	if(data){
		if(data.template){
			this.template = data.template;
		}
		if(data.collection){
			this.collection = data.collection;
		}
		if(data.model){
			this.model = data.model;
		}
		if(data.parentView){
			this.ParentView = data.parentView;
		}
	}
	else{
		throw new error('initialize : need config and template');
	}
}

function toTemplateBindings() {
  if (this.model) {
    return this.model.toJSON();
  } else if (this.collection) {
    return this.collection.toJSON();
  } else {
    throw new error('toTemplateBindings: requires a either a model or to be overriden');
  }
}

function quickAction(e) {
	var type = e.type;
	if(type === 'focusin'){ type = 'focus';}
	if(type === 'focusout'){ type = 'blur';}
	var action = $(e.currentTarget).data(type);
	if (_.isFunction(this[action])) {
		this[action](e);
	}
	//e.stopPropagation();
}

function addAction(name, action){
	if(!_.isString(name)){
		throw new Error('addAction : first argument should be a string');
	}
	else if(_.isFunction(action)){
		this[name] = action;
	}
	else{
		this[name] = function(){
			console.log(action);
		};
	}
}

function compareValue(comparator, valA, valB){
	if(comparator === '='){ return valA === valB;}
	if(comparator === '<'){ return valA < valB;} // On pourra ajouter les isMoreThan ...
	if(comparator === '>'){ return valA > valB;}
	if(comparator === '<='){ return valA <= valB;}
	if(comparator === '>='){ return valA >= valB;}
	if(comparator === '!='){ return valA  !== valB;}
}


//************************************  FONCTION A UTILISATION FINALE  ***************************************************//
//	C'est fonction  sont celles que les utilisateurs finaux manipulerons pour créer leurs applications.					 //
//	Elles effectuent des opérations sur les divers objets du module.  													 //	
//***********************************************************************************************************************//

// nom : setTemplate
// description :
// param : le template à utiliser 
// renvoie : rien
// erreur : lève une exception si template n'est pas du handlebars  
function setTemplate(template){
	if(template){
		this.template = template;
	}
}

// nom : clear
// description : Vide le el de la vue
// param : aucun
// renvoie : rien
// erreur : aucune  
function clear(){
	if(this.el){
		this.$el.html('');
	}
}