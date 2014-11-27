module.exports = function(grunt){

	
	grunt.initConfig({

		jshint: {
    		all: ['Gruntfile.js', 'app/js/*.js', 'lib/**/*.js', 'module/**/*.js']
  		},

		browserify: {
		  dist: {
		    files: {
		      'prod/app.js': ['app/js/app.js'] // ajouter toutes les files ici !
		    },
		    options: {
		      	transform: ['hbsfy']
		    }
		  }
		},

		concat: {
		    options: {
		      	separator: ';',
		    },
		    dist: {
		      	src: ['vendor/js/jquery*.js', 'vendor/js/*.js'],
		      	dest: 'prod/front.js'
		    }
		},

		uglify: {
		    dist: {
		      	files: {
		        	'prod/min.js': ['prod/app.js'] // 'vendor/js/jquery*.js', 'vendor/js/underscore*.js', 'vendor/js/*.js', 
		      	}
		    }
		},

		cssmin: {
			dist: {
			    files: {
			      'prod/min.css': ['app/css/*.css', 'modules/**/*.css','vendor/css/*.css']
				}
			}
		},

		watch: {
			dist: {
				files:['**/*.js', '**/*.css', '**/*.hbs', '!prod/**/*'],
				tasks:['default'],
				options:{
					spawn: false
				}
			}
		}

	});

	// Load all plugins 
	require('load-grunt-tasks')(grunt);

	//grunt.registerTask('default',['jshint','browserify', 'cssmin']);
	grunt.registerTask('default',['jshint','browserify','uglify', 'cssmin']);
	grunt.registerTask('dev', ['watch']);
};