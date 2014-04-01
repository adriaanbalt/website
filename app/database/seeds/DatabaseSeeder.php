<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		$this->command->info('HERE WE GO!');

		$this->call('NavigationTableSeeder');
		$this->command->info('Navigation finished!');

		$this->call('AboutTableSeeder');
		$this->command->info('About finished!');

		$this->call('ContactTableSeeder');
		$this->command->info('Contact finished!');

		$this->call('ProjectsTableSeeder');
		$this->command->info('Women finished!');

		$this->call('PhotosTableSeeder');
		$this->command->info('Photos finished!');

		$this->call('UpdatedWomenTableSeeder');
		$this->command->info('Updated Women!');

		$this->call('PivotWomenPhotosTableSeeder');
		$this->command->info('Pivot Women Photos Board finished!');

	}

}