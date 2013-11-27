/**
 * @fileOverview BALT boot strap
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

/**
 * @name BALT
 * @namespace The global namespace for the Agency of the Year site.
 * @description The global namespace for the Agency of the Year site. 
 * @requires <a href="http://www.jquery.com">jQuery 1.8.3+</a>
 */
(function($) {
	$.fn.closest_descendent = function(filter) {
		var $found = $(),
			$currentSet = this; // Current place
		while ($currentSet.length) {
			$found = $currentSet.filter(filter);
			if ($found.length) break;  // At least one match: break loop
			// Get all children of the current set
			$currentSet = $currentSet.children();
		}
		return $found.first(); // Return first match of the collection
	}
})(jQuery);
window.BALT = (function(self, window, undefined){
	
	var config = {
		initialized: false
	},
	
	/**
	 * @name BALT-_initialize
	 * @exports BALT-_initialize as BALT.initialize
	 * @function
	 * @description The initialize method that kicks off all functionality.
	 */
	_initialize = function() {
		// prevent bootstrap from executing twice
		if (config.initialized) {
			return;
		}
		
		// console overwrite for IE8
		if (window.console === undefined) {
			window.console = {};
			console.log = function() {};
			console.error = function() {};
		}
		
		console.log('BALT.initialize');
		
		// Set any DOM eles that are now available	
		BALT.$body = $('body');
		BALT.$content = $('#content');

		if ($('html').hasClass('lt-ie9')) {
			// on a mobile device
			window.location = "/ie.html";
			return;
		}

		if ('ontouchstart' in window) {
			$('#controls').addClass('displayNone');
			$('#menu-overlay').find('p').addClass('displayNone');
			$('#menu-overlay').find('.mobile').removeClass('displayNone');
			$('header').find('.mobile').removeClass('displayNone');
		}

		// init RwdResize passing in an object of breakpoint name/value pairs, 
		// and an optional element RwdResize will use to check the outerWidth of to determine
		// current layout being used and if a layoutChange has occurred.
		// if none is passed in, RwdResize will use the body element
		var rwdResizeData = RwdResize.initialize({
			small: 640,
			medium: 1024,
			large: 1140
		}, BALT.$content );
		
		BALT.Templates.initialize();
		BALT.Intro.initialize();
		BALT.Header.initialize();
		BALT.Chapters.initialize();
		BALT.Accordion.initialize();

		// prevent bootstrap from executing twice
		config.initialized = true;
	},

	_loadComplete = function() {
		console.log ( ' - load complete' );
		BALT.VideosVimeo.initialize();
		
		BALT.History.initialize();
	};
	
	
	// BALT public variables & methods
	return {
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
		/**
		 * @name BALT.$content
		 * @description Stored jQuery reference to content element */
		$content: null,
		initialize: _initialize,
		loadComplete: _loadComplete
	};
	
}(window.BALT || {}, window, undefined));

// Initialize functionality
$(document).ready(BALT.initialize);