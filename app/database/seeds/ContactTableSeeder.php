<?php

class ContactTableSeeder extends Seeder {

	public function run()
	{
		DB::table('contact')->delete();

		$array = array(
			array(
					'name' => '',
					'position' => '',
					'telephone' => '414.702.8225',
					'fax' => '',
					'email' => 'info@wanderlustmgmt.com',
					'address' => '1815 Purdy Ave., Miami Beach 33139',
					'website' => ''
			),
			array(
					'name' => 'Chad Gavery',
					'position' => 'Director',
					'telephone' => '414.702.8225',
					'fax' => '',
					'email' => 'chad@wanderlustmgmt.com',
					'address' => '',
					'website' => 'www.wanderlustmgmt.com'
			),
			array(
					'name' => 'Guillaume Terrasson',
					'position' => 'Director',
					'telephone' => '414.702.8225',
					'fax' => '',
					'email' => 'guillaume@wanderlustmgmt.com',
					'address' => '',
					'website' => 'www.wanderlustmgmt.com'
			)
		);

		DB::table('contact')->insert($array);
	}

}


/*
    $table->string('telephone');
    $table->string('fax');
    $table->string('email');
    $table->string('address');
*/