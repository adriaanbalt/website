<?php

class HomeController extends BaseController {

	public function index()
	{
		
		$data = Projects::all();
		$this->layout->content = View::make('templates.site.projects')->withData($data);
	}

}