<?php

class AboutTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('about')->delete();

		$array = array(
			array(
					'title' => '',
					'paragraph' => "Chad Gavery's 11 year experience began at ONE Management New york where he focused on model development contributing to the rise of such super stars as Candice Swanepoel, Anne V. and Irina Shayk. His years spent at NEXT Paris as well as casting for the fashion shows in London, Milan and Paris, bring to WANDERLUST an insider exposure to expand a models career from international placement and management to connecting talent with top photographers, clients and industry taste makers."
			),
			array(
					'title' => '',
					'paragraph' => "Guillaume Terrasson's spent his 10 year career at MARILYN Paris and two years as Booking Director at WOMEN Paris advancing the careers of such models as Natasha Poly, Daria Strokous, Daphne Groenveld, Aymeline Valade and Ana Ewers to name a few. Connecting models with such designers as Louis Vuitton, Dior, Givency, Chloe, Alexander McQueen and magazines such as French/ Italian/ UK Vogue, Purple, Self Service and Numero, brings to WANDERLUST a unique edge to overall management advancing models careers through long term relationships in primary model markets such as New York, London, Paris and Milan."
			),
			array(
					'title' => '',
					'paragraph' => "This collective experience creates a partnership focused on strategic personal management, which will develop and maintain long lasting careers in both a commercial and editorial environment."
			)
		);

		
		DB::table('about')->insert($array);
	}

}




/*
	$table->string('title');
	$table->string('slug');
	$table->string('path');
*/