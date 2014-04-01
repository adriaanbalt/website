<?php

class PhotosTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('photos')->delete();

		$array = array(
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/0-cover-bw.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/0-cover-bw.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/maria/0-cover-bw.JPG',
					'women_id' => '3',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/Ira Karlova_28.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/chelseaTHUMB.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/Irina_8462.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/maria/Exame00.jpg',
					'women_id' => '3',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/Irina-lips.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/545662_287306998036739_643155477_n.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/grayscale-overals.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/maria/gynaika3.jpg',
					'women_id' => '3',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => "images/models/maria/N'Style8.jpg",
					'women_id' => '3',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/Ira Karlova_54.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/Bazaar-(4).jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/irina/bw-10.jpg',
					'women_id' => '2',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/545662_287306998036739_643155477_n.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/412609_181239275313138_173462147_o.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/chelsea/331298_121396404627800_1477408875_o.jpg',
					'women_id' => '1',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/maria/elle slovenia 03.jpg',
					'women_id' => '3',
					'development_id' => null
			),
			array(
					'title' => '',
					'slug' => '',
					'path' => 'images/models/maria/eurowoman-may-2011.jpg',
					'women_id' => '3',
					'development_id' => null
			)
		);

		
		DB::table('photos')->insert($array);
	}

}


/*
	$table->string('title');
	$table->string('slug');
	$table->string('path');
*/