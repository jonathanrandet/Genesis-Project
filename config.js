module.exports = {
	module_name: {
		config: require('./modules/module_name/config'),
		templates:{
			addview: require('./modules/module_name/tpl/AddTemplate.hbs'),
			listview: require('./modules/module_name/tpl/ListTemplate.hbs'),
			searchview: require('./modules/module_name/tpl/SearchTemplate.hbs'),
			editview: require('./modules/module_name/tpl/EditTemplate.hbs')
		} 
	}
}