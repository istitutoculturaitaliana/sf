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

include 'browser.php';




// we must specify the content-type to
// let the client interpreting it correctly
header('Content-type: text/css');


//FOLLOWS A "CSS-RESET" VALID FOR THE ENTIRE WEBSITE

echo '


html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video, a {
 margin: 0;
 padding: 0;
 border: 0;
 outline: 0;
 font-size: 100%;
 vertical-align: baseline;
 background: transparent;
}


body {
 line-height: 1;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section { 
 display: block;
}

nav ul {
 list-style: none;
}

blockquote, q {
 quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
 content: "";
 content: none;
}


/* change colours to suit your needs */
ins {
 background-color: #ff9;
 color: #000;
 text-decoration: none;
}

/* change colours to suit your needs */
mark {
 background-color: #ff9;
 color: #000; 
 font-style: italic;
 font-weight: bold;
}

del {
 text-decoration: line-through;
}

abbr[title], dfn[title] {
 border-bottom: ' . __px__(1) . ' dotted;
 cursor: help;
}

table {
 border-collapse: separate;
 border-spacing: 0;
 cell-spacing: 0;
 cell-padding: 0;
}

/* change border colour to suit your needs */
hr {
 display:block;
 height:' . __px__(1) . ';
 border:0; 
 border-top:' . __px__(1) . ' solid #000;
 margin: 1em 0;
 padding: 0;
}

input, select {
 vertical-align: middle;
}



/*
select[size] {
 appearance: list-menu;
 display: inline-block;
 height: attr(size,em);
 box-sizing:content-box;
}
*/



h1 {
 margin: ' . __px__(21.4333,0) . ';
 font-size: ' . __px__(32) . '; 
}

h2 {
 margin: ' . __px__(19.9167,0) . ';
 font-size: ' . __px__(24) . '; 
}

h3 {
 margin: ' . __px__(18.7167,0), ';
 font-size: ' . __px__(18.7167,0) . '; 
}

p {
margin:' . __px__(16) . ' 0;
}

hr {
 margin:' . __px__(8) . ' 0;
}


th,td {
 vertical-align: middle;
}


th {
 padding:' . __px__(8) . ';
}


';

