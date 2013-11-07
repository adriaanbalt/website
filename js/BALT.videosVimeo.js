/**
 * @fileOverview BALT Video
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.Video
 * @namespace The public namespace and api for the info box and social links.
 * @description The public namespace and api for the info box and social links. 
 * @requires BALT
 */
BALT.VideosVimeo = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		items: [],
		videos: [],
		uid: 0,
		videoActive: false
	},

	/**
	 * @name BALT.VideosVimeo-_VideosVimeo
	 * @class
	 * @description Constructor for an Video instance.
	 * @param {object} $target jQuery object of the DOM element we want to create an Video
	 * @param {string} index
	 */
	_VideosVimeo = function($target, uid) {
		
		var vimeoVideo = this,
			$video = $target.find('.video-player').first(),
			$button = $target.find('.control-btn'),
			$cover = $target.find('.cover'),
			$slogan = $target.find('.slogan'),
			$playpause = $target.find('.playpause');
		
		this.$target = $target;
		this.$video = $video;
		this.$button = $button;
		this.$cover = $cover;
		this.$playpause = $playpause;
		this.$slogan = $slogan;
		this.uid = uid;

		// instantiate the video player
		videojs.options.flash.swf = "video-js.swf";

		this.$slogan.data('video', this);
		this.$slogan.find('.play-btn').data('video', this);
		this.$playpause.data('video', this);
		this.$playpause.find('.play-btn').data('video', this);
		this.$playpause.find('.pause-btn').data('video', this);
		
		this.$slogan.find('.play-btn').on( 'click', this.toggle );
		this.$playpause.on( 'mouseover', this.mouseover );
		this.$playpause.on( 'mouseout', this.mouseout );
		this.$playpause.find('.play-btn').on( 'click', this.toggle );
		this.$playpause.find('.pause-btn').on( 'click', this.toggle );
		
		// subscribe to the resize and scroll events for this video
		this.resize_uid = RwdResize.subscribe(this.resize, this);
		this.resize();

		this.$target.data('video', this);
		this.$video.data('video', this);
		this.$button.data('video', this);

		$target.find('.video-player').each( function() {
			if ( $(this).data('autoplay') ) {
				var vidObj = {
					src : $(this).data('src'),
					preload : $(this).data('preload') ,
					loop : $(this).data('loop'),
					muted : $(this).data('muted'),
					autoplay : $(this).data('autoplay'),
					id : $(this).attr('id')+"-vid"
				},
				player;

				$(this).html(
					_.template( $( "#video-template" ).html(), {data:vidObj} )
				);
				new _AutoPlayElement( $(this ) );
			}
		});

	},

	_AutoPlayElement = function( $target ) {
		
		this.$target = $target;

		this.player = $f( $target.find('iframe')[0] );
		// When the player is ready, add listeners for pause, finish, and playProgress
		this.player.addEvent('ready', this.ready);

		// subscribe to the resize and scroll events for this video
		this.resize_uid = RwdResize.subscribe(this.resize, this);
		this.resize();

	},

	/**
	 * @name BALT.VideosVimeo-_triggerTeaser
	 * @exports BALT.VideosVimeo-_triggerTeaser as BALT.Video.triggerTeaser
	 * @function
	 * @description triggers the teaser video to pl
	 */
	_triggerTeaser = function() {

	},

	/**
	 * @name BALT.VideosVimeo-_pauseAll
	 * @exports BALT.VideosVimeo-_pauseAll as BALT.Video.pauseAll
	 * @function
	 * @description pauses all videos
	 */
	_pauseAll = function() {
		for ( var i = 0 ; i < config.videos.length; i++ ){
			config.videos[i].pause();
		}
	},

	/**
	 * @name BALT.VideosVimeo-_unloadAll
	 * @exports BALT.VideosVimeo-_unloadAll as BALT.Video.unloadAll
	 * @function
	 * @description unloads all videos
	 */
	_unloadAll = function() {
		for ( var i = 0 ; i < config.videos.length; i++ ){
			config.videos[i].unload();
		}
	},

	/**
	 * @name BALT.VideosVimeo-_getVideoByID
	 * @exports BALT.VideosVimeo-_getVideoByID as BALT.Video.getVideoByID
	 * @function
	 * @description get a video based on an id
	 * @param {id} id of video returned
	 */
	_getVideoByID = function( id ) {
		return config.items[id];
	},

	/**
	 * @name BALT.VideosVimeo-_initialize
	 * @exports BALT.VideosVimeo-_initialize as BALT.Video.initialize
	 * @function
	 * @description
	 * @param {layout} responsive layout 
	 */
	_initialize = function(layout) {
		
		if (config.initialized) return;
		
		console.log('BALT.VideosVimeo');
		
		$('.video-viewport').each( function(){
			config.videos[config.uid] = config.items[$(this).find('.video-player').attr('id')] = new _VideosVimeo( $(this), $(this).find('.video-player').attr('id') );
			config.uid++;
		});


		config.initialized = true;
	};

	_AutoPlayElement.prototype = {

		ready : function ( player_id ) {
			$f(player_id).api('setVolume', 0);
			$f(player_id).api('play');
			$f(player_id).api('setLoop', 1);
		},

		resize : function(data) {

			var windowW = BALT.$window.width();
			var windowH = BALT.$window.height();
			var windowAspect = windowW/windowH;
			var mediaAspect = 16/9;
			
			if (windowAspect < mediaAspect) {
				// taller
				this.$target
					.css('top',0)
					.css('left',-( windowH * mediaAspect - windowW ) / 2 )
					.css('height',windowH);
			} else {
				this.$target
					.css('top',-( windowW / mediaAspect - windowH ) / 2 )
					.css('left',0)
					.css('height',windowW/mediaAspect);
			}
		}
	},

	/**
	 * Prototype methods for the private _VideosVimeo class
	 */
	_VideosVimeo.prototype = {

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.play
		 * @function
		 * @description plays the video 
		 */
		play : function() {
			
			// unload all previous instances of video players from the DOM
			_unloadAll();
				
			// make sure only one video is on the page at one time
			if ( !this.player ){
				
				// create video object to be injected into the DOM with underscore template
				var vidObj = {
					src : this.$video.data('src'),
					preload : this.$video.data('preload'),
					loop : this.$video.data('loop'),
					muted : this.$video.data('muted'),
					autoplay : this.$video.data('autoplay'),
					id : this.$video.attr('id')+"-vid"
				};


				this.$video.html(
					_.template( $( "#video-template" ).html(), {data:vidObj} )
				);
				
				var iframe = this.$video.find('iframe')[0],
					scope = this;

				this.player = $f(iframe);

				// When the player is ready, add listeners for pause, finish, and playProgress
				this.player.addEvent('ready', function() {
					scope.player.api('play');
					scope.player.addEvent('finish', scope.ending);
					// scope.player.addEvent('playProgress', scope.onPlayProgress);
				});

			}

			this.resize();

			_gaq.push(['_trackEvent', 'Video Play', this.$video.attr('id')]);

			// add class playing
			this.$target.addClass('playing').removeClass('paused');

			this.$slogan.clearQueue().animate({
				'opacity':0
			}, 500, function() {
				$(this).addClass('hidden');
				// start reel video
			});

			this.$cover.clearQueue().animate({
				'opacity':0
			}, 500, function() {
				$(this).addClass('hidden');
			});

			config.videoActive = this.playState = true;

			this.player.api('play');

			return this.player;
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.pause
		 * @function
		 * @description pause the video
		 */
		pause : function() {
			config.videoActive = this.playState = false;
			// add class paused
			this.$target.addClass('paused').removeClass('playing');
			// pause video
			if ( this.player ) this.player.api('pause');

			return this.player;
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.toggle
		 * @function
		 * @description toggle the video on and off
		 * @param {object} event
		 */
		toggle : function(e) {
			config.videoActive = !config.videoActive;
			config.videoActive ? $(this).data('video').play() : $(this).data('video').pause();
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.hover
		 * @function
		 * @description hover the video
		 * @param {object} event
		 */
		hover : function(e) {
			if ( this.playState ){
				$(this).data('video').$playpause.find('.pause-btn').hasClass('show') ? 

				$(this).data('video').$playpause.find('.pause-btn').removeClass('show') : 

				$(this).data('video').$playpause.find('.pause-btn').addClass('show');
			} else {
				$(this).data('video').$playpause.find('.play-btn').hasClass('show') ? 

				$(this).data('video').$playpause.find('.play-btn').removeClass('show') : 

				$(this).data('video').$playpause.find('.play-btn').addClass('show');
			}
			$(this).data('video').$playpause.clearQueue().animate({
				'opacity':1
			}, 0, function() {
			});
			var here = this;
			// trigger timeout to hide play/pause
			window.clearInterval(this.hover_timer);
			this.hover_timer = window.setInterval(function(){
				$(here).data('video').$playpause.clearQueue().animate({
					'opacity':0
				}, 200, function() {
				});
			}, 1000 );
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.resize
		 * @function
		 * @description Fires on window resizes.
		 * @param {object} data An object of resize data; layout, width, and layoutChanged
		 */
		resize : function(data) {

			if ( this.$target.find('.fullbrowser').length > 0 ){
				var windowW = BALT.$window.width();
				var windowH = BALT.$window.height();
				var windowAspect = windowW/windowH;
				var mediaAspect = 16/9;
				
				if (windowAspect < mediaAspect) {
					// taller
					this.$target
						.width(windowH*mediaAspect)
						.height(windowH);
					this.$target.find('.fullbrowser')
						.width(windowH*mediaAspect)
						.height(windowH);
					this.$video
						.css('top',0)
						.css('left',-( windowH * mediaAspect - windowW ) / 2 )
						.css('height',windowH);
					this.$target.find('.slogan')
						.css('left',-( windowH * mediaAspect - windowW ) / 2 );
				} else {
					this.$target
						.width(windowW)
						.height(windowW/mediaAspect);
					this.$target.find('.fullbrowser')
						.width(windowW)
						.height(windowW/mediaAspect);
					this.$video
						.css('top',-( windowW / mediaAspect - windowH ) / 2 )
						.css('left',0)
						.css('height',windowW/mediaAspect);
					this.$target.find('.slogan')
						.css('left',0)
				}
			}
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.unload
		 * @function
		 * @description unloads the video 
		 */
		unload : function() {
			this.$target.find('.slogan').removeClass('hidden').animate({
				'opacity':1
			}, 500, function() {
			});

			this.$cover.removeClass('hidden').animate({
				'opacity':1
			}, 500, function() {
			});

			config.videoActive = false;
			if ( this.player ) this.player.api('pause');
			// this.player = null;
		},

		/**
		 * @name BALT.Reel-_mouseover
		 * @function
		 * @description show and hide play/pause buttons on rollover
		 */
		mouseover : function(e) {
			if ( $(this).data('video').playState ) {
				$(this).data('video').$playpause.find('.pause-btn').addClass('show');
			} else {
				$(this).data('video').$playpause.find('.play-btn').addClass('show');
			}
			
			$(this).data('video').$playpause.clearQueue().animate({
				'opacity':1
			}, 100, function() {
			});

			var here = this;
			// trigger timeout to hide play/pause
			window.clearInterval(this.hover_timer);
			this.hover_timer = window.setInterval(function(){
				$(here).data('video').$playpause.clearQueue().animate({
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
			if ( $(this).data('video').playState ) {
				$(this).data('video').$playpause.find('.pause-btn').removeClass('show');
			} else {
				$(this).data('video').$playpause.find('.play-btn').removeClass('show');
			}
			window.clearInterval(this.hover_timer);
			$(this).data('video').$playpause.clearQueue().animate({
				'opacity':1
			}, 100, function() {
			});
		},

		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.load
		 * @function
		 * @description loads the video 
		 */
		load : function() {

			//load video
			this.player.load();

			return this.player;
		},
		
		/**
		 * @name BALT.VideosVimeo-_VideosVimeo.ending
		 * @function
		 * @description
		 */
		ending : function(e) {
			$("#"+e).parent().data('video').unload();
		}
	};

	// public methods for this class
	return {
		initialize: _initialize,
		getVideoByID: _getVideoByID,
		pauseAll: _pauseAll,
		unloadAll: _unloadAll
	};
	
}(BALT, BALT.Video || {}, window, undefined));