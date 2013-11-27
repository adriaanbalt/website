/**
 * @fileOverview BALT Header
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Header
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Header = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false
	}, $header, $headerAlign

	/**
	 * @name BALT.Nav-_nextButton
	 * @function
	 * @description on click of a next button
	 * @param {event} e Event data
	 */
	_nextButton = function(e) {
		_gaq.push( [ '_trackEvent', 'See Next Click', $(this).data('destination') ] );
	},

	/**
	 * @name BALT.Header-_initialize
	 * @exports BALT.Header-_initialize as BALT.Header.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.Header');

		$header = $('header');
		$headerAlign = $('header .align');

		// subscribe to the resize and scroll events for this video
		var resize_uid = RwdResize.subscribe(_resize, this);
		_resize();

		config.initialized = true;
	},
	
	/**
	 * @name BALT.Header-_Header.resize
	 * @function
	 * @description Fires on window resizes.
	 * @param {object} data An object of resize data; layout, width, and layoutChanged
	 */
	_resize = function(data) {
		$header.height(BALT.$window.height());
		$headerAlign.height($header.height());
	};
	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.Header || {}, window, undefined));