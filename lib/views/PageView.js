var Backbone = require('backbone');
var BlockCollection = require('../collections/BlockCollection');
var $ = require('jquery');
Backbone.$ = $; 
var _ = require('underscore');

module.exports = Backbone.View.extend({
	initialize: initialize,
	addBlock: addBlock
});

function initialize(data){
	if(!_.isUndefined(data)){
		if(!_.isUndefined(data.name)){
			this.name = data.name;
		}
		if(!_.isUndefined(data.route)){
			this.route = data.route;
		}
		if(!_.isUndefined(data.right)){
			this.right = data.right;
		}
		else{
			this.right = 'all';
		}
	}

	this.Blocks = new BlockCollection();
}

function addBlock(name,right){
	var data = {};
	if(_.isUndefined(name)){
		throw new error('addBlock : Your block should have a name');
	}
	else{
		data.name = name;
		data.right = _.isUndefined(right) ? 'all' : right;
	}
	this.Blocks.add(data);
}