<?php

class SubNavItemModel extends BaseModel {

	protected $table = 'subnavigation';

	public function NavigationModel()
	{
        return $this->belongsTo('NavigationModel');
	}

	
}


/*
	id				primary key		unique identifier ie: 283208234
	label
	url
*/