<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Map_controller extends CI_Controller {
	public function index()
	{
    $ch = curl_init(); 
    curl_setopt($ch, CURLOPT_URL, "http://stallioni.in/Bitcoins/Bitcoin-ATM-Locations-Find-Your-Nearest-Bitcoin-ATM-Locations/index/getatm.json"); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    $output = curl_exec($ch); 
    curl_close($ch);      
     var_dump($output);
	//$this->load->view('map_front_view');
	}

	function show_map() {

	$this->load->view('map_front_view_new');

	}

function map() {

	$this->load->view('map');

	}
}

