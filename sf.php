<?php


/**
 * 
 * This is the main server-side file
 * of Sf, an isomorphic, recursive and 
 * minimalistic client/server
 * side framerwork to easily develop
 * modular and light-fast web applications. 
 * 
 * The file also contains some utilities to easily
 * performs operations on strings or arrays
 * using method chaining.
 *  
 * 
 * @package SF (Simple Framework)
 * @copyright (C) 2016 Institute of Italian culture (NGO)
 * @see www.istitutoculturaitaliana.org/sf
 * @author Thomas de Vivo <tdvit@mail.com>
 * @version 0.1
 * @license This is an open source software 
 * conceived within the frame of the Institute of
 * Italian culture (NGO), and originally  
 * conceived within the frame of the Institute of 
 * Italian culture (NGO), and originally 
 * implemented by Thomas de Vivo (tdvit@mail.com) 
 * It is published under the following license:
 * everyone can copy, use, modify and redistribute this
 * software provided that every copy of it (including the
 * partial use of its code) will retain the current disclaimer 
 * or in this form, or using the following short notice:<br>
 * <br>
 * "(C) 2016 Institute of Italian culture (NGO)<br>
 *  -- www.istitutoculturaitaliana.org/sf"<br>
 * <br>
 * (even compacted in one line) <br>
 * (the provided link will contain a description of the software
 * and the complete license.)<br>
 * <br>
 * The software is provided "as is": without any warranty
 * (including its eligibility for whatever kind
 * of purpose), and both the copyright owners and the
 * contributors are excluded from any liability
 * related to the use of it, even if instructions 
 * and recommendations of use will be provided
 * with such software or any derivative or 
 * related work.
 * 
 * 
 */


/**
 * @var string __BASE_DIR__ The absolute path 
 * of the website root folder
 */

define('__BASE_DIR__',str_replace('\\','/',realpath(dirname(__FILE__))));


/**
 * @var string __LEFT__ Keyword used by the class Str 
 * to indicate the left part of a string by some
 * reference token
 */

define('__LEFT__',true);



/**
 * @var string __RIGHT__ Keyword used by the class Str 
 * to indicate the right part of a string by some
 * reference token
 */

define('__RIGHT__',false);

/**
 * An interface to easily handle strings
 * using method chaining (fluent interface)
 * and to groups string related functions.
 * The class is called through the function 
 * below str() to avoid the use of the 'new'
 * operator.<br>
 * <br>
 * Here are some examples:<br>
 * <br>
 * example 1<br>
 * <br>
 * $path = '/var/www/my_site/my_file.txt';<br>
 * <br>
 * $contents = str($path)->get_contents();<br>
 * <br>
 * gets the contents of the file located in $path<br>
 * <br>
 * <br>
 * example 2<br>
 * <br>
 * $path = '/var/www/my_site/my_file.txt';<br>
 * <br>
 * $level = 2;<br>
 * <br>
 * $path = str($path)->path_level_up($level)->get();<br>
 * <br>
 * //returns '/var/www';<br>
 * <br>
 * returns a string n levels up of $path
 * <br>
 * <br> 
 * 
 * example 3<br>
 * <br>
 * $path = '/var/www/my_site/my_file.js.txt';<br>
 * <br>
 * $str = str($str)->rpart('.',__RIGHT__)->get();<br>
 * <br>
 * //returns 'txt'<br>
 * <br>
 * gets the right side of $path by the last
 * occurrence of the token "."
 * 
 * <br>
 * <br>
 * example 4<br>
 * <br>
 * $path = '/var/www/my_site/my_file.js.txt';<br>
 * <br>
 * $str = str($str)->rpart('/',__RIGHT__)->part('.',__LEFT__)->get();<br>
 * <br>
 * //returns 'my_file' <br>
 *  
 */


class Str {

 /**
  * @var array $str_array 
  * An array of strings. This is the main
  * argument of the class, assigned by the
  * constructor. Hereinafter called "class argument"
  */

 private $str_array = array();


 /**
  * @var bool $is_array 
  * 
  * Reminds if the parameter passed to the
  * constructor is an array, in order to provide 
  * the expected output when "get" method is called
  */

 private $is_array = false;


 /** 
  * The class constructor. We allow both
  * single strings and array of strings 
  * as class argument (for instance because
  * we want to perform similar operations on
  * multiple strings)
  *  
  * @param string|array $mixed A string or an array of strings 
  * @return $this Returns the class instance to allow method chaining 
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
  * Replaces one string with another (the subject
  * is the class argument)
  * 
  * @param string $a The string to search for
  * @param string $b The replacement string
  * @return $this Returns the class instance
  */

 public function replace($a,$b) {
   foreach($this->str_array as $key => $value)
    $this->str_array[$key] = str_replace($a,$b,$value);
  return $this;
 }


 /**
  * Prepends a string (prefix) to the class argument
  * 
  * @param string $prefix A string to prepend (add before)
  * to every string of the class argument 
  * @return $this Returns the class instance 
  */

 public function prefix($prefix) {
   foreach($this->str_array as $key => $value)
    $this->str_array[$key] = $prefix . $value;
  return $this;
 }



 /**
  * Appends a string (suffix) to the class argument
  * 
  * @param string $suffix A string to append (add after)
  * to every string of the class argument
  * @return $this Returns the class instance 
  */

 public function suffix($suffix) {
   foreach($this->str_array as $key => $value)
    $this->str_array[$key] = $value . $suffix;
  return $this;
 }



 /**
  * Given a path string provided in this form
  * /var/www/my_website/my_file.txt 
  * removes n levels from it
  * 
  * Removes from every string of the class argument
  * n items separated by the token '/' starting from
  * the right.
  * 
  * The method is used to get a path which is n levels up  
  * by a given path
  *
  * @param int $n The number of levels to go up
  * @return $this Returns the class instance  
  * 
  * @todo Add more controls where $n is greater than 
  * the array $array size
  */

 public function path_level_up($n = 1) {

  foreach($this->str_array as $key => $value) {
   $array = explode('/',$value);
   array_splice($array,-$n);
   $this->str_array[$key] = implode('/',$array);
  }

  return $this;
 }



 /**
  * Gets the left or right side of a string
  * by a specified token
  *  
  * @param string $tok The reference token
  * @param bool $left The left or right side 
  * ($left is false or the __RIGHT__ constant is used)
  * @param bool $last Uses as reference the last occurrence of 
  * the token symbol
  * @return $this Returns the class instance 
  */


 public function part($tok,$left = true,$last = false) {
  foreach($this->str_array as $key => $str) {
   $pos = (!$last ? strpos($str,$tok) : strrpos($str,$tok));

   if($pos !== false)
    $str = ($left ? substr($str,0,$pos) : substr($str,$pos + strlen($tok)));
   else
    $str = ($left ? $str : null);

   $this->str_array[$key] = $str;
  }

  return $this;
 }



 /**
  * Gets the left or right side of a string
  * by the last occurrence of a specific token
  * (this is a short call for the method above) 
  *  
  * @param string $tok The reference token
  * @param bool The left or right side
  * @return $this Returns the class instance 
  */

 public function rpart($tok,$left = true) {
  $this->part($tok,$left,true);
  return $this;
 }



 /**
  * Gets the content of the file path(s) corresponding
  * to the class argument
  * 
  * @return string Returns the file's contents
  */

 public function get_contents() {
  $output = '';
   foreach($this->str_array as $value) {
    if(file_exists($value))
     $output .= file_get_contents($value);
   }
  return $output;
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
 * This is a short for Str() without
 * using the 'new' operator
 * 
 * @param string $str The string to be
 * passed as class argument of Str
 */


function str($str) {
 return new Str($str);
}




/**
 * A simple interface to query the controller
 * related to a specific resource through Ajax
 */

class Controller {

 /**
  * Returns the data interpolated by the given
  * controller
  * 
  * @param string $scope The scope: by now expected to
  * be "pages" or "nodes": a "page" might contain multiple
  * nodes) 
  * 
  * @param string $namespace The specific "page" or "node"
  * (a subdirectory within the directory specified by
  * "scope") 
  * 
  * @param string $label The label of the portion of code
  * to be executed
  * 
  * @param array An associative array with values to be passed
  * to invoked controller
  *   
  * @param $post array An associative array with the values 
  * eventually taken from a FORM
  * 
  * @return array Returns an associative array with the
  * controller's output data (usually an interpolation of
  * data taken from a database)
  */

 public function get($scope,$namespace,$label,$values,$post = array()) {

  //default location for the controller's file
  include(__BASE_DIR__ . '/' . $scope . '/' . $namespace . '/controller.php');


  //return the result
  return $content($label,$values,$post);
 }

}



/**
 * A class providing an interface
 * with the server side javascript 
 * interpreter, and collecting all
 * the required resources, to be made
 * available both server and client
 * side.
 */

class Loader {


 /**
  * @var object $v8 The v8 instance taken from the outside
  */

 public $v8 = null;

 /**
  * @var string $content The output as text/html to be
  * used in the BODY section of the document
  */

 private $content = '';

 /**
  * @var array $files The scripts required by the application,
  * dynamically updated while the views are loaded, and to
  * be made available both server (as contents to be executed
  * by the javascript interpreter) and client side
  */

 private $files = array();

 /**
  * @var array $data the values provided by the controller
  * to be made available also to the client once that the page
  * is loaded
  */

 private $data = array();

 /**
  * @var array $html_data The objects (associative arrays)
  * associated to some HTML element's attributes: we allow to pass 
  * objects as values for HTML attributes, storing them in
  * the global scope and then referencing to them through an ID
  * stored as value of the HTML element itself. 
  * When the code is executed server side, we have to
  * codify such values inside the page itself (for instance
  * as JSON) and then restore them once the page is loaded.
 */

 private $html_data = array();


 /**
  * The class constructor. The class argument
  * is a list of files required at first by the
  * javascript interpreter (the list is dynamically
  * updated at run-time)
  * 
  * @param array $files A list of path of required files
  */

 public function __construct($files) {
  $this->files = $files;
 }


 /**
  * This method is called by sf.js (when executed server-side)
  * and records the results provided by the view's controllers,
  * as well as the objects (associative arrays)
  * passed as values of some HTML element's attribute.
  * 
  * @param string $context Can be "data" or "html" (since v. 0.1)
  * @param array $obj An associative array with the values to store
  * 
  * @todo The data's structure might not require a further
  * "interface" or interpolation
  */

 public function record_data($context,$obj) {
  switch($context) {

   case 'data' :
    $this->data[$obj->scope][$obj->namespace][$obj->label] = $obj->result;
   break;
 
   case 'html' :
    $this->html_data[$obj->key] = $obj->value;
   break;
  }
  
 }
 


 /**
  * This method is called by the __load__ function 
  * below in order to initialize the javascript
  * interpreter with the required scripts, and
  * to execute the javascript functions server-side
  * 
  * 
  * The method might be called recursively depending
  * on the server-side javascript implementation
  * (see below, method "add_script")
  *  
  * @param string $scope The "page" name (a directory 
  * within the folder "pages")
  * 
  * @param string $namespace The "node" name (a directory
  * within the folder "nodes")
  * 
  * @param string $label The label inside the switch of
  * the view enclosing the functions actually rendering it 
  * 
  */


 public function load($scope,$namespace,$label) {

  //the v8 instance already created
  $v8 = $this->v8;


  /**
   * @var string $js_scripts Contains the scripts to be included 
   * as strings by the server side javascript interpreter
   * This also includes the call to the function "Sf.render"
   * which starts the rendering process.
   */


  $js_scripts = '';

  foreach($this->files as $value) 
   $js_scripts .= str(__BASE_DIR__ . '/' . $value)->get_contents();

  $js_scripts .= 'Sf.render({scope: \'' . $scope . '\',namespace: \'' . $namespace . '\',label: \'' . $label . '\'});';


  // the resulting text/html string
  $this->content = $v8->executeString($js_scripts);

 }



 /**
  * Other files to be added dynamically as soon as 
  * they are required by the javascript views
  * interpreted server-side
  * 
  * @param $scope string The folder name within the
  * directory "pages"
  * 
  * @param $namespace string The folder name within
  * the directory "nodes"
  */

 public function add_script($scope,$namespace) {

  $path = $scope . '/' . $namespace . '/view.js';

  //add the path to the global resources
  $this->files[] = $path;


  //get the content of the script
  $js_scripts = str(__BASE_DIR__ . '/' . $path)->get_contents();

  
  //the v8 instance already created
  $v8 = $this->v8;


  /**
   * @todo ensure that the following variables
   * do not keep values recorded on previous
   * executions of the script 
   */

  $this->data = array();
  $this->html_data = array();



  /**
   * @var string $this->content Records the result
   * 
   * @todo check the internal functioning of
   * the "executeString" method.
   * It seems that we are not required to initialize
   * again the method "Sf.render" invoked by the "load"
   * method above.
   * However this behaviour could be different on
   * different server-side javascript implementations 
   * and we might be required to call the "load"
   * method recursively
   */

  $this->content = $v8->executeString($js_scripts);
 }



 /**
  * All the resources, in terms of required scripts
  * and data, required by the HTML document
  * 
  * @return array Returns the resources actually required by
  * the document, with the aim to make them available also 
  * client side
  */

 public function get_resources() {
  return array('files' => $this->files,'html_data' => $this->html_data,'data' => $this->data);
 }


 /**
  * Returns the resulting text/html to be
  * used in the BODY section of the document 
  * 
  * @return string Returns the overall text/html
  * containing all the rendered / nested views of
  * the HTML document
  */

 public function get_content() {
  return $this->content;
 }

}



/**
 * This is the function actually called from the
 * outside in order to start all the rendering
 * process.
 *
 * In order to render the entire document (which 
 * is represented as views encapsulated into each other)
 * we have to render the most external view first.
 * 
 * 
 * @param string $scope The page name (a directory 
 * within the folder "pages")
 * 
 * @param string $namespace The "node" name (a directory
 * within the folder "nodes")
 * 
 * @param string $label The label inside the switch of
 * the view enclosing the functions actually rendering it 
 *
 * 
 * @param array $options An associative array containing
 * more settings. For instance the version of the
 * website, used to force the client to reload all the website's
 * resources at every new version of it.
 * 
 * @todo Before $options we should have an associative
 * array $values, with values optionally passed to the view
 * 
 * 
 * @return array Returns an associative array with the following keys:
 * 
 * 'head' : the output portion to be inserted in the head section of the document
 * 
 * 'body': the output portion to be inserted in the body section of the document
 * 
 * 'script': the output portion to be inserted at the end of the body section of the document
 * 
 * 
 * The head portion contains the resources to be made
 * available to the client 
 * 
 * (mainly scripts and stylesheets, already codified in
 * the proper html tags)
 * The body section contains the content of the views as text/html
 * 
 * The script portion contains inline scripts with
 * the data to be made available to the client once the
 * page is loaded
 * 
 */

function __load__($scope,$namespace,$label,$options = array()) {

 $options = array_merge(array('version' => ''),$options);


 /**
  * @var object $v8 A new instance of the javascript interpreter
  */

 $v8 = new V8Js();

 /**
  * @var object $loader The instance of loader,
  * initialized with some required files
  */

 $loader = new Loader(array(
'third_parties/third_parties.js'
,'html.js'
,'sf.js'));


 /** 
  * @var callable $v8->loader 
  * We add the instance of the class "Loader"
  * to the $v8 object in order to call its 
  * methods from inside the javascript code
  */

 $v8->loader = $loader;


 /**
  * @var callable $v8->controller
  * We add an instance of the class "Controller"
  * to the $v8 object in order to call its 
  * methods from inside the javascript code
  */


 $v8->controller = new Controller;


 /**
  * @var callable $loader->v8 
  * We add the $v8 instance among the properties
  * of the instance of the Loader class to reuse the same 
  * v8 object on further calls of the methods
  * of the Loader class' instance 
  */

 $loader->v8 = $v8;



 //begin the rendering process, interpreted
 //server-side

 $loader->load($scope,$namespace,$label);


 /**
  * @var array $resources The required resources 
  * identified and "grown" at run-time
  */

 $resources = $loader->get_resources();


 /**
  * @var string $body The content of the body
  * section of the document
  */

 $body = $loader->get_content();



 /**
  * @var string $head The content of the head portion 
  * of the document created on the basis of the required
  * resources, plus the assumption (verified by the script 
  * below) of a set of files related to every view 
  */


 $head = '';


  /**
   * @var array $files_default At the moment, inside the
   * path of every view, we search also for a "style.php"
   * file, and a "validate.js" file.
   * 
   * @todo The list of expected / standard files could
   * be extended.
   * 
   */


  $files_default = array(
array('style.php','css')
,array('validate.js','js')
//...
);


  $paths = array();

  foreach($resources['files'] as $value) {
   
   $path = str($value)->path_level_up()->get();

   if(!in_array($path,$paths))
    $paths []= $path;

   $head .= '<script type="text/javascript" src="' . $value . (!empty($options['version']) ? '?' . $options['version'] : '') . '"></script>';

  }

  foreach($paths as $path) {

   foreach($files_default as $value) {

    if(file_exists(__BASE_DIR__ . '/' . $path . '/' . $value[0])) {
 
     $file_name = str($value[0])->rpart('.',__LEFT__)->get();

     $path_ = ($path ? $path . '/'  : '') . $file_name . '.' . $value[1] . (!empty($options['version']) ? '?' . $options['version'] : '');

     switch($value[1]) {

      case 'css' :
       $head .= '<link rel="stylesheet" href="' . $path_ . '" type="text/css">';
      break;

      case 'js' :
       $head .= '<script type="text/javascript" src="' . $path_ . '"></script>';
      break;
     }
    }
   }

  };




 /**
  * @var string $script The content of the script portion
  * to be added at the end of the body section of the document, 
  * created from the data actually required by
  * the rendered view to be made available also client-side.
  * 
  * Note that the inline scripts contain the call for
  * a function which will restore such data into the
  * proper javascript object once that the page will load
  */



 $script = '';


 if(!empty($resources['data']) || !empty($resources['html_data'])) {

  $script .= '<script type="text/javascript">';

  if(!empty($resources['data']))
   $script .= 'Sf.restore_data(\'data\',\'' . base64_encode(json_encode($resources['data'])) . '\');';

  if(!empty($resources['html_data']))
   $script .= 'Sf.restore_data(\'html\',\'' . base64_encode(json_encode($resources['html_data'])) . '\');';

  $script .= '</script>';

 }


 return array($head,$body,$script);
}


