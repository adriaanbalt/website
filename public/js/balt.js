/**
 * @fileOverview BALT bootstrap JavaScript file
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a> - <a href="http://BALT.us">www.BALT.us</a> 
 * @version 1
 */

/**
 * @name BALT
 * @namespace The global namespace for the BALT website
 * @description The global namespace for the BALT website
 * @requires <a href="http://www.jquery.com">jQuery 1.8.3</a>
 */
window.BALT = (function(self, window, undefined){
	
	/**
	 * @name BALT-_initialize
	 * @exports BALT-_initialize as BALT
	 * @function
	 * @description The initialize method that kicks off all BALT functionality
	 */
	var _initialize = function() {
		
		// prevent bootstrap from executing twice
		if (self.initialized) {
			return;
		}
		
		// console overwrite for IE8
		if (window.console === undefined) {
			window.console = {};
			console.log = function() {};
			console.error = function() {};
		}
		
		console.log('BALT.initialize');

		// Set body now that DOM is available	
		BALT.$body = $('body');

		var rwdResizeData = RwdResize.initialize({
			small: 640,
			medium: 1024,
			large: 1140
		}, BALT.$body );

		BALT.Nav.initialize();
		if ( document.getElementById("intro") ) BALT.Intro.initialize();
		BALT.Models.initialize();

		// prevent bootstrap from executing twice
		self.initialized = true;
	
	};
	
	// BALT public variables & methods
	return {
		/**
		 * @name BALT.HAS_TOUCH
		 * @description Defines if touch events are supported. */ 
		HAS_TOUCH: ('ontouchstart' in window),
		/**
		 * @name BALT.$document
		 * @description Stored jQuery reference to document */
		$document: $(document),
		/**
		 * @name BALT.$window
		 * @description Stored jQuery reference to window */
		$window: $(window),
		/**
		 * @name BALT.$html
		 * @description Stored jQuery reference to html element */
		$html: $('html'),
		/**
		 * @name BALT.$body
		 * @description Stored jQuery reference to body element */
		$body: null,
		initialize: _initialize
	};

}(window.BALT || {}, window, undefined));


// Initialize functionality
$(document).ready(BALT.initialize);