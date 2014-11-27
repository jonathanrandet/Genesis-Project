/*var tito = require('../../lib/views/GenesisView');
var tat = require('../../modules/module_name/config');
var t = new tito();
t.addAction('cool', function(){
  console.log('tatatfsgvdghezdez');
});

t.cool();
console.log(tat);*/

/*var AddView = require('../../lib/views/AddView');
var FieldCollection = require('../../lib/collections/FieldCollection');
var module = require('../../modules/module_name/config');
var tpl = require('../../modules/module_name/tpl/AddTemplate.hbs');

console.log(tpl);
var collection = new FieldCollection(module.fields);

var tata = new AddView({
	el:'body',
	template: tpl,
	collection: collection
});*/


/*var modules = ['Article','Auteur','Livre']; 
var Genesis = require('../../lib/views/GenesisView');
var tet = new Genesis({
	modules : modules
});
console.log(tet.modules);

var config = require('../../modules/module_name/config');
var ModuleModel = require('../../lib/models/ModuleModel');
var vor = new ModuleModel(config);

console.log(vor.get('className'));*/


var modules = ['module_name']; 
var Genesis = require('../../lib/views/GenesisView');
var app = new Genesis({
	modules : modules
});

/*var FieldCollection = require('../../lib/collections/FieldCollection');
var module = require('../../modules/module_name/config');
var tpl = require('../../modules/module_name/tpl/AddTemplate.hbs');
var collection = new FieldCollection(module.fields);
data = {
	el: '#state',
	collection: collection,
	template: tpl
};*/
/*app.Modules.auteur.setStateView('toto', data);
app.Modules.auteur.views.StateView.toto.addAction('dataTemplating', function(){
	var json = this.collection.toJSON();
	json.module = this.ParentView.model.toJSON();
	return json;
});*/
//app.Modules.article.views.StateView.toto.render();
app.addRoute('toto', function(){
	//console.log(this);
	alert('Bingo');
});
/*app.createPage({name: 'taratata', route:'mytest', right: 'all'});
app.getPage('taratata').addBlock('tota');
app.hidePage('taratata');
app.showPage('taratata');*/
//console.log(app.Router.routes);
