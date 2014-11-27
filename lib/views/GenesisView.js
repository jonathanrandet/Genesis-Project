var Backbone = require('backbone');
var BaseView = require('./BaseView');
var $ = require('jquery');
Backbone.$ = $; 
var _ = require('underscore');

var Module = require('./ModuleView');
var ModuleModel = require('../models/ModuleModel');
var Router = require('../routers/Router');
var PageCollection = require('../collections/PageCollection');
var PageView = require('./PageView');

var templates = require('../../config');

module.exports = Backbone.View.extend({
	el: 'html',
	initialize: initialize,
	render: render,
	setModules: setModules,
	preloadModules: preloadModules,
	setRouter: setRouter,
	setPages: setPages,
	getModulePath: getModulePath,
	addRoute: addRoute,
	createPage: createPage,
	getPage: getPage,
	hidePage: hidePage,
	showPage: showPage,
	getModule: getModule
});

function initialize(data){
	var that = this;
	if(!data){
		throw new Error('GenesisView : constructor need modules paramaters');
	}
	else{
		if(data.modules){
			//this.setModules(data.modules);
		}
	}
	this.setPages();
	this.preloadModules();
	//Doit être la dernière ligne
	this.setRouter();
	//this.$('[data-toggle="tooltip"]').tooltip();
}

function render(){ // ********************** A étudier (On ne rend pa tous les modules en même temps) *************************** 
	_.each(this.Modules, function(module){
		module.render();
	});
}

function setRouter(){
	this.Router = new Router({
		parentView: this
	});
	this.Router.generateRoute();
	Backbone.history.start();

}

function setPages(pages){
	if(!_.isUndefined(pages)){
		this.Pages = pages;
	}
	else{
		this.Pages = {};
	}
	this.activePage = '';
}

function preloadModules(){
	var that = this;
	this.Modules = {};
	_.each(templates, function(val){
		var config = val.config;
		var model = new ModuleModel(config);
		var template = val.templates;
		var Article = new Module({
			model: model,
			template: template,
			parentView: that
		});
		//juste pour les tests
		var name = Article.model.get('className').toLowerCase();
		that.Modules[name] = Article;
	});	
}

function setModules(modules){
	var that = this;
	this.modules = {};

	if(_.isString(modules)){
		this.modules[0] = {
			name: modules,
			path: that.getModulePath(modules)
		};
	}
	else if(_.isArray(modules)){
		var i = 0;
		_.each(modules, function(module){
			that.modules[i] = {
				name: module,
				path: that.getModulePath(module)
			};
			i++;
		});
	}
}

function getModulePath(module){
	var prefix = '../../modules';
	return prefix+'/'+module+'/';
}



//************************************  FONCTION A UTILISATION FINALE  ***************************************************//
//	C'est fonction  sont celles que les utilisateurs finaux manipulerons pour créer leurs applications.					 //
//	Elles effectuent des opérations sur les divers objets du module.  													 //	
//***********************************************************************************************************************//

// nom : createPage
// description :
// param : un objet contenant le name de la page, la route d'accès a la page et les droits d'acces 
// renvoie : la page créée
// erreur : 
function createPage(name,route,right){
	var that = this;
	var data = {};
	// Si le premier argument est un objet, 
	if(!_.isUndefined(name) && _.isObject(name)){
		data = name;
	}
	else{
		if(!_.isUndefined(name)){
			data.name = name;
		}
		if(!_.isUndefined(route)){
			data.route = route;
		}
	}
	if(!_.isUndefined(data.right)){
		data.right = _.isUndefined(right) ? 'all': right;
	}
	
	if(!_.isUndefined(data.name) && !_.isUndefined(data.route)){
		this.Pages[data.name] = new PageView(data);
		this.addRoute(data.route, function(){ //******************** Réfléchir a une fonction a executer avant le showPage();
			that.showPage(data.name);
		});
	}
	else{
		throw new Error('createPage : Your page needs a name and route');
	}

	return this.getPage(data.name);
}


// nom : getPage
// description :
// param : le name de la page 
// renvoie : une page
// erreur : 
function getPage(name){
	return this.Pages[name]; 
}

// nom : getModule
// description :
// param : le name du module 
// renvoie : un moduleView s'il existe ou false
// erreur : 
function getModule(name){
	name = name.toLowerCase();
	return this.Modules[name] !== undefined ? this.Modules[name] : false; 
}



// nom : addRoute
// description :
// param : l'url d'accès à la page et l'action à exécuter
// renvoie : rien
// erreur : 
function addRoute(route, action){
	if(!_.isUndefined(action) && _.isFunction(action)){
		this.Router.route(route, route, action);
	}
	else{
		throw new Error('addRoute : Your route need url and action');
	}
}



// nom : hidePage
// description :
// param : le nom de la page à cacher
// renvoie : rien
// erreur : 
function hidePage(name){ // Gerer les erreurs potentiels
	var that = this;
	if(!_.isUndefined(name)){
		var allBlocks = this.getPage(name).Blocks.toJSON();
		_.each(allBlocks, function(block){
			var element = block.name;
			that.$('[data-block='+element+']').fadeOut(); //Revoir l'effet
			$sections = that.$('[data-block='+element+']').find('[data-template]'); // data-template sera le el des element générés
			_.each($sections, function(section){
				var dataTemplate = that.$(section).data('template').split('-', 2);
				var module = dataTemplate[0].toLowerCase();
				var viewName = dataTemplate[1];
				that.Modules[module].getView(viewName).clear();
			});

		});
	}
	else{
		throw new Error('hidePage : this function need page name');
	}
}

// nom : showPage
// description :
// param : nom de la page à afficher
// renvoie : rien
// erreur : 
function showPage(name){ // Gerer les erreurs potentiels
	var that = this;
	if(!_.isUndefined(name) && _.isString(name) && !_.isUndefined(this.getPage(name))){
		if(this.activePage !== ''){
			this.hidePage(this.activePage);
		}
		else{
			this.$('[data-block]').hide();
			this.$('[data-template]').html('');
		}
		var allBlocks = this.getPage(name).Blocks.toJSON();
		_.each(allBlocks, function(block){
			var element = '[data-block='+block.name+']';

			$sections = that.$(element).find('[data-template]'); // data-template sera le el des element générés
			_.each($sections, function(section){
				if(_.isUndefined(that.$(section).data('generate')) || that.$(section).data('generate').toLowerCase() !== 'manual'){ // Gestion de l'affichage auto des elément généré
					var dataTemplate = that.$(section).data('template').split('-', 2);
					var module = dataTemplate[0].toLowerCase();
					var viewName = dataTemplate[1];
					that.Modules[module].getView(viewName).render(element);
				}
			});
			that.$(element).fadeIn(); //Revoir l'effet
			
		});

		this.activePage = name;
	}
	else{
		throw new Error('showPage : This page doesn\'t exist');
	}

}
