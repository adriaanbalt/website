<?php

class NavigationTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('navigation')->delete();

		$array = array(
			array(
					'title' => 'some girls',
					'slug'  => 'some-girls'
			),
			array(
					'title' => 'rookies',
					'slug'  => 'rookies'
			),
			array(
					'title' => 'backstage pass',
					'slug'  => 'backstage-pass'
			),
			array(
					'title' => 'contact',
					'slug'  => 'contact'
			),
			array(
					'title' => 'join the band',
					'slug'  => 'join-the-band'
			)
		);

		
		DB::table('navigation')->insert($array);
	}

}
