/**
 * @fileOverview BALT Reel
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Reel
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.Reel = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		items: [],
		uid: 0,
		playing: false
	},

	/**
	 * @name BALT.Reel-_Reel
	 * @class
	 * @description Constructor for a Reel instance.
	 * @param {object} $target jQuery object of the DOM element we want to create a Reel
	 * @param {string} index
	 */
	_Reel = function($target) {

		this.$mainVideo = $target.find('.main-vid');
		this.$teaserVideo = $target.find('.teaser');
		this.$slogan = $target.find('.slogan');
		this.$cover = $target.find('.cover');
		this.$playpause = $target.find('.playpause');

		this.$playpause.on( 'mouseover', this.mouseover );
		this.$playpause.on( 'mouseout', this.mouseout );
		this.$slogan.find('.play-btn').on( 'click', this.playReel );
		this.$playpause.find('.play-btn').on( 'click', this.playVideoBtn );
		this.$playpause.find('.pause-btn').on( 'click', this.pauseVideo );

		this.$slogan.data('reel', this);
		this.$slogan.find('.play-btn').data('reel', this);
		this.$playpause.data('reel', this);
		this.$playpause.find('.play-btn').data('reel', this);
		this.$playpause.find('.pause-btn').data('reel', this);
		
		// subscribe to the resize and scroll events for this video
		this.resize_uid = RwdResize.subscribe(this.resize, this);
		this.resize();
	},

	/**
	 * @name BALT.Reel-_initialize
	 * @exports BALT.Reel-_initialize as BALT.Reel.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.Reel');

		$('.videos-layer').each( function(){
			config.items[config.uid] = new _Reel( $(this) );
			config.uid++;
		});
		
		config.initialized = true;
	};

	/**
	 * Prototype methods for the private _Reel class
	 */
	_Reel.prototype = {
		/**
		 * @name BALT.Reel-_playReel
		 * @function
		 * @description
		 */
		playReel : function(e) {

			$(this).data('reel').player = BALT.VideosVimeo.getVideoByID( $(this).data('reel').$mainVideo.attr('id') );
			// $(this).data('reel').player.play();

			// videoInstance.on( "ended", this.ending );
			// $(this).data('reel').resize();

			// fade out teaser
			// $(this).data('reel').$slogan.animate({
			// 	'opacity':0
			// }, 500, function() {
			// 	$(this).addClass('hidden');
			// 	// start reel video
			// 	$(this).data('reel').playVideo();
			// });

			// $(this).data('reel').$cover.animate({
			// 	'opacity':0
			// }, 500, function() {
			// 	$(this).addClass('hidden');
			// });

			$(this).data('reel').playVideo();
		},

		playVideoBtn : function(e) {
			config.playing = true;
			$(this).data('reel').player.play();
			$(this).data('reel').$playpause.find('.play-btn').removeClass('show').addClass('hidden');
			$(this).data('reel').$playpause.find('.pause-btn').removeClass('show').removeClass('hidden');
		},

		playVideo : function(e) {
			this.player.play();
			config.playing = true;
			this.$playpause.find('.play-btn').removeClass('show').addClass('hidden');
			this.$playpause.find('.pause-btn').removeClass('show').removeClass('hidden');
		},

		pauseVideo : function(e) {
			config.playing = false;
			$(this).data('reel').$playpause.find('.play-btn').addClass('show').removeClass('hidden');
			$(this).data('reel').$playpause.find('.pause-btn').removeClass('show').addClass('hidden');
			$(this).data('reel').player.pause();
		},

		ending : function(e) {
			config.playing = false;

			this.$slogan.removeClass('hidden').animate({
				'opacity':1
			}, 500, function() {
			});

			this.$cover.removeClass('hidden').animate({
				'opacity':1
			}, 500, function() {
			});
		},

		pausing : function() {
			config.playing = false;
			this.scope.$playpause.find('.play-btn').addClass('show').removeClass('hidden');
			this.scope.$playpause.find('.pause-btn').removeClass('show').addClass('hidden');
		},

		/**
		 * @name BALT.Reel-_mouseover
		 * @function
		 * @description show and hide play/pause buttons on rollover
		 */
		mouseover : function(e) {
			if ( config.playing ) {
				$(this).data('reel').$playpause.find('.pause-btn').addClass('show');
			} else {
				$(this).data('reel').$playpause.find('.play-btn').addClass('show');
			}

			var here = this;
			// trigger timeout to hide play/pause
			window.clearInterval(this.hover_timer);
			this.hover_timer = window.setInterval(function(){
				$(here).data('reel').$playpause.clearQueue().animate({
					'opacity':0
				}, 200, function() {
				});
			}, 1000 );
		},

		/**
		 * @name BALT.Reel-_mouseout
		 * @function
		 * @description show and hide play/pause buttons on rollover
		 */
		mouseout : function(e) {
			if ( config.playing ) {
				$(this).data('reel').$playpause.find('.pause-btn').removeClass('show');
			} else {
				$(this).data('reel').$playpause.find('.play-btn').removeClass('show');
			}
			window.clearInterval(this.hover_timer);
			$(this).data('reel').$playpause.clearQueue().animate({
				'opacity':1
			}, 100, function() {
			});
		},

		/**
		 * @name BALT.Reel-_Reel.resize
		 * @function
		 * @description Fires on window resizes.
		 * @param {object} data An object of resize data; layout, width, and layoutChanged
		 */
		resize : function(data) {
			var windowW = BALT.$window.width();
			var windowH = BALT.$window.height();
			
			this.$playpause.width( windowW );
			this.$playpause.height( windowH );
		}
	};

	
	// public methods for this class
	return {
		initialize: _initialize
	};
	
}(BALT, BALT.Reel || {}, window, undefined));