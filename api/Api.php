<?php
define('YOUR_TOKEN_HERE', 'Test');
define('TOKEN_COOKIE_NAME', '');
define('DB_PATH',$_SERVER['DOCUMENT_ROOT'].'/445/includes/Messenger.php');
class Api
{
    const STATUS_OK = 'OK'; 
    const STATUS_ERR = 'ERROR';
    private static $supported_versions = array(
        'v1.0',
    );

    private static $supported_formats = array(
        'json',
    );

    private static $main_version = 'v1.0';
    private static $main_format  = 'json';

    private static $request_version = null;
    private static $request_format  = null;

    private static $public_routes = array(
        'system' => array(
        'regex' => 'system',
        ),
        'records' => array(
            'regex' => 'records(?:/?([0-9]+)?)',
        ),
        'login' => array(
            'regex' => 'login(?:/?([0-9]+)?)',
        ),
        'dashboard' => array(
            'regex' => 'dashboard',
        ),
        'test' => array(
            'regex' => 'test',
        ),
        'Open_samples' => array(
            'regex' => 'Open_samples',
        ),
    );

    public static $input = null;
    public static $input_data = array();

    public static function serve()
    {
        $path_info = '/';

        // Parse needed information from PATH_INFO or REQUEST_URI
        if (!empty($_SERVER['PATH_INFO'])) {
            $path_info = $_SERVER['PATH_INFO'];
        } else {
            if (!empty($_SERVER['REQUEST_URI'])) {
                if (strpos($_SERVER['REQUEST_URI'], '?') > 0) {
                    $path_info = strstr($_SERVER['REQUEST_URI'], '?', true);
                } else {
                    $path_info = $_SERVER['REQUEST_URI'];
                }
            }
        }

        // Support for api/{version}/whatever{.format}
        preg_match('#^/?([^/]+?)/.+?\.(.+?)$#', $path_info, $request_info);

        // Check if we have version and format in url
        if (!$request_info || !isset($request_info[2])) {
            // Should throw 404 here
            return false;
        }

        self::$request_version = $request_info[1];
        self::$request_format  = $request_info[2];

        // Check version
        if (!in_array(self::$request_version, self::$supported_versions)) {
         // Should throw 406 Unsupported version here
            return false;
        }

        // Check format
        if (!in_array(self::$request_format, self::$supported_formats)) {
         // Should throw 406 Unsupported format here
            return false;
        }

        self::$input = file_get_contents('php://input');

        // For PUT/DELETE there is input data instead of request variables
        if (!empty(self::$input)) {
            preg_match('/boundary=(.*)$/', $_SERVER['CONTENT_TYPE'], $matches);
             if (isset($matches[1]) && strpos(self::$input, $matches[1]) !== false) {
                $this->parse_raw_request(self::$input, self::$input_data);
            } else {
                parse_str(self::$input, self::$input_data);
            }
        } 

        $request_method = strtolower($_SERVER['REQUEST_METHOD']);

        // If this is OPTIONS request return it right now
        if ($request_method == 'options') {
            Api::outputHeaders();
        } else {
            $handler = null;

            // How url should start, example: /api/v1.0/
            $url_start = '/(?:'.implode('|', self::$supported_versions).')/';

            // How url should end, example: .json
            $url_end = '\.(?:'.implode('|', self::$supported_formats).')';

            foreach (self::$public_routes as $handler_name => $route_config) {
                $regex = $url_start.$route_config['regex'].$url_end;  

                if (preg_match('#^'.$regex.'$#', $path_info, $params_matches)) {
                    $handler = $handler_name; 
                    break;
                }
            }

            if (!$handler) {
                // Some 404 action
            }

            $classname = 'Api_'.ucfirst($handler);
            $api_object = new $classname(); 

            if (!method_exists($api_object, $request_method)) {
                // Some 404 action
            }

            // Finally call to our inner class
            call_user_func_array(array($api_object, $request_method), $params_matches);
        }
    }

/**
 * Helper method to parse raw requests
 */
private function parse_raw_request($input, &$a_data)
{
    // grab multipart boundary from content type header
    preg_match('/boundary=(.*)$/', $_SERVER['CONTENT_TYPE'], $matches);
    $boundary = $matches[1];

    // split content by boundary and get rid of last -- element
    $a_blocks = preg_split("/-+$boundary/", $input);
    array_pop($a_blocks);

    // loop data blocks
    foreach ($a_blocks as $id => $block) {
        if (empty($block)) {
            continue;
        }

        // parse uploaded files
        if (strpos($block, 'application/octet-stream') !== false) {
            // match "name", then everything after "stream" (optional) except for prepending newlines
            preg_match("/name=\"([^\"]*)\".*stream[\n|\r]+([^\n\r].*)?$/s", $block, $matches);
        // parse all other fields
        } else {
            // match "name" and optional value in between newline sequences
          preg_match('/name=\"([^\"]*)\"[\n|\r]+([^\n\r].*)?\r$/s', $block, $matches);
        }

        $a_data[$matches[1]] = $matches[2];
    }
}

    // This method will handle both cross origin and same domain requests
    public static function outputHeaders($cookies = array())
    {
        $referer = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : null;

        if (!$referer) {
            $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
        }

        $origin = '*';

        // If we have referer information try to parse it
        if ($referer) {
            $info = parse_url($referer);

            if ($info && isset($info['scheme']) && ($info['scheme'] == 'http' || $info['scheme'] == 'https')) {
                $origin = $info['host'];

                if ($origin == $_SERVER['HTTP_HOST']) {
                    $origin = $info['scheme'].'://'.$origin;
                } else {
                    $origin = '*';
                }
            }
        }

        // Do not send any cookies that might be issued
        header_remove('Set-Cookie');

        // If this is packaged app or request from 3rd party, append auth token to the headers
        if ($origin == '*' || (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']) && !empty($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Expose-Headers: x-authorization');
            header('Access-Control-Allow-Headers: origin, content-type, accept, x-authorization');
            header('X-Authorization: '.YOUR_TOKEN_HERE);
        // Or if this is simple crossdomain call from our domain
        } else {
            header('Access-Control-Allow-Origin: '.$origin);
            header('Access-Control-Expose-Headers: set-cookie, cookie');
            header('Access-Control-Allow-Headers: origin, content-type, accept, set-cookie, cookie');

            // Allow cookie credentials because we're on the same domain
            header('Access-Control-Allow-Credentials: true');

            // Let's set all the cookies we want except for options method. It does not support them.
            if (strtolower($_SERVER['REQUEST_METHOD']) != 'options') {
                setcookie(TOKEN_COOKIE_NAME, YOUR_TOKEN_HERE, time()+86400*30, '/', '.'.$_SERVER['HTTP_HOST']);

                // Any other cookies
                if (sizeof($cookies)) {
                    foreach ($cookies as $cookie) {
                        call_user_func_array('setcookie', $cookie);
                    }
                }
            }
        }

        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Max-Age: 86400');
    }

    public function generateToken($data = '')
    {   
        $rand_string  = uniqid(mt_rand(), true).time();
        if(is_array($data))
        {
            $email = (isset($data['userEmail'])) ? $data['userEmail'] : '';
            $userid = (isset($data['userId'])) ? $data['userId'] : '';
            $time  = time();
            $randomnumber = uniqid(mt_rand(), true);
            $rand_string =$email.$userid.$time.$randomnumber;  
        }
       return $token = md5($rand_string);
    }

    public function Db()
    {
         $file = DB_PATH;
         include_once($file);
         $messenger = new Messenger();
         return $messenger;
    }
    public function AuthenticateToken($token = null)
    {      
        $aResponse = array();
        if(!$token)
        {
          return FALSE;
        }        
        $db = $this->Db();
        $token_info = $db->getrow('track_auth_token',array('id_track_auth_token', 'token','company_id','user_login_type','userid','user_role','user_type','device', 'token_time'),
        array('where'=> array('token'=>$token))
        );        
        if(count((array)$token_info) > 0)
        {
            $aResponse['uid'] = (isset($token_info->userid)) ? $token_info->userid : 0;
            $aResponse['urole']= (isset($token_info->user_role)) ? $token_info->user_role : '';
            $aResponse['utype']= (isset($token_info->user_type)) ?$token_info->user_type: '';
            $aResponse['ucompany_id']= (isset($token_info->company_id)) ?$token_info->company_id: 0;            
            $aResponse['utypeid']= (isset($token_info->user_login_type)) ?$token_info->user_login_type: 0;
        }  
        return (count((array)$token_info) > 0) ? $aResponse  : FALSE;        
    }

    public static function responseOk($result = array(), $metadata = array(), $cookies = array())
    {
        // For now we will support only this
        if (self::$request_format == 'json') {
            http_response_code(200);
            header('Content-type: application/json; charset=utf-8');
            self::outputHeaders($cookies);

            echo json_encode(array(
                'metadata' => $metadata,
                'status' => self::STATUS_OK,
                'result' => $result,
            ));
        }
    }

    public static function responseError($code = 404, $info = null)
    {
        http_response_code($code);
        if (self::$request_format == 'json') {
            header('Content-type: application/json; charset=utf-8');
            self::outputHeaders();

            echo json_encode(array(
                'status' => self::STATUS_ERR,
                'info' => $info,
            ));
        }
    }
}
