<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProjectsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('projects', function(Blueprint $table) {
			$table->engine ='InnoDB';

			$table->increments('id');
			
			$table->string('slug');
			$table->string('name');
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

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('projects');
	}

}


