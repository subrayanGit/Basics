<?php
class Api_Test extends Api
{
  public function get($token = null)
    {      
      $token = isset($_REQUEST['token']) ? $_REQUEST['token'] : '';        
      if($token)
      {
        return $this->getRecord(($token));
      }
      else
      {        
        return Api::responseError(404,'Invalid Token');
      }
    }   
}
