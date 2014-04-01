<?php

class Projects extends BaseModel {

	protected $table = 'projects';

	public function slug()
	{
		return $this->slug;
	}

	public function active()
	{
		return $this->active;
	}

	public function title()
	{
		return $this->title;
	}

	public function client()
	{
		return $this->client;
	}

	public function campaign()
	{
		return $this->campaign;
	}

	public function href()
	{
		return $this->href;
	}

	public function position()
	{
		return $this->position;
	}

	public function description()
	{
		return $this->description;
	}

	public function thumbnail()
	{
		return $this->thumbnail;
	}

	public function images()
	{
		return $this->images;
	}

}

