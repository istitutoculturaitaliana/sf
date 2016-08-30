<?php


/**
 * This is the file corresponding to
 * the website homepage -- and the router
 * (at the moment implemented as a simple
 * .htaccess file in the root folder)
 * will redirect here the following urls:
 *
 * /		//a blank url
 * /index, 
 * /index.htm
 * /index.html
 * /home
 * 
 * @package SF (Simple Framework)
 */



/**
 * The main application file
 */


include('../../sf.php');


/**
 * @var array $options 
 * Contains some option by default
 * to be passed to the load function.
 * One important is the (website) version,
 * used to force the client to reload
 * all the resources at every new 
 * version or new implementation 
 * of the website.
 * 
 * There aren't other possible options at version 0.1
 */



$options = array(
 'version' => '2016-08-25'
);

list($head,$body,$script) = __load__('pages','home','page_layout',$options);


echo '<!DOCTYPE html>';
echo '<head>';
echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';

echo $head;

echo '</head>';
echo '<body>';

echo $body;

echo $script;

echo '</body>';
echo '</html>';

