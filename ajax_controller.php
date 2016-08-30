<?php


/**
 * This file is called by sf.js -> Sf.update
 * when is necessary to query one or more
 * controller
 *
 * @package SF (Simple Framework)
 */



/**
 * Include the main application
 */

include('sf.php');


//read from stdin
$content = file_get_contents('php://input');
$_POST = json_decode($content,true);


/**
 * @var callable $controller  
 * Create an instance of the class 
 * declared in sf.php
 */

$controller = new Controller();


/*
 * encoded JSON object
 * 
 * At the moment the object is in this form:
 * 
 * array(queue,post)
 * 
 * where "queue" is an array with all the views
 * about which we have to query the controllers
 * (in the form "[scope]|[namespace]|[label]")
 * and "post" an associative array with the 
 * identification of the controller in the same
 * form (under the key "controller")
 * and the FORM values (under the 
 * key "post_data")
 *  
 * here is an example: 
 * 
 * {queue:[["nodes|home|friends_data", {pag:1}]], 
 * post:{controller:"nodes|home|friends_data", post_data:[{name:"name", value:"a", el:{}}, {name:"email", value:"b", el:{}}, {name:"phone", value:"c", el:{}}]}}
 * 
 * 
 * @todo Those data could be structured in a 
 * different way
 * 
 */

$array = $_POST;

$result = array();


foreach($array['queue'] as $value) {

 /**
  * @var string $value_ The controller's path in the form
  * [scope]|[namespace]|[label]
  *  
  * @var array $values The values to be passed to
  * the controller
  */

 list($value_,$values) = $value;


 /**
  * 
  * @var string $array['post']['controller'] 
  * The identification /path of the controller 
  * related to the form data, 
  * specified in the sf-post attribute of the HTML element
  * See for instance nodes/home/view.js -> new_friend
  * 
  * 
  * @var array $post Associative array with the FORM values.
  * We only pass it when the controller to be queried and
  * the controller associated to that values are matching 
  */

 $post = ($value_ != $array['post']['controller'] ? array() : $array['post']['post_data']);


 list($scope,$namespace,$label) = explode('|',$value_);


 //queries the controllers and gets the result as an array

 $result[] = $controller->get($scope,$namespace,$label,$values,$post);
}


//return the result to sf.js -> Sf.update() -> on_success_function

exit(json_encode($result));



