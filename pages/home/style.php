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
 * @var array $fonts 
 * As associative array with as keys
 * the font names to be used in the HTML
 * document, and
 * as values the path to their ttf file
 */


$fonts = array(
'liberation'		=> 	'liberationsans-regular-complete.ttf'
,'fontawesome'		=> 	'fontawesome-webfont.ttf'
,'mono_complete'	=> 	'liberationmono-regular-complete.ttf'
,'computer_modern'	=> 	'cmunrm.ttf'
,'cmu-serif'		=> 	'cmunrm.ttf'
,'hand_drawn'		=> 	'italianno-regular-webfont.ttf'
);


foreach($fonts as $key => $value) {
 
 __css__(array(

'@font-face' => array(
 'font-family' => $key 
 ,'src' => 'url(\'third_parties/fonts/' . $value . '\') format(\'truetype\')'
 ,'font-style' => 'normal'
 ,'font-weight' => 'normal'
 )

));

}




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

'body' => array(
 'font-family' => 'liberation,arial'
 ,'margin' => '0'
 ,'background-color' => '#f5f5f5'
)


,'h1' => array(
 'color' => '#4183C4'
)



,'.container_header' => array(
'background-color' => '#5EC66D'
,'height' => '200px'
,'padding' => '24px'
,'border-bottom' => '3px solid #D14F41'
)


,'.container_body' => array(
'background-color' => 'white'
,'padding' => '24px'
)

,'.container_footer' => array(
'background-color' => '#f5f5f5'
,'height' => '200px'
,'padding' => '24px'
,'border-top' => '3px solid #D14F41'
)



));



// we must specify the content-type to
// let the client interpreting it correctly

header('Content-type: text/css');


/*
 * a call to the function declared in
 * [base_dir]/browser.php
 */

echo __css__render();


