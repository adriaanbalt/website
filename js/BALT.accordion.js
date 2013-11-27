/**
 * @fileOverview BALT Accordion
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Accordion
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Accordion = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		items: [],
		uid: 0
	},

	/**
	 * @name BALT.Accordion-_Accordion
	 * @class
	 * @description Constructor for an accordion instance.
	 * @param {object} $target jQuery object of the DOM element we want to create an accordion
	 * @param {string} index
	 */
	_Accordion = function($target, index) {
		var accordion = this, 
			$button = $target.find('.button');
		
		this.$target = $target;
		this.$button = $button;
		this.$content = $target.find('.content');
		this.index = index;

		this.$button.on('click', this.trigger);

		// subscribe to the resize and scroll events
		this.resize_uid = RwdResize.subscribe(this.resize, this);

		this.$button.data('accordion', this);
		this.$target.data('accordion', this);
	},

	/**
	 * @name BALT.Accordion-_index
	 * @class
	 * @description 
	 * @param {integer} index
	 */
	_index = function( index ) {
		$.waypoints('refresh');
		// TODO must set the next scrollTop position to be based on the section you are going to
		var prevIndex = 0;
		scrollTop = config.items[prevIndex].$target.offset().top;
		if ( index != 0 ){
			prevIndex = index - 1;
			scrollTop = $('.casestudies').offset().top  + (296*index);// config.items[index].$target.height();
			console.log ( "$('.casestudies').offset().top : ", $('.casestudies').offset().top  );
		}

		config.items[index].open();
		for ( var i=0; i < config.items.length; i++ ){
			// close itemss
			if ( i != index ) {
				config.items[i].close();
			}
		}

		$( 'body,html' ).stop().animate({ 
			scrollTop: scrollTop
		}, 500, 'swing' ,function(e) {
			// config.items[index].$content.height( 'auto' );
		});
	},

	/**
	 * @name BALT.Accordion-_initialize
	 * @exports BALT.Accordion-_initialize as BALT.Accordion.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.Accordion');

		$accordion = $('.accordion');
		$items = $('.accordion article');

		$items.each( function(){
			config.items[config.uid] = new _Accordion( $(this), config.uid );
			config.uid++;
		});

		config.initialized = true;
	};

	/**
	 * Prototype methods for the private _Accordion class
	 */
	_Accordion.prototype = {

		/* @name BALT.Accordion-_Accordion.trigger
		 * @function
		 * @description reveal the specified item
		 */
		trigger : function(e) {
			_index( $(this).data('accordion').index );
		},

		/* @name BALT.Accordion-_Accordion.open
		 * @function
		 * @description reveal the specified item
		 */
		open : function(e) {
			var scope = this;
			this.$button.addClass('fadeOut');
			this.$content.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
				scope.$button.addClass('hidden');
			});
			this.$content.addClass('animate');
			this.$content.height( this.$target.find('.me').height() );
			this.$content.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e){
				scope.$target.addClass('open');
			});
			// load video
			// this.video = BALT.VideosVimeo.getVideoByID( this.$target.find('.video-player').attr('id') );
		},

		/* @name BALT.Accordion-_Accordion.close
		 * @function
		 * @description close the specified item
		 */
		close : function(e) {
			this.$button.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			this.$button.removeClass('fadeOut');
			this.$button.removeClass('hidden');
			
			this.$content.removeClass('animate');
			this.$content.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
			this.$target.removeClass('open');
			this.$content.height( 0 );
			// pause video if playing
			// BALT.VideosVimeo.getVideoByID( this.$target.find('.video-player').attr('id') ).pause();
		},
		
		/**
		 * @name BALT.Accordion-_Accordion.close
		 * @function
		 * @description Fires on window resizes.
		 * @param {object} data An object of resize data; layout, width, and layoutChanged
		 */
		resize : function(data) {
			// var accordion = this;
			// accordion.$accordion.height()
			// this.$target.hasClass('open') ? this.$content.height( this.$content.find('.me').height() ) : false;
			// console.log ( this.$target, this.$content.find('.me').height(), this.$content.height() );
		}

	};

	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.Accordion || {}, window, undefined));