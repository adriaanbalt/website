<?php 
	if ( strrpos($_SERVER['SERVER_NAME'], "www.balt.us") != false) ){
		$env = 'PROD';
	} else {
		$env = 'DEV';
	}
?>
<!DOCTYPE html>
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

		<?php if ($env == 'PROD') { ?>
		<link rel="stylesheet" href="css/BALT.min.css">
		<?php } else { ?>
		<link rel="stylesheet" href="css/normalize.min.css">
		<link rel="stylesheet" href="css/screen.css">
		<?php } ?>

		<script src="js/data.json"></script>
		<script src="js/lib/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	</head>
	<body class="noScroll">
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrxade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		<![endif]-->

		<div id="navigation">
			<a href="javascript:void(0);" class="menu-btn menu-light"></a>
			<a href="javascript:void(0);" class="menu-btn menu-dark"></a>
			<a href="javascript:void(0);" class="menu-btn close-btn hidden"></a>
			<nav>
				<a href="#introduction" class="nav-btn" data-destination="introduction">
					<span class="align"></span>
					<span class="copy">INTRODUCTION</span>
				</a>
				<a href="#work" class="nav-btn" data-destination="work">
					<span class="align"></span>
					<span class="copy">WORK</span>
				</a>
				<a href="#recognition" class="nav-btn" data-destination="recognition">
					<span class="align"></span>
					<span class="copy">RECOGNITION</span>
				</a>
			</nav>
		</div>

		<div id="content">
			
			<section id="intro">
				<span class="align"></span>
				<div class='copy'>
					<div class="logo"></div>
					<div class="divide"></div>
					<div class="year">2013</div>
				</div>
			</section>

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
		<script src="js/BALT.spritAnimation.js"></script>
		<script src="js/BALT.templates.js"></script>
		<script src="js/BALT.videosVimeo.js"></script>
		<?php } ?>

		<script>videojs.options.flash.swf = "video-js.swf";</script>

		<script type="text/template" id="video-template">
			<iframe id="<%= data.id %>" src="http://player.vimeo.com/video/<%= data.src %>?api=1&player_id=<%= data.id %>" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
		</script>
		
		<script type="text/template" id="introduction-template">
			<section data-id="<%= data.name.toLowerCase() %>" class="<%= data.name.toLowerCase() %> chapter <%= data.status %>">
				<div class="container">
					<% if ( data.video ){ %>
						<div class='videos-layer waypointDest dark'>
							<div class="video-viewport ratio16_9">
								<div class="inside">
									<div class="layer slogan">
										<span class="align"></span>
										<div class="copy">
											<% _.each( data.slogan, function(elem,key,list){ %>
												<%= elem %>
											<%});%>
										</div>
									</div>
									<% if ( data.video.media ){ %>
										<div class="video layer">
											<% if ( data.video.media.mp4 ){ %>
												<div class="video-player fullbrowser main-vid" id="video-main-<%= data.video.id %>" data-src="<%= data.video.media.mp4 %>" data-loop="false" data-muted="false" data-autoplay="false"></div>
											<% } %>
										</div>
									<% } %>
									<% if ( data.video.teaser ){ %>
										<div class="cover">
										<% if ( 'ontouchstart' in window ){ %>
											<img class="still" data-src="<%= data.video.teaser.still %>"/>
										<% } else if ( data.video.teaser.mp4 ){ %>
											<div class="video-player teaser" id="video-teaser" data-src="<%= data.video.teaser.mp4 %>" data-loop="true" data-muted="true" data-autoplay="true"></div>
										<% } else if ( data.video.teaser.gif){ %>
											<div class="gif sprite-animation" style="background-image: url(<%= data.video.teaser.gif %>);" data-frames-len="<%= data.video.teaser.framesLength %>" data-aspect-ratio="<%= data.video.teaser.aspectRatio %>"></div>
										<% } %>
										</div>
									<% } %>
								</div>
							</div>
						</div>
					<% } %>

					<a class="arrow-pulse waypointDest dark" href="#beginning"></a>
					<h3 class="inner waypointDest light beginning"><%= data.header %></h3>
					<div class="inner paragraph waypointDest light">
						<% _.each( data.paragraph, function(p,key,list){ %>
							<p><%= p %></p>
						<%});%>
						<div class="names">
							<% _.each( data.names, function(name,key,list){ %>
								<div><%= name %></div>
							<%});%>
						</div>
					</div>
				</div>

				<% if ( data.nextSection ){ %>
					<a class="next-btn waypointDest dark" href="#<%= data.nextSection.toLowerCase() %>" data-destination="<%= data.nextSection.toLowerCase() %>">
						<h6><span>NEXT SECTION:</span><%= data.nextSection %></h6>
					</a>
				<% } %>
			</section>
		</script>

		<script type="text/template" id="copy-template">
			<section data-id="<%= data.name.toLowerCase() %>" class="<%= data.name.toLowerCase() %> chapter <%= data.status %>">
				
				<div class="container">

					<header class='waypointDest dark'>
						
						<% if ( data.header.video ){ %>
							<div class='videos-layer'>
								<div class="video-viewport ratio16_9">
									<div class="inside">
										<div class="layer slogan">
											<span class="align"></span>
											<div class="copy"> <%= data.header.copy %> </div>
										</div>
										<% if ( data.header.video.media ){ %>
											<div class="video layer">
												<% if ( data.header.video.media.mp4 ){ %>
													<div class="video-player fullbrowser main-vid" id="video-main-<%= data.header.video.id %>" data-src="<%= data.header.video.media.mp4 %>" data-loop="false" data-muted="false"></div>
												<% } %>
											</div>
										<% } %>
										<div class="cover">
											<% if ( 'ontouchstart' in window ){ %>
												<img class="still" data-src="<%= data.header.video.teaser.still %>"/>
											<% } else if ( data.header.video.teaser.mp4){ %>
												<div class="video-player teaser" id="video-teaser-<%= data.header.video.id %>" data-src="<%= data.header.video.teaser.mp4 %>" data-loop="true" data-muted="true"></div>
											<% } else if ( data.header.video.teaser.gif){ %>
												<div class='text sprite-animation' style="background-image: url(<%= data.header.video.teaser.gif %>);" data-frames-len="<%= data.header.video.teaser.framesLength %>" data-aspect-ratio="<%= data.header.video.teaser.aspectRatio %>"></div>
											<% } else if ( data.header.video.teaser.still ) { %>
												<div class="still bgimg" data-src="<%= data.header.video.teaser.still %>"></div>
											<% } %>
										</div> 
									</div>
								</div>
							</div>
						<% } else if ( 'ontouchstart' in window ){ %>
							<div class='text-mobile' style="background-image:url('<%= data.header.headerBG.still %>');">
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } else if ( data.header.headerBG.gif ) { %>
							<div class="ratio16_9">
								<div class="inside">
									<div class='text sprite-animation' style="background-image: url(<%= data.header.headerBG.gif %>);" data-frames-len="<%= data.header.headerBG.framesLength %>" data-aspect-ratio="<%= data.header.headerBG.aspectRatio %>">
										<span class="align"></span>
										<div class="copy"><%= data.header.copy %></div>
									</div>
								</div>
							</div>
						<% } else if ( data.header.headerBG.still ){ %>
							<div class='text' style="background-image:url('<%= data.header.headerBG.still %>');">
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } else { %>
							<div class='text'>
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } %>

					</header>

					<% var iterator = 0, additionalClass = '';
						_.each(data.blocks, function(block,key,list){
						iterator++;
						if ( iterator == 1 ) {
							additionalClass = ' first';
						} else if ( iterator == data.blocks.length ) {
							additionalClass = ' last';
						} else {
							additionalClass = '';
						}
						%>
						<% if ( block.stats ) { %>
							<div class="stats<%= additionalClass %> waypointDest dark">
								<ul class='wrapper'>
									<% if ( block.logo ) { %>
										<img class='stats-logo' data-src="<%= block.logo %>"/>
									<% } %>
									<% _.each( block.stats, function(stat,key,list){ %>
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
						<% } else if ( block.clients ) { %>
							<div class="relationships wrapper<%= additionalClass %> waypointDest light">
								<h3 class='inner'><%= block.header %></h3>
								<ul class="relations">
									<% _.each(block.clients, function(client,key,list){ %>
										<li>
											<span class='align'></span>
											<img data-src="<%= client.logo %>"/>
										</li>
									<%});%>
								</ul>
							</div>
						<% } else if ( block.awards ) { %>
							<div class="awards wrapper<%= additionalClass %>  waypointDest light">
								<h3 class='inner'><%= block.header %></h3>
								<ul>
									<% _.each(block.awards, function(award,key,list){ %>
										<li>
											<object data="<%= award.image %>" type="image/svg+xml"></object>
										</li>
									<%});%>
								</ul>
							</div>
						<% } else if ( block.press ) { %>
							<div class="press wrapper-small<%= additionalClass %> waypointDest light">
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
						<% } else if ( block.charts) { %>
							<div class="charts<%= additionalClass %> waypointDest light">
								<div class="inner">
									<h3><%= block.header %></h3>
								</div>
								<ul class='wrapper'>
								<% _.each(block.charts, function(chart,key,list){ %>
									<li>
										<canvas data-percent="<%= chart.percentage %>" id="<%= chart.uniqueID %>" width="160" height="160">
											<p><%= chart.percentage %>&#37;</p>
										</canvas>
										<h2><%= chart.copy %></h2>
									</li>
								<%});%>
								</ul>
							</div>
						<% } else if ( block.quote ) { %>
							<div class="paragraph<%= additionalClass %> waypointDest light">
								<div class="wrapper-small">
									<h3><%= block.header %></h3>
									<h2><%= block.quote %></h2>
								</div>
							</div>
						<% } else if ( block.image ) { %>
							<div class="paragraph<%= additionalClass %> <%= block.special_class %>">

								<% if ( block.image_size == 'fullbleed' ) {
									sizeClass = 'wrapper-large';
								} else {
									sizeClass = 'wrapper-small';
								} %>
								<div class="<%= additionalClass %>">
									<% if ( block.image ) { %>
										<img data-src="<%= block.image %>"/>
									<% } %>
								</div>
							</div>
						<% } else { %>
							<div class="paragraph<%= additionalClass %> waypointDest light">
								<div class="wrapper-small">
									<div class='inner'>
										<% if (block.header) { %>
											<h3><%= block.header %></h3>
										<% } %>
										<% _.each( block.paragraph, function(p,key,list){ %>
											<p><%= p %></p>
										<%});%>
									</div>
								</div>
							</div>
						<% } %>
					<%});%>

					<% if ( data.thankyou ){ %>
						<header class='waypointDest thankyou dark'>
							
							<% if ( 'ontouchstart' in window ){ %>
								<div class='text-mobile'>
									<span class="align"></span>
									<div class="copy"><h1>THANK YOU</h1><h2>We appreciate your consideration</h2></br><%= data.thankyou.copy %></div>
								</div>
							<% } else if ( data.thankyou.gif ) { %>
								<div class="ratio16_9">
									<div class="inside">
										<div class='text sprite-animation' style="background-image: url(<%= data.thankyou.gif %>);" data-frames-len="<%= data.thankyou.framesLength %>" data-aspect-ratio="<%= data.thankyou.aspectRatio %>">
											<span class="align"></span>
											<div class="copy"><%= data.thankyou.copy %></div>
										</div>
									</div>
								</div>
							<% } else if ( data.thankyou.still ){ %>
								<div class='text' style="background-image:url('<%= data.thankyou.still %>');">
									<span class="align"></span>
									<div class="copy"><%= data.thankyou.copy %></div>
								</div>
							<% } else { %>
								<div class='text' style="background-image:url('<%= data.thankyou.still %>');">
									<span class="align"></span>
									<div class="copy"><%= data.thankyou.copy %></div>
								</div>
							<% } %>

						</header>
					<% } %>
				</div>

				<% if ( data.nextSection ){ %>
					<a class="next-btn waypointDest dark" href="#<%= data.nextSection.toLowerCase() %>" data-destination="<%= data.nextSection.toLowerCase() %>">
						<h6><span>NEXT SECTION:</span><%= data.nextSection %></h6>
					</a>
				<% } %>
			</section>
		</script>

		<script type="text/template" id="accordion-template">
			<section data-id="<%= data.name.toLowerCase() %>" class="<%= data.name.toLowerCase() %> chapter <%= data.status %> waypointDest dark">

				<div class="container waypointDest dark">

					<header class='waypointDest dark'>

						<% if ( 'ontouchstart' in window ){ %>
							<div class='text-mobile' style="background-image:url('<%= data.header.headerBG.still %>');">
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } else if ( data.header.headerBG.gif ) { %>
							<div class="ratio16_9">
								<div class="inside">
									<div class='text sprite-animation' style="background-image: url(<%= data.header.headerBG.gif %>);" data-frames-len="<%= data.header.headerBG.framesLength %>" data-aspect-ratio="<%= data.header.headerBG.aspectRatio %>">
										<span class="align"></span>
										<div class="copy"><%= data.header.copy %></div>
									</div>
								</div>
							</div>
						<% } else if ( data.header.headerBG.still ){ %>
							<div class='text' style="background-image:url('<%= data.header.headerBG.still %>');">
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } else { %>
							<div class='text'>
								<span class="align"></span>
								<div class="copy"><%= data.header.copy %></div>
							</div>
						<% } %>

					</header>
					
					<div class="accordion waypointDest dark">

						<% _.each(data.studies, function(study,key,list){ %>

							<article id="<%= study.id %>" class="waypointDest dark">
								<a class="button" href="javascript:void(0);">
									<div style="background-image: url( '<%= study.navBG %>' );"></div>
									<h4><%= study.navTitle %></h4>
								</a>
								<div class="content">
									<div class="me clearfix">

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
										<% } else if ( panel.quote ) { %>
											<div class="quote clearfix">
												<h2><%= panel.quote %></h2>
												<p><%= panel.source %></p>
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
				</div>

				<% if ( data.nextSection ){ %>
					<a class="next-btn waypointDest dark" href="#<%= data.nextSection.toLowerCase() %>" data-destination="<%= data.nextSection.toLowerCase() %>">
						<h6><span>NEXT SECTION:</span><%= data.nextSection %></h6>
					</a>
				<% } %>
			</section>
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