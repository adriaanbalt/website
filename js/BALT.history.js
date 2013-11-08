/**
 * @fileOverview BALT History
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.History
 * @namespace The public namespace and api for the history manager
 * @description The public namespace and api for the history manager
 * @requires BALT
 */
BALT.History = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		items: [],
		uid: 0
	},

	_parseHash = function( hash ) {
		var index = 0;

		if ( hash ) {
			for ( index; index < $chapters.length; index++ ){
				if ( $($chapters[index]).attr('data-id').toLowerCase() == hash ){
					break;
				} else {
					BALT.Chapters.openChapter( index );
				}
			}
			BALT.Chapters.gotoIndex( index );
			_gaq.push(['_trackEvent', 'Section View', $($chapters[index]).attr('data-id').toLowerCase() ]);
		}

	},
	
	/**
	 * @name BALT.History-_initialize
	 * @exports BALT.History-_initialize as BALT.History.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.History');

		$chapters = $('.chapter');

		// setup the history manager
		$.history.init( _parseHash );

		config.initialized = true;
	};

	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.History || {}, window, undefined));