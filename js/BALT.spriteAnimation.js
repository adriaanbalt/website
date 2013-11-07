/**
 * @fileOverview BALT SpriteAnimation
 * @author <a href="mailto:adriaan@BALT.us">Adriaan Scholvinck</a>
 * @version 1.0
 */

// declare BALT in case it has not been declared yet
window.BALT = window.BALT || {};

/**
 * @name BALT.SpriteAnimation
 * @namespace The public namespace and api for sprite animation for BALT 2013.
 * @description The public namespace and api for sprite animation for BALT 2013. 
 * @requires BALT
 */
BALT.SpriteAnimation = (function(BALT, self, window, undefined){
	
	var config = {
		initialized: false,
		$target: null,
		sprites: [],
		ASPECT_RATIO: (16/9),
		FRAMES_LEN: 60,
		RESIZE_PAUSE: 350,
		FRAME_SPEED: 80
	},
	
	/**
	 * @name BALT.SpriteAnimation-_Sprite
	 * @function
	 * @description
	 * @param {object} $ele
	 */
	_Sprite = function($ele) {
		
		var sprite = this;
		this.$ele = $ele;
		this.frame = 0;
		this.pause_timer = null;
		this.anim_timer = null;
		// this.id = this.sprites.length - 1; 
		this.frames_len = this.$ele.attr('data-frames-len');
		this.aspect_ratio = this.$ele.attr('data-aspect-ratio') ? Number(this.$ele.attr('data-aspect-ratio')) : config.ASPECT_RATIO ;
		
		// set initial css
		this.setDimensions();
		this.setCss();
		
		// set up a resize handler
		this.resize_uid = RwdResize.subscribe(this.resize, this);
	},

	/**
	 * 
	 */
	_stop = function( i ) {
		if ( i == undefined ) {
			for ( var i = 0; i < config.sprites.length; i++ ){
				config.sprites[i].stop();
			}
		} else {
			config.sprites[i].stop();
		}
	},

	/**
	 * 
	 */
	_start = function( i ) {
		if ( i == undefined ) {
			for ( var i = 0; i < config.sprites.length; i++ ){
				config.sprites[i].start();
			}
		} else {
			config.sprites[i].start();
		}
	},
	
	/**
	 * @name BALT.SpriteAnimation-_initialize
	 * @exports BALT.SpriteAnimation-_initialize as BALT.SpriteAnimation.initialize
	 * @function
	 * @description
	 * @param {string} layout Layout of site on page load.
	 */
	_initialize = function($target, layout) {
		config.$target = $target;
		$target.find('.sprite-animation').each(function(){
			config.sprites.push( new _Sprite( $(this) ) );
		});
		return (config.sprites.length-1);
	};
	
	/**
	 * Prototype methods for the private _Sprite class
	 */
	_Sprite.prototype = {
			
		/**
		 * @name BALT.SpriteAnimation-_Sprite.setDimensions
		 * @function
		 * @description Using the current width of the element, return the width and height needed for the background size
		 */
		setDimensions : function() {

			var winWidth = BALT.$window.width(),
				winHeight = BALT.$window.height(),
				containerWidth,
				containerHeight,
				spriteWidth,
				useHeight = false;
			
			// first check if we should use winWidth to get the dimensions of the sprite
			if (winWidth >= winHeight) {
				containerWidth = winWidth;
				containerHeight = winWidth / config.ASPECT_RATIO;
				if (containerHeight < winHeight) useHeight = true;
			} else {
				useHeight = true;
			}
			
			// fallback if we need to use winHeight
			if (useHeight) {
				containerHeight = winHeight;
				containerWidth = winHeight * config.ASPECT_RATIO;
			}
			
			spriteWidth = containerWidth * this.frames_len;
			this.dimensions = {spriteWidth:spriteWidth, containerWidth:containerWidth, containerHeight:containerHeight};
		
		},
		
		/**
		 * @name BALT.SpriteAnimation-_Sprite.setCss
		 * @function
		 * @description Update the CSS to display the current frame properly
		 */
		setCss : function() {

			// use current frame to calculate position width
			var dims = this.dimensions,
				xPos = -dims.containerWidth * this.frame;
			
			// update css
			this.$ele.css({
				'background-size': dims.spriteWidth+'px '+dims.containerHeight+'px',
				'background-position': xPos+'px 0'
				// ,
				// 'left': this.offsetLeft + 'px'
			});
		},

		/**
		 * @name BALT.SpriteAnimation-_Sprite.goToFrame
		 * @function
		 * @description Go to the next frame in the sprite
		 */
		goToNextFrame : function() {
			this.frame++;
			if (this.frame >= this.frames_len) this.frame = 0;
			this.setCss();
		},
		
		/**
		 * @name BALT.SpriteAnimation-_Sprite.start
		 * @function
		 * @description start animating
		 */
		start : function(data) {
			var sprite = this;
			window.clearTimeout(this.pause_timer);
			window.clearInterval(this.anim_timer);
			this.anim_timer = window.setInterval(function(){
				sprite.goToNextFrame()
			}, config.FRAME_SPEED);
		},
		
		/**
		 * @name BALT.SpriteAnimation-_Sprite.start
		 * @function
		 * @description stop animating
		 */
		stop : function() {
			window.clearInterval(this.anim_timer);
			this.anim_timer = null;
		},
			
		/**
		 * @name BALT.SpriteAnimation-_Sprite.resize
		 * @function
		 * @description resize event for a sprite instance
		 * @param {object} data
		 */
		resize : function(data) {
			// stop all animation on resize
			if (this.anim_timer) {
				this.stop();
			}
			
			// reset the pause timer in case we keep resizing and resetting it
			window.clearTimeout(this.pause_timer);
			
			// update the css for this sprite element
			this.setDimensions();
			this.setCss();
			
			var sprite = this;
			// set up a new pause timer to restart animation
			this.pause_timer = window.setTimeout(function(){
				sprite.start()
			}, config.RESIZE_PAUSE);
		
		}
			
	};
	
	// public methods for this class
	return {
		initialize: _initialize,
		start: _start,
		stop: _stop
	};

}(BALT, BALT.SpriteAnimation || {}, window, undefined));