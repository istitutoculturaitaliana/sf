<?php


/**
 * This script contains some basic functions
 * to assist the creation of stylesheets.
 * For instance, it can provide an abstraction
 * layer regarding the various browser's versions, since 
 * the passed attributes can be interpolated
 * by the PHP functions
 * 
 * 
 * @package browser.php 
 * @todo implement the various "abstraction layers"
 * to specific (browser-related) css properties
 * 
 */

$GLOBALS['css'] = array();


/**
 * This function is used to scale
 * the measures expressed in pixels
 * in a similar way the zoom function
 * of the browser does: everything is
 * scaled, both text and images.
 *
 * @param int $px Value expressed in pixels
 * @return string Interpolated pixel value with suffix 'px'
 *
 * @todo TO BE IMPLEMENTED!
 */

function __px__($px) {
 return $px . 'px';
}


/**
 * This function records the css attributes
 * of selector or list of selectors (tags, classes
 * and so on) for a further elaboration and 
 * use 
 * 
 * @param array $array A multidimensional
 * array with selectors (or list of
 * selectors) as keys, and an array of 
 * attributes / values as values
 */


function __css__($array) {

 
 foreach($array as $key => $value) {

 /**
  *  @var string $key The selector name
  */

  if(!array_key_exists($key,$GLOBALS['css']))
   $GLOBALS['css'][$key] = array();

   /**
    * @var string $key_ The attribute name
    * @var string $value_ The attribute value
    * 
    * @todo The attribute value could be further
    * "interpolated", providing a kind of abstraction
    * layer
    */

  foreach($value as $key_ => $value_) {
   $GLOBALS['css'][$key][$key_] = $value_;
  }

 }

}


/**
 * A compacted form of the Str 
 * class which can be found in sf.php
 * We only use it to return a string
 * when an array is converted into it
 */


class Str_ {

 /**
  * @var array $str_array 
  * An array of strings. This is the "class
  * argument" assigned by the constructor
  */

 private $str_array = array();


 /**
  * @var bool $is_array Records if the parameter passed to the
  * constructor is an array, to provide the expected
  * output when the get() method is called
  */

 private $is_array = false;

 /** 
  * The class constructor. We allow both
  * single strings and array of strings 
  * to which perform any method of the class
  *  
  * @param string|array $mixed A string or an array of strings
  * @return $this Returns the class instance
  */

 public function __construct($mixed) {
  
  $this->is_array = is_array($mixed);
  
  if(!$this->is_array)
   $this->str_array = array($mixed);
  else
   $this->str_array = $mixed;
   
  return $this;
 }

 
 /**
  * Gets the transformed class argument 
  * 
  * @return mixed A string of an array of strings
  * depending on the value of $this->is_array
  */

 public function get() {
  if($this->is_array)
   return $this->str_array;
  else
   return current($this->str_array);
 }



}



/**
 * A simple class to handle arrays
 * in the method chaining (fluent
 * interface style) and to group
 * array-related functions
 */

class Obj_ {

 /**
  * @var array $obj The class argument 
  * assigned by the constructor
  */
 
 private $obj = array();


 /**
  * Assigns the class argument ($this->obj)
  * 
  * @param array $obj An associative array to
  * be used as class argument
  *
  * @return $this Returns the class instance
  */

 public function __construct($obj) {
  $this->obj = $obj;
  return $this;
 }


 /**
  * A simple function to "implode" 
  * a single-dimension associative array 
  * 
  * @param string $tok_a The token to be used to join the key and the value
  * @param string $tok_b The token to be used to join key / value pairs
  * @return callable Returns an instance of the class Str (documented above)
  */

 public function implode_map($tok_a,$tok_b) {
  $output = array();
  foreach($this->obj as $key => $value) 
   $output []= $key . $tok_a . $value;
  $output = implode($tok_b,$output);
  
  return str($output);
 }

}


/**
 * A function by which calling the class Str
 * without the use of the 'new' operator
 * 
 * @param string $str The class argument 
 * of the new instance of Str_
 */

function str($str) {
 return new Str_($str);
}



/**
 * A function by which calling the class Obj
 * without the use of the 'new' operator
 *
 * 
 * @param array $obj The class argument
 * of the new instance of Obj_
 */

function obj($obj) {
 return new Obj_($obj);
}




/**
 * A function to render the 
 * css declarations recorded using
 * the function __css__  
 */

function __css__render() {
 $output = array();

 foreach($GLOBALS['css'] as $key => $value) 
  $output []= $key . '{' . obj($value)->implode_map(':',';')->get() . ';}';

 return implode("\n",$output);


}


