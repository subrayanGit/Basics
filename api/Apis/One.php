<?php
header("Access-Control-Allow-Origin: *"); // I am using this because I want to access it from third party site. Avoid if youare in same server
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, GET,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type");
class Api_One extends Api
{
    public function __construct()
    {        
        // In here you could initialize some shared logic between this API and rest of the project
    }

    public function get()
    {      
       // Write your Api here    
    }

  
}
