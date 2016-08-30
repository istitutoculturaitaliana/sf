<?php


/**
 * A stylesheet which can be interpolated
 * through PHP using the functions offered
 * by browser.php 
 * 
 * This file will be served to the
 * client as style.css (see .htaccess file)
 * 
 * @package browser.php 
 */



/**
 * Load the required library. We don't use
 * "sf.php" but "browser.php", which contains a 
 * subset of the functions there used, plus
 * specific functions to handle stylesheets
 * browser-targetted
 */


include '../../browser.php';


/**
 * A call to the function __css__
 * 
 * The parameter is an array with
 * selector or list of selectors as keys, and
 * an associative array with the related attributes
 * and their values, as values
 * 
 * Note that for instance values expressed
 * in pixels might be further interpolated
 * by the function (on the basis of the 
 * specified zoom-factor) and generic, unprefixed
 * attributes, might be interpolated depending on 
 * the detected user agent.
 */


__css__(array(


'.my_table' => array( 
 'border-collapse' => 'collapse'
)

,'.my_header_row' => array(
 'background-color' => '#ddd'
 ,'font-weight' => 'bold'
)

,'.my_cell,.my_cell_heading' => array( 
 'padding' => '12px'
 ,'border' => '1px solid #aaa'
)



));



// we must specify the content-type to
// let the client interpreting it correctly

header('Content-type: text/css');


/**
 * a call to the function declared in
 * [base_dir]/browser.php
 */

echo __css__render();


