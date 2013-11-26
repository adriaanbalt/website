/**
 * @fileOverview BALT Templates
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Templates
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Templates = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		sections: []
	},

	/**
	 * @name BALT.Templates-_Template
	 * @function
	 * @description
	 * @param {DOM} target
	 * @param {string} templateName
	 * @param {object} data
	 */
	_Template = function( target, templateName, data ) {
		var template = $("#" + templateName).html();
		console.log ( "template " , data );
		target.append( _.template( template, {data:data} ) );

	},

	/**
	 * @name BALT.Templates-_initialize
	 * @exports BALT.Templates-_initialize as BALT.Templates.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		if (config.initialized) return;
		
		// _.templateSettings = {
		// 	// interpolate : /\{\{([\s\S]+?)\}\}/g
		// };
		
		for ( var i = 0; i <  BALT_website_data.length; i++ ){
			config.sections[i] = new _Template( $('#content'),  BALT_website_data[i].template,  BALT_website_data[i] );
		}

		config.initialized = true;
	};

	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.Templates || {}, window, undefined));