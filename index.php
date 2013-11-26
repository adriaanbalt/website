<?php 
	if ( strrpos($_SERVER['SERVER_NAME'], "www.balt.us") != false) {
		$env = 'PROD';
	} else {
		$env = 'DEV';
	}
?>
<!DOCTYPE html>

<!--- YOU CAN DOWNLOAD THE CODE FOR THIS WEBSITE HERE ... WWW.GITHUB.COM/adriaanbalt/website -->

<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>BALT</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=640,user-scalable=no">
		<link rel="shortcut icon" href="favicon.ico" >

		<?php if ($env == 'PROD') { ?>
		<link rel="stylesheet" href="css/BALT.min.css">
		<?php } else { ?>
		<link rel="stylesheet" href="css/normalize.css">
		<link rel="stylesheet" href="css/screen.css">
		<?php } ?>

		<script src="js/data.json"></script>
		<script src="js/lib/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	</head>
	<body class="noScroll">
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrxade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		<![endif]-->

		<div id="content">
			
			<div id="intro">
				<span class="align"></span>
				<div class="vcenter">
					<div class="logo"></div>
				</div>
			</div>

			<header class="waypointDest dark">
				<span class="align"></span>
				<div class="vcenter">
					<div class="logo"></div>
				</div>
			</header>

			<section>
				<!--- quick reference to contact and social media -->
			</section>

			<section data-id="casestudies" class="casestudies chapter waypointDest dark">

				<div class="accordion waypointDest dark">
					<article id="<%= study.id %>" class="waypointDest dark">
						<a class="button" href="javascript:void(0);">
							<div style="background-image: url( '<%= study.button.bg %>' );"></div>
							<h4><%= study.button.copy %></h4>
							<img src='study.button.preview'/> // TODO add parallax to this item
						</a>
						<div class="content">
							<div class="panels clearfix">
								<div class="panel ratio16_9 video-viewport">
									<a href="javascript:void(0);" class="control-btn inside">
										<div class="cover">
											<div class='slogan'>
												<span class="align"></span>
												<div class="vcenter">
													<div class="play-btn"></div>
													<h4><%= panel.video.headline %></h4>
													<h2><%= panel.video.copy %></h2>
												</div>
											</div>
											<img data-src="<%= panel.video.cover %>"/>
										</div>
									</a>
								</div>
								<div class="panel half ratio4_3 <%= panel.device %>">
									<div class="inside">
										<img data-src="<%= panel.image %>"/>
									</div>
								</div>
								<div class="panel half ratio4_3 <%= panel.device %>">
									<div class="inside">
										<span class="align"></span>
										<div class="copy">
											<h5><%= panel.header %></h5>
											<p><%= p %></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</article>
				</div>

			</section>

			<section data-id="portfolio" class="portfolio chapter waypointDest light">
				
				<ul>
					<li class='circle'>
						<img src=''/>
						<p></p>
					</li>
				</ul>

			</section>

			<footer class="waypointDest light">
				
				<div class="wrapper-small">
					<ul>
						<li style="background-image: url( '<%= data.bg-image %>' );">
							<a href="<%= item.url %>" target="_blank"><h2><%= item.link %></h2></a>
						</li>
					</ul>
					<h3 class='inner'>You may have missed something so...</h3>
				</div>

			</footer>

		</div> <!-- #content -->

		<?php if ($env == 'PROD') { ?>
		<script src="js/BALT.min.js"></script>
		<?php } else { ?>	
		<script src="js/lib/jquery-1.8.3.js"></script>
		<script src="js/lib/froogaloop.js"></script>
		<script src="js/lib/jquery.history.js"></script>
		<script src="js/lib/requestAnimationFrame.js"></script>
		<script src="js/lib/pubSub.js"></script>
		<script src="js/lib/rwdResize.js"></script>
		<script src="js/lib/scroll.js"></script>
		<script src="js/lib/video.dev.js"></script>
		<script src="js/lib/underscore.js"></script>
		<script src="js/lib/jquery.appear.js"></script>
		<script src="js/lib/waypoints.js"></script>
		<script src="js/BALT.js"></script>
		<script src="js/BALT.accordion.js"></script>
		<script src="js/BALT.chapters.js"></script>
		<script src="js/BALT.history.js"></script>
		<script src="js/BALT.intro.js"></script>
		<script src="js/BALT.nav.js"></script>	
		<script src="js/BALT.reel.js"></script>	
		<script src="js/BALT.templates.js"></script>
		<script src="js/BALT.videosVimeo.js"></script>
		<?php } ?>

		<script>videojs.options.flash.swf = "video-js.swf";</script>

		<script type="text/template" id="video-template">
			<div class='videoplayer'>
				<iframe id="<%= data.id %>" src="http://player.vimeo.com/video/<%= data.src %>?api=1&player_id=<%= data.id %>" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
			</div>
		</script>

		<script type="text/template" id="awards-template">
			<section class="paragraph waypointDest light">
				<div class="wrapper-small">
					<h3 class='inner'><%= block.header %></h3>
					<ul>
						<% _.each(block.press, function(item,key,list){ %>
							<li>
								<a href="<%= item.link %>" target="_blank"><h2><%= item.article %></h2></a>
								<h1><%= item.source %></h1>
								<img data-src="<%= item.image %>"/>
							</li>
						<%});%>
					</ul>
				</div>
			</section>
		</script>

		<script type="text/template" id="paragraph-template">
			<section class="paragraph waypointDest light">
				<div class="wrapper-small">
					<div class='inner'>
						<% if (data.header) { %>
							<h3><%= data.header %></h3>
						<% } %>
						<% _.each( data.paragraph, function(p,key,list){ %>
							<p><%= p %></p>
						<%});%>
					</div>
				</div>
			</section>
		</script>

		<script type="text/template" id="accordion-template">
			<section data-id="<%= data.name.toLowerCase() %>" class="<%= data.name.toLowerCase() %> chapter <%= data.status %> waypointDest dark">

					<div class="accordion waypointDest dark">

						<% var iterator = 0, indexClass = '';
						_.each(data.casestudy, function(study,key,list){
							iterator++;
							if ( iterator == 1 ) {
								indexClass = ' first';
							} else if ( iterator == data.blocks.length ) {
								indexClass = ' last';
							} else {
								indexClass = '';
							}%>
							<article id="<%= study.id %>" class="waypointDest dark">
								<a class="button" href="javascript:void(0);">
									<div style="background-image: url( '<%= study.button.bg %>' );"></div>
									<h4><%= study.button.copy %></h4>
									<img src='study.button.preview'/> // TODO add parallax to this item
								</a>
								<div class="content">
									<div class="panels clearfix">

									<% _.each( study.panels, function(panel,key,list){
										if ( panel.video ){ %>
											<div class="panel ratio16_9 video-viewport">
												<a href="javascript:void(0);" class="control-btn inside">
													<div class="cover">
														<div class='slogan'>
															<span class="align"></span>
															<div class="copy">
																<div class="play-btn"></div>
																<h4><%= panel.video.headline %></h4>
																<h2><%= panel.video.copy %></h2>
															</div>
														</div>
														<img data-src="<%= panel.video.cover %>"/>
													</div>
													<% if ( panel.video.media.mp4 ){ %>
													<div class="video-player" id="video-16x9-<%= study.id %>" data-src="<%= panel.video.media.mp4 %>" data-loop="false" data-muted="false" data-autoplay="false"></div>
													<% } %>
													<% if ( panel.video.media.gif ){ %>
													<img class="gif" data-src="<%= panel.video.media.gif %>"/>
													<% } %>
												</a>
											</div>
										<% } else if ( panel.stats ) { %>
											<div class="stats">
												<ul class='wrapper'>
													<% _.each( panel.stats, function(stat,key,list){ %>
													<li>
														<span class="align"></span>
														<span class="copy">
															<% if ( stat.stars ) { %>
																<img class="stars" data-src="<%= stat.stars %>"/>
															<% } %>
															<% if ( stat.number ) { %>
																<dt><%= stat.number %></dt>
															<% } %>
															<% if ( stat.copy ) { %>
																<dd><%= stat.copy %></dd>
															<% } %>
														</span>
													</li>
													<%});%>
												</ul>
											</div>
										<% } else if ( panel.image ) { %>
											<div class="panel half ratio4_3 <%= panel.device %>">
												<div class="inside">
													<img data-src="<%= panel.image %>"/>
												</div>
											</div>
										<% } else { %>
											<div class="panel half ratio4_3 <%= panel.device %>">
												<div class="inside">
													<span class="align"></span>
													<div class="copy">
														<h5><%= panel.header %></h5>
														<% _.each( panel.paragraph, function(p,key,list){ %>
															<p><%= p %></p>
														<%});%>
													</div>
												</div>
											</div>
										<% } %>
									
									<%});%>

								</div>
							</article>

						<%});%>

					</div>

				</div>

			</section>
		</script>

		<script type="text/template" id="circle-template">
			// other items in a circle list at bottom of screen
			<section data-id="<%= data.name.toLowerCase() %>" class="<%= data.name.toLowerCase() %> chapter waypointDest light">
				<% var iterator = 0, indexClass = '';
				_.each(data.casestudy, function(study,key,list){
					iterator++;
					if ( iterator == 1 ) {
						indexClass = ' first';
					} else if ( iterator == data.blocks.length ) {
						indexClass = ' last';
					} else {
						indexClass = '';
					}%>
					<article>
						//circle with rollover
					</article>
			</section>
		</script>

		<script type="text/template" id="footer-template">
			<footer class="waypointDest light">
				<div class="wrapper-small">
					<h3 class='inner'><%= data.header %></h3>
					<ul>
						<% _.each(data.items, function(item,key,list){ %>
							<li style="background-image: url( '<%= data.bg-image %>' );">
								<a href="<%= item.url %>" target="_blank"><h2><%= item.link %></h2></a>
							</li>
						<%});%>
					</ul>
				</div>
			</footer>
		</script>

		<script>
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-###-1']);
			_gaq.push(['_trackPageview']);
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</body>
</html>