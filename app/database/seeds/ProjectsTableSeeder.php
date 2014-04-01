<?php

class projectsTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('projects')->delete();

		$array = array(
			array(
					'slug' => 'project1',
					'active' => '1',
					'client' => 'client',
					'compaign' => 'compaign',
					'title' => 'Project Three',
					'position' => 'developer',
					'link' => 'www.balt.us',
					'href' => 'http://www.balt.us',
					'images_id' => '1',
					'description' => 'description',
					'thumbnail' => 'thumbnail'
			)

			array(
					'slug' => 'project2',
					'active' => '1',
					'client' => 'client',
					'compaign' => 'compaign',
					'title' => 'Project Three',
					'position' => 'developer',
					'link' => 'www.balt.us',
					'href' => 'http://www.balt.us',
					'images_id' => '1',
					'description' => 'description',
					'thumbnail' => 'thumbnail'
			)

			array(
					'slug' => 'project3',
					'active' => '1',
					'client' => 'client',
					'compaign' => 'compaign',
					'title' => 'Project Three',
					'position' => 'developer',
					'link' => 'www.balt.us',
					'href' => 'http://www.balt.us',
					'images_id' => '1',
					'description' => 'description',
					'thumbnail' => 'thumbnail'
			)

		);

		
		DB::table('projects')->insert($array);
	}

}


/*

$table->string('slug');
$table->boolean('active');

$table->string('client')->nullable();
$table->string('campaign')->nullable();
$table->string('title')->nullable();
$table->string('link')->nullable();
$table->string('href')->nullable();
$table->string('images')->nullable();
$table->string('position')->nullable();
$table->string('description')->nullable();
$table->string('thumbnail')->nullable();

*/