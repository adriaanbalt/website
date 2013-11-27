/**
 * @fileOverview BALT Chapters
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Chapters
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Chapters = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		chapters: [],
		uid: 0,
		scrollTop: 0
	},

	/**
	 * @name BALT.Chapters-_Chapter
	 * @class
	 * @description Constructor for an chapter instance.
	 * @param {object} $target jQuery object of the DOM element we want to create an chapter
	 * @param {string} index
	 */
	_Chapter = function($target, index) {
		var accordion = this, 
			$button = $target.find('.next-btn');
		
		this.$target = $target;
		this.$button = $button;
		this.$header = $target.find('header');
		this.$headerAlign = $target.find('header .align');
		this.index = index;

		// subscribe to the resize and scroll events for this video
		this.resize_uid = RwdResize.subscribe(this.resize, this);
		this.resize();

		this.$button.on('click', _nextButton );

		this.$button.data('chapter', this);
	},

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
	 * @name BALT.Chapters-_gotoIndex
	 * @class
	 * @description 
	 * @param {int} index
	 */
	_gotoIndex = function( index ) {

		// lazy load the images
		// _lazyLoadChapter( index );

		// config.chapters[index].$target.removeClass( 'closed' );

		// var prevIndex = (index > 0) ? (index-1) : 0;
		// var btn = config.chapters[prevIndex].$button;

		// var prevChapterActive = config.chapters[prevIndex].$target.hasClass( 'closed' );

		// if ( prevChapterActive || index == 0 ){
		// 	config.chapters[index].scrollTo( index );
		// } else {
		// 	// btn.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
		// 	// 	if ( e.originalEvent.propertyName == 'opacity' ) config.chapters[index].scrollTo( index );
		// 	// });
		// 	// btn.addClass('animate').addClass( 'collapse' );
		// 	config.chapters[index].scrollTo( index );
		// }
		config.chapters[index].scrollTo( index );
	},

	/**
	 * @name BALT.Chapters-_openChapter
	 * @class
	 * @description 
	 * @param {int} index
	 */
	_openChapter = function( index ) {
		
		// lazy load the images
		// _lazyLoadChapter( index );

		// remove closed class to open
		// config.chapters[index].$target.removeClass( 'closed' );

		// determine the previous index.  0th index doesnt have a previous chapter
		// var prevIndex = (index > 0) ? (index-1) : 0;

		// // DOM element corresponding to the next button
		// var btn = config.chapters[prevIndex].$button;

		// // collapse the next button
		// if ( index != 0 ) btn.removeClass('animate').addClass( 'collapse' );

		config.chapters[index].$target.find('.waypoint').waypoint( config.chapters[index].waypointReached, {offset:'66px'});
		$.waypoints('refresh');
		
	},

	/**
	 * @name BALT.Chapters-_lazyLoadChapter
	 * @class
	 * @description lazy load the images
	 * @param {int} index Chapter to lazy load items into
	 */
	_lazyLoadChapter = function( index ) {

		config.chapters[index].$target.find('img').each( function() {			
			if ( !$(this).hasClass( 'loaded' ) ) {
				// load via data-src attribute
				$(this).attr('src', $(this).data('src') );
				$(this).addClass('loaded');
				// load handlers
				if ( $(this)[0].complete ) {
					imageOnloadHandler( $(this) );
				} else {
					var scope = this;
					$(this).onload = function() {
						scope.imageOnloadHandler( $(scope) );
					};
				}
			}
		});

		config.chapters[index].$target.find('.bgimg').each( function() {			
			if ( !$(this).hasClass( 'loaded' ) ) {
				// this is a div!
				// load via data-src attribute
				$(this).attr('style', "background-image:url('" + $(this).data('src') + "');" );
				$(this).addClass('loaded');
				// load handlers
				if ( $(this)[0].complete ) {
					imageOnloadHandler( $(this) );
				} else {
					var scope = this;
					$(this).onload = function() {
						scope.imageOnloadHandler( $(scope) );
					};
				}
			}
		});

	},

	imageOnloadHandler = function( $target ) {
		$target.addClass('fadeIn');
		$.waypoints('refresh');
	},

	/**
	 * @name BALT.Chapters-_initialize
	 * @exports BALT.Chapters-_initialize as BALT.Chapters.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.Chapters');

		$chapters = $('.chapter');

		$chapters.each( function(){
			config.chapters[config.uid] = new _Chapter( $(this), config.uid );
			config.uid++;
		});

		config.initialized = true;
	};

	/**
	 * Prototype methods for the private _Chapter class
	 */
	_Chapter.prototype = {

		/**
		 * @name BALT.Chapters-_Chapter.trigger
		 * @function
		 * @description reveal the specified item
		 */
		trigger : function(e) {
			_gotoIndex( $(this).data('chapter').index+1 );
		},

		/**
		 * @name BALT.Chapters-_Chapter.resize
		 * @function
		 * @description Fires on window resizes.
		 * @param {object} data An object of resize data; layout, width, and layoutChanged
		 */
		resize : function(data) {
			this.$header.height(BALT.$window.height());
			this.$headerAlign.height(BALT.$window.height());
		},

		/**
		 * @name BALT.Chapters-_Chapter.scrollToNext
		 * @function
		 * @description 
		 * @param {object} index of the chapter scrolling to
		 */
		scrollTo : function( index ) {
			var scrollTo = Math.round($(this)[0].$target.offset().top); //Math.round($(this)[0].$target.find('.container').offset().top) + Math.round($(this)[0].$target.find('.container').height());
			
			var scope = this;
			$('body,html').stop(true).delay(200).animate({ 
				scrollTop: scrollTo
			}, 250, 'swing' , function() {
				scope.scrollComplete( scope.index );
			});
		},

		/**
		 * @name BALT.Chapters-_Chapter.scrollComplete
		 * @function
		 * @description when the scroll is complete
		 * @param {object} index of the chapter scrolling to
		 */
		 scrollComplete :function( index ) {
			config.chapters[index].$target.find('.waypoint').waypoint( this.waypointReached, {offset:'66px'});
			$.waypoints('refresh');

		},


		/**
		 * @name BALT.Chapters-_Chapter.waypointReached
		 * @function
		 * @description when the reaching a waypoint
		 * @param {string} direction of scroll
		 */
		waypointReached : function(direction) {
			var $active = $(this);
			if (direction === "up") {
				$active = $active.prev();
			}
			if( $active.hasClass('dark') ) {
				$('#navigation .menu-dark').addClass('hidden');
				$('#navigation .menu-light').removeClass('hidden');
			} else {
				$('#navigation .menu-dark').removeClass('hidden');
				$('#navigation .menu-light').addClass('hidden');
			}
		}

	};

	
	// public methods for this class
	return {
		initialize: _initialize,
		gotoIndex: _gotoIndex,
		openChapter: _openChapter
	};
	
}(BALT, BALT.Chapters || {}, window, undefined));