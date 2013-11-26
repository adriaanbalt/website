/**
 * Copyright (C) 2011 by Paul Lewis
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * Credit to Paul Truong for the idea that inspired me: 
 * http://www.monocubed.com/2010/10/29/make3d-native-drag-drop-in-browser/
 *
 * And HTML5Doctor for the DnD code tutorial:
 * http://html5doctor.com/native-drag-and-drop/
 */
var AEROTWIST = AEROTWIST || {};
AEROTWIST.PhotoParticles = new function()
{
	// internal vars
	var camera,
		scene,
		renderer,
		mode,
		image,
		canvas,
		context,
		redCentre,
		greenCentre,
		blueCentre,
		colors,
		particleSystem,
		particles		= [],
		orbitValue		= 0,
		holdAtOrigin	= true,
		orbitCamera		= false,
		bounceParticles	= false,
		$container 		= $('#container'),
		$gui			= $('#gui'),
		
	// constants
		ORBIT_RATE		= 0.01,
		ATTRACT			= 0,
		REPEL			= 1,
		WIDTH			= $container.width(),
		HEIGHT			= $container.height(),
		DENSITY			= 0,
		NEAR			= 1,
		FAR				= 10000,
		CENTRE_MASS		= 5,
		AGGRESSION		= 20,
		DEPTH			= Math.max(WIDTH, HEIGHT);
	
	/**
	 * Initializes the experiment and kicks
	 * everything off. Yay!
	 */
	this.init = function()
	{
		// set to attract mode
		mode						= ATTRACT;
		
		// set up the canvas, camera and scene
		canvas						= document.createElement('canvas');
		canvas.width				= 600;
		canvas.height				= 600;
		
		// the canvas is only used to analyse our pic
		context						= canvas.getContext('2d');
		camera 						= new THREE.Camera(45, WIDTH / HEIGHT, NEAR, FAR);
	    scene 						= new THREE.Scene();
	    renderer 					= new THREE.WebGLRenderer();
	    
	    // start the renderer
	    renderer.setSize(WIDTH, HEIGHT);
	    $container.append(renderer.domElement);
	    
	    // add lights
		addLights();
		
	    // add listeners
	    addEventListeners();

	    // start rendering, which will
	    // do nothing until the image is dropped
	    update();

	    callbacks.densityHigh();
	};
	
	/**
	 * Sets up the event listeners for DnD, the GUI
	 * and window resize
	 */
	function addEventListeners()
	{
		// container DnD event
		var container = $container[0];
		container.addEventListener('dragover', cancel, false);
		container.addEventListener('dragenter', cancel, false);
		container.addEventListener('dragexit', cancel, false);
		container.addEventListener('drop', dropFile, false);
		
		// gui events - I did these
		// brute force, but there's a ton
		// of improvement that *could* be 
		// done here.
		
		$("#camera-orbit-on").click(callbacks.orbitCameraOn);
		$("#camera-orbit-off").click(callbacks.orbitCameraOff);
		$("#camera-orbit-on").trigger('click');
		
		// window event
		$(window).resize(callbacks.windowResize);
	}
	
	/**
	 * Handles when a file is dropped by
	 * the user onto the container
	 */
	function dropFile(event)
	{
		// stop the browser doing
		// it's normal thing of going
		// to the item
		event.stopPropagation();
		event.preventDefault();
		
		// query what was dropped
		var files = event.dataTransfer.files;
		console.log ( 'test ', files );
		
		// if we have something
		if(files.length) {
			handleFile(files[0]);
		}
		
		return false;
	}
	
	/**
	 * Handles the uploaded file
	 */
	function handleFile(file)
	{
		var fileReader 			= new FileReader();
		fileReader.onloadend	= fileUploaded;
		fileReader.readAsDataURL(file);
	}
	
	/**
	 * File upload handled
	 */
	function fileUploaded(event)
	{
		// remove any particles
		// if our image already
		// has some
		if(image) {
			removeParticles();
		}

		// check it's an image
		if(event.target.result.match(/^data:image/))
		{
		    $container.addClass('live');
		    $gui.addClass('live');
		    
			// create a new image
			image 		= document.createElement('img');
			image.src 	= event.target.result;
			
			// give the browser chance to
			// create the image object
			setTimeout(function(){
				
				// split the image
				addParticles();
				
			}, 100);
		}
		else
		{
			// time to whinge
			alert("Umm, images only? ... Yeah");
		}
	}
	
	/**
	 * Simple handler function for 
	 * the events we don't care about
	 */
	function cancel(event)
	{
		if(event.preventDefault)
			event.preventDefault();
		
		return false;
	}
	
	/**
	 * Adds some basic lighting to the
	 * scene. Only applies to the centres
	 */
	function addLights()
	{
		// point
		pointLight = new THREE.PointLight( 0xFFFFFF );
		pointLight.position.x = 300;
		pointLight.position.y = 300;
		pointLight.position.z = 600;
		scene.addLight( pointLight );
		
		// directional
		directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
		directionalLight.position.x = -.5;
		directionalLight.position.y = -1;
		directionalLight.position.z = -.5;
		directionalLight.position.normalize();
		directionalLight.intensity = .6;
		scene.addLight( directionalLight );
	}
	
	/**
	 * Kills off the particles, wipes the
	 * canvas clean and does a bit of gc
	 */
	function removeParticles()
	{
		scene.removeChild(particleSystem);
		particleSystem = null;
		context.clearRect(0,0,600,600);
	}
	
	/**
	 * Adds the particles to the scene
	 * based on the image that has been
	 * last uploaded
	 */
	function addParticles()
	{
		// draw in the image, and make sure it fits the canvas size :)
		var ratio			= 1 / Math.max(image.width/600, image.height/600);
		var scaledWidth		= image.width * ratio;
		var scaledHeight	= image.height * ratio;
		context.drawImage(image,
							0,0,image.width,image.height,
							(600 - scaledWidth) * .5, (600 - scaledHeight) *.5, scaledWidth, scaledHeight);
		
		// now set up the particle material
		var material 	= new THREE.ParticleBasicMaterial( { blending: THREE.BillboardBlending, map: ImageUtils.loadTexture("images/particle.png"), size: DENSITY * 1, opacity: 1, vertexColors:true, sizeAttenuation:true } );
		var geometry	= new THREE.Geometry();
		var pixels		= context.getImageData(0,0,WIDTH,HEIGHT);
		var step		= DENSITY * 4;
		var x = 0, y = 0;
		
		// go through the image pixels
	    for(x = 0; x < WIDTH * 4; x+= step)
	    {
	    	for(y = HEIGHT; y >= 0 ; y -= DENSITY)
	    	{
	    		var p = ((y * WIDTH * 4) + x);
	    		
	    		// grab the actual data from the
	    		// pixel, ignoring any transparent ones
	    		if(pixels.data[p+3] > 0)
			    {
			    	var pixelCol	= (pixels.data[p] << 16) + (pixels.data[p+1] << 8) + pixels.data[p+2];
			    	var color 		= new THREE.Color(pixelCol);
			    	var vector 		= new THREE.Vector3(-300 + x/4, 240 - y, 0);
			    	
			    	// push on the particle
			    	geometry.vertices.push(new THREE.Vertex(vector));
			    	geometry.colors.push(color);
			    }
	    	}
	    }
	    
	    // now create a new system
	    particleSystem 	= new THREE.ParticleSystem(geometry, material);
	    particleSystem.sortParticles = false;
	    
	    // grab a couple of cacheable vals
	    particles		= particleSystem.geometry.vertices;
		colors			= particleSystem.geometry.colors;
		
		// add some additional vars to the
		// particles to ensure we can do physics
		// and so on
		var ps = particles.length;
		while(ps--)
		{
			var particle 		= particles[ps];
			particle.velocity	= new THREE.Vector3();
			particle.mass		= 5;
			particle.origPos	= particle.position.clone();
		}
		
		// gc and add
		pixels = null;
		scene.addObject(particleSystem);
	}
	
	/**
	 * Updates the velocity and position
	 * of the particles in the view
	 */
	function update()
	{
		var ps = particles.length;	
		while(ps--)
		{
			var particle 		= particles[ps];
			
			// if we are holding at the origin
			// values, tween the particles back
			// to where they should be
				particle.velocity 	= new THREE.Vector3();
				particle.position.x += (particle.origPos.x - particle.position.x) * .2;
				particle.position.y += (particle.origPos.y - particle.position.y) * .2;
				particle.position.z += (particle.origPos.z - particle.position.z) * .2;
		}
		
		// if we are panning the camera round
		// do that now
		if(orbitCamera)
		{
			camera.position.x = Math.sin(orbitValue) * DEPTH;
			camera.position.y = Math.sin(orbitValue) * 300;
			camera.position.z = Math.cos(orbitValue) * DEPTH;
			// orbitValue += ORBIT_RATE;
		}
		
		// set up a request for a render
		requestAnimationFrame(render);
	}
	
	/**
	 * Renders the current state
	 */
	function render()
	{
		// only render if we have
		// an active image
		if(image) {
			renderer.render( scene, camera );
		}
		
		// set up the next frame
		update();
	}
	
	/**
	 * Our internal callbacks object - a neat
	 * and tidy way to organise the various
	 * callbacks in operation.
	 * 
	 * Note: this could do with some optimising
	 * because of the repetition.
	 */
	callbacks = {
		holdAtOriginOn: function() {
			holdAtOrigin = true;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		holdAtOriginOff: function() {
			holdAtOrigin = false;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		orbitCameraOn: function() {
			orbitCamera = true;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		orbitCameraOff: function() {
			orbitCamera = false;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		modeAttract: function() {
			mode = ATTRACT;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		modeRepel: function() {
			mode = REPEL;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		bounceParticlesOn: function() {
			bounceParticles = true;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		bounceParticlesOff: function() {
			bounceParticles = false;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		densityLow: function() {
			DENSITY = 7;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			
			if(image) {
				removeParticles();
				addParticles();
			}
			return false;
		},
		densityMedium: function() {
			DENSITY = 5;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			if(image) {
				removeParticles();
				addParticles();
			}
			return false;
		},
		densityHigh: function() {
			DENSITY = 1;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			if(image) {
				removeParticles();
				addParticles();
			}
			return false;
		},
		strength1: function() {
			AGGRESSION = 1;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		strength2: function() {
			AGGRESSION = 10;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		strength3: function() {
			AGGRESSION = 20;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		strength4: function() {
			AGGRESSION = 35;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		strength5: function() {
			AGGRESSION = 50;
			$(this).removeClass('disabled');
			$(this).siblings('a').addClass('disabled');
			return false;
		},
		windowResize: function() {
			
			WIDTH			= $container.width(),
			HEIGHT			= $container.height(),
			camera.aspect 	= WIDTH / HEIGHT,
			renderer.setSize(WIDTH, HEIGHT);
			
			camera.updateProjectionMatrix();
		}
	};
};

// Split photos to particles...?
$(document).ready(function(){
	
	if(Modernizr.webgl) {
		// Go!
		AEROTWIST.PhotoParticles.init();
	}
});