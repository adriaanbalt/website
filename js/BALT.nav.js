/**
 * @fileOverview BALT Nav
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Nav
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Nav = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		navActive: false
	},

	/**
	 * @name BALT.Nav-_initialize
	 * @exports BALT.Nav-_initialize as BALT.Nav.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.Nav');
		
		$navigation = $('#navigation');
		$menuDark = $navigation.find('.menu-dark');
		$menuLight = $navigation.find('.menu-light');
		$nav = $navigation.find('nav');

		$navigation.find('.menu-btn').on( 'click', _toggleNav );

		$navigation.find('.nav-btn').on( 'click', _gotoSection );

		config.initialized = true;
	},

	/**
	 * @name BALT.Nav-_toggleNav
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_toggleNav = function() {
		config.navActive = !config.navActive;
		if ( config.navActive ) {
			_gaq.push(['_trackEvent', 'Nav opened']);
			$navigation.addClass( 'open' );
			$nav.clearQueue().animate({
				'opacity':1
			}, 150, function() {
			});

			// stop all video
			BALT.VideosVimeo.pauseAll();
			// stop all sprites
			BALT.SpriteAnimation.stop();

		} else {
			$nav.clearQueue().animate({
				'opacity':0
			}, 150, function() {
				$navigation.removeClass( 'open' );
			});
			// start all sprites
			BALT.SpriteAnimation.start();
		}
	},

	/**
	 * @name BALT.Nav-_gotoSection
	 * @function
	 * @description on click of a navigation item
	 * @param {event} e Event data
	 */
	_gotoSection = function(e) {
		_toggleNav();
		_gaq.push(['_trackEvent', 'Nav Item Click',  $(this).data('destination')]);

	};

	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.Nav || {}, window, undefined));