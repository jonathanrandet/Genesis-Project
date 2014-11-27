
var config = {
		className: 'Auteur',
		fields: [ // Bouton de validation ajouté automatiquement et grisé tant que les champs requis sont pas remplis. 
			{
				type: 'text', // Number, checkbox, radio, date, combo,
				required: true, // default false
				formDisplay: true, // Pour les formulaires d'édition et de création (default true)
				listDisplay: true, // Permet d'afficher ou pas le champs en liste  (default true)
				classes: ['class1', 'class2'], // Les class css dans un tableau
				displayName : 'DisplayName_001', // Utilisé comme étiquette pour le détail et l'affichage en liste.
				label: 'Nom', // Le label du champs 
				name:'nom',
				attributes: {
					id: 'jonathan-id', // L'id a utiliser pour css ou jquery ...
					title: 'Mon Titre',
					name: 'Génésis', // doit etre obligatoire car utilisé pour la DataView (le title des champs de la table)
					placeholder: 'Saisir votre texte',
				}, // title, name, placeholder
				dataAttributes: {
					content:'Mon content'
				} //Pour data-content
			},{
				displayName : 'DisplayName_002',
				name:'prenom',
				label: 'Prenom', // Le label du champs 
				listDisplay: true,
				attributes: {
					title: 'Mon Titre',
					name: 'Field_001', // doit etre obligatoire car utilisé pour la DataView (le title des champs de la table)
					placeholder: 'Saisir votre texte'
				}
			},{
				displayName : 'DisplayName_003',
				name:'age',
				display: true,
				label: 'Age', // Le label du champs 
				attributes: {
					title: 'Mon Titre',
					name: 'Field_002', // doit etre obligatoire car utilisé pour la DataView (le title des champs de la table)
					placeholder: 'Saisir votre texte'
				}
			}
		],
		addSubmitText: 'Ajouter',
		editSubmitText: 'Modifier',

		search: [
			{ // si search vaut true, 
				type: 'text', // Le type du champs de recherche. (La valeur par défaut est text). peut etre checkbox, date ...
				trigger : 'auto', // Le name de l'élément du Dom qui déclenche la recherche ( a préciser si ce n'est pas le champs de saisis lui même)
				event: 'keyup', // L'évènement à effectuer sur "trigger" pour déclancher (default click)
				comparator: '>', // " = ", " > ", " < ", " != "
				value: '25',
				searchField: 'DisplayName_002', // Le name du champs sur lequel la recherche sera faite. Si ce champs n'est pas renseigné, la recherche se fait partt.
				placeholder: ' Rechercher',
				label: ''
			}
		],
		rules: [
			// Sous la forme "firstSelector" "comparator" "secondSelector"
			{
				fieldtype: 'text', 
				firstSelector: '', // Le selecteur du premier element de la comparaison.
				secondSelector: '', // Le selecteur du second element de la comparaison.
				comparator:'isLessThan ou <', // isMoreThan ou >, isEqualTo ou =, isDifferentFrom !=,
				textError:'Error', // Message à Afficher si il y a erreur 
				validation: function(){} // A renseigner si on veut faire des traitements plus complexes. ( On y utilise les selecteurs pour referencer les champs)
			},{},{}
		]
};

module.exports = config;