var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.Router.extend({
	routes: {
		'':'index'
	},
	initialize: initialize,
	generateRoute: generateRoute,
	index: index
});

function initialize(data){
	if(!_.isUndefined(data) && !_.isUndefined(data.parentView)){
		this.ParentView = data.parentView;
	}
	else{
		throw new Error('Initialize: Router need a parentView param');
	}
}

function index (){
	//this.ParentView.render();
	//console.log('Ca marche !!');
}

function generateRoute(){
	var that = this;
	_.each(this.ParentView.Modules, function(module){
		if(!_.isUndefined(module.model.get('className'))){
			var route = module.model.get('className').toLowerCase();
			var data = {
				name: route+'Add',
				route: route+'/add',
				right: 'all'
			};
			console.log(that.ParentView);
			that.ParentView.createPage(data).addBlock(route+'Add');

			data = {
				name: route+'Search',
				route: route+'/search',
				right: 'all'
			};
			that.ParentView.createPage(data).addBlock(route+'Search');

			data = {
				name: route+'List',
				route: route+'/list',
				right: 'all'
			};
			that.ParentView.createPage(data).addBlock(route+'List');
/*			that.route(route+'/add', route, function(){
				module.views.addView.render();
			});
			that.route(route+'/search', route, function(){
				module.views.listView.render();
				module.views.searchView.render();
			});
			that.route(route+'/list', route, function(){
				module.views.listView.render();
			});*/
		}
		else{
			throw new Error('Your modules require className');
		}

	});
}