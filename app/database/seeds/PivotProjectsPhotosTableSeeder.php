<?php

class PivotWomenPhotosTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		DB::table('women_photos')->delete();

		$array = array(
			array(
					'photo_id' => '1',
					'women_id' => '1'
			),
			array(
					'photo_id' => '2',
					'women_id' => '1'
			),
			array(
					'photo_id' => '3',
					'women_id' => '1'
			),
			array(
					'photo_id' => '4',
					'women_id' => '2'
			),
			array(
					'photo_id' => '5',
					'women_id' => '3'
			),
			array(
					'photo_id' => '6',
					'women_id' => '2'
			),
			array(
					'photo_id' => '7',
					'women_id' => '1'
			),
			array(
					'photo_id' => '8',
					'women_id' => '1'
			),
			array(
					'photo_id' => '9',
					'women_id' => '3'
			),
			array(
					'photo_id' => '12',
					'women_id' => '2'
			),
			array(
					'photo_id' => '13',
					'women_id' => '1'
			),
			array(
					'photo_id' => '14',
					'women_id' => '2'
			),
			array(
					'photo_id' => '15',
					'women_id' => '3'
			),
			array(
					'photo_id' => '16',
					'women_id' => '3'
			),
			array(
					'photo_id' => '17',
					'women_id' => '2'
			),
			array(
					'photo_id' => '18',
					'women_id' => '1'
			),
			array(
					'photo_id' => '19',
					'women_id' => '3'
			),
			array(
					'photo_id' => '20',
					'women_id' => '1'
			)
		);

		
		DB::table('women_photos')->insert($array);
	}

}


/*
	$table->foreign('women_id')
		->references('id')
		->on('women')
		->on_delete('restrict')
		->on_update('cascade');
	
	$table->foreign('photo_id')
		->references('id')
		->on('photos')
		->on_delete('restrict')
		->on_update('cascade');
*/