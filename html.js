/** 
 * 
 * @fileoverview
 * 
 * This is a collection of simple utilities
 * to easily render html elements, like tables, 
 * forms, selects, and more.
 * 
 * The script does not assume the existence of
 * the DOM and therefore can be executed both
 * client and server-side
 * 
 * 
 * @package SF (Simple Framework)
 * @copyright (C) 2016 Institute of Italian culture (NGO)
 * @see {@link https://istitutoculturaitaliana.org/sf|www.istitutoculturaitaliana.org/sf}
 * @author Thomas de Vivo <tdvit@mail.com>
 * @version 0.1
 * @licence public. This is an open source software 
 * conceived within the frame of the Institute of 
 * Italian culture (NGO), and originally 
 * implemented by Thomas de Vivo (tdvit@mail.com) 
 * It is published under the following license:
 * everyone can copy, use, modify and redistribute this
 * software provided that every copy of it (including the
 * partial use of its code) will retain the current disclaimer 
 * or in this form, or using the following short notice:
 * 
 * "(C) 2016 Institute of Italian culture (NGO)
 *  -- www.istitutoculturaitaliana.org/sf"
 * 
 * (even compacted in one line) 
 * (the provided link will contain a description of the software
 * and the complete license.)
 * 
 * The software is provided "as is": without any warranty
 * (including its eligibility for whatever kind
 * of purpose), and both the copyright owners and the
 * contributors are excluded from any liability
 * related to the use of it, even if instructions 
 * and recommendations of use will be provided
 * with such software or any derivative or 
 * related work.
 * 
 */



/** @namespace */
var Html = {};




/**
 *  Creates a 13 cyphers ID.
 *  The first 5 cyphers are a random
 *  integer,
 *  and the following 8 cyphers 
 *  are the microtime (the current time
 *  expressed in milliseconds) sliced 
 *  of the first 5 cyphers)
 *  
 *  @kind function
 *  @return {int} Returns a 13 cyphers ID
 */


Html.id = function() {
 return (Math.random() + '').slice(2).substr(0,5) + (new Date().getTime() + '').slice(5);
};



/**
 *  @type {object}
 *  @desc 
 *  
 *  A cache for objects passed as argument of some
 *  HTML element attribute.
 *  We store an ID on the element,
 *  and the data in such object
 *  associated to that ID
 */


Html.data = {};


/**
 * 
 *  @class 
 * 
 *  @classdesc 
 *  A class to render the opening tag of
 *  HTML elements (as well as empty tags)
 *  with a set of attributes / values
 *  specified in the provided object
 * 
 *  @param {string} element The name of the tag
 *  @param {object} obj An object with keys / values
 *  to be applied to the HTML element
 * 
 *  @return {object} The class instance to
 *  allow method chaining 
 * 
 */

Html.Element = function(element,obj) {

 this.element = element;
 this.obj = obj || {};


 var content = '';
 content += '<' + this.element;

 for(var i in this.obj) {

  //the value is a string or a number
  if(typeof this.obj[i] != 'object') {
   content += "\x20" + i + '="' + this.obj[i] + '"';

  //the value is an object
  } else {

  /*
   *  instead encoding the value for instance
   *  in base64, once stringified, we store an
   *  ID as attribute value, and we cache 
   *  the value in a global variable associated
   *  to that ID. 
   */

   var id = Html.id();

   //cache the object

   if(!Sf.server_side())
    Html.data[id] = this.obj[i];
   else
    PHP.loader.record_data('html',{key: id, value: this.obj[i]});

   this.obj[i] = id;

   //add the proper information
   //on the element

   content += "\x20" + i + '=""';
   content += "\x20" + i + '-id="' + this.obj[i] + '"';
  }

 }


 /**
  * Inserts a content inside the element
  * and returns it as text/html
  * 
  * @method html
  * @memberof Html.Element
  * @param {string} html Inner html
  * @return {string} The element as text/html 
  */


 this.html = function(html) {
  content += '>' + html + '</' + this.element + '>';

  return content;
 };


 /**
  * @method get
  * @desc Gets the opening tag (whitout inner html),
  * optionally adding the self-closing token
  * 
  * @memberof Html.Element
  * @param {bool} close Closes the opening tag if true,
  * otherwise leaves it open (in this case the content 
  * and the closing 
  * tags will be added in a second time or by another
  * function) 
  * 
  * @return {string} Returns the HTML element as text/html
  */

 this.get = function(close) {
  return content + (typeof close == 'undefined' || close ? '/' : '') + '>';
 };


 return this;
};




/**
 * A function to instantiate the Html.Element
 * class without using the 'new' operator
 * 
 * @param {object} obj The attributes / values to
 * be applied to the HTML element
 * 
 * @return {object} An instance of the class Html.Element
 * passing the provided parameters to the 
 * constructor
 */

Html.element = function(element,obj) {
 return new Html.Element(element,obj);
};





/**
 * 
 * Creates a standard select with standard and
 * custom properties.
 * 
 * @param {Object} obj An object with the following properties.
 * 
 * @param {String} obj.name The name attribute of the select
 * @param {String} obj.select_label The select label
 * @param {String} obj.selected_item The selected option (key)
 * @param {Boolean} obj.select_one Choose whether to display the option '[select one]' (in the current language) as first option of the select. This is useful when the default value of the field is null
 * @param {Object} obj.items an object With keys and values of the options
 * @param {String} obj.<string>property_name Whatever other attribute e.g. style, class, id, onchange, data, ... (including custom attributes) 
 * 
 * 
 * 
 * @example 
 * 
 * //returns a select element with the options listed in items
 * 
 * var html = Html.select_standard({
 * 
 *  //default properties
 * 
 *  name: 'friends'
 *  ,select_label: 'my friends'
 *  ,selected_item: ''
 *  ,select_one: true
 *  ,items: {
 * 	'Chiuini Shin': 'Paolo'
 * 	,'Bagration-Davitashvili': 'Mika'
 * 	,'Boissonnas': 'Rémi'
 * }
 * 
 * 
 * //any other attribute, e.g. style, class, data, id, ... (including custom attributes) 
 * 
 *  ,onchange: 'friends_onchange(this)'
 *  ,style: ''
 *  ,'class': 'my_select'
 * 
 * });
 * 
 * 
 * 
 * document.write(html);
 * 
 * 
 * //the resulting HTML
 * 
 * <select name="friends" onchange="friends_onchange(this)" style="" class="my_select">
 *   <optgroup label="my friends">
 *     <option value="">[Select one]</option>
 *     <option value="Chiuini">Paolo</option>
 *     <option value="Bagration-Davitashvili">Mika</option>
 *     <option value="Boissonnas">Rémi</option>
 *   </optgroup>
 * </select>
 * 
 * 
 * 
 *  @return {String} Returns the select element as plain html
 */

Html.select_standard = function(obj) {

 var obj = obj || {};


 var obj_ = {
  name: ''
  ,select_label: ''
  ,selected_item: ''
  ,select_one: false
  ,items: {}
 };


 //merge the two objects
 obj = Sf.obj(obj).merge(obj_).get();


 //filter
 var keys = Sf.obj(obj_).keys_to_array().delete('name').get();
 var obj__ = Sf.obj(obj).filter(keys).get();


 var content = '';

 content += Html.element('select',obj__).get(false);



 if(obj.select_label)
  content += '<optgroup label="' + obj.select_label + '">';

 /*
  *  @todo Implement multi-language messages
  */

 if(obj.select_one)
  content += '<option value="">[select one]</option>';


 for(var i in obj.items) 
  content += '<option value="' + i + '"' + (i != obj.selected_item ? '' : ' selected') + '>' + obj.items[i] + '</option>';


 if(obj.select_label)
  content += '</optgroup>';


 content += '</select>';


 return content;
};






/**
 * 
 * @classdesc 
 * Creates an html table.
 * The method offers two different ways to create html tables.
 * The first (see example 1) is conceived to easily render
 * tables of fixed length, for istance in order to display 
 * html layouts.
 * 
 * The second (see example 2) is conceived to render tables
 * of any length, to be used to display data structures.
 * 
 * 
 * @class 
 * @param {Object} obj An object with custom keys / values to be used as attribute for the table element
 * @return {Object} Returns the current table "class" object, used to allow method chaining
 * 
 * 
 * @example 1 layout table (method chaining)
 * 
 * 
 * 
 * var output = new Html.table({class: 'my_table'})
 * 
 * //row 1
 * .row({'data-row': 'row-1'}).cells([
 * 	['row 1 left column',{class: 'my_cell'}]
 * 	,['row 1 right column',{class: 'my_cell'}]
 * 
 * //row 2
 * ]).row({'data-row': 'row-2'}).cells([
 * 	['row 2 left column',{class: 'my_cell'}]
 * 	,['row 2 right column',{class: 'my_cell'}]
 * ]).get();
 * 
 * 
 * 
 * document.write(output);
 * 
 * 
 * 
 * //the resulting HTML
 * 
 * 
 * 
 * <table class="my_table">
 *  <tbody>
 *   <tr data-row="row-1">
 *    <td class="my_cell">row 1 left column</td>
 *    <td class="my_cell">row 1 right column</td>
 *   </tr>
 *   <tr data-row="row-2">
 *    <td class="my_cell">row 2 left column</td>
 *    <td class="my_cell">row 2 right column</td>
 *   </tr>
 *  </tbody>
 * </table>
 * 
 * 
 * 
 * 
 * 
 * @example 2 data structures 
 * 
 * // data usually taken from a database
 * 
 * var my_array = [
 *  {id:1, name: 'Thomas', 'email': 'thomas@mail.com'}
 *  ,{id: 2, name: 'Marco', 'email': 'marco@mail.com'}
 *  ,{id: 3, name: 'Luca', 'email': 'luca@mail.com'}
 * ];
 * 
 * 
 * 
 * var table = Html.table({class: 'my_table'});
 * 
 * 
 * // heading
 * var tr = table.row({'data-row': 'heading'});
 * 
 * tr.cell('name',{class: 'my_cell_heading'});
 * tr.cell('email',{class: 'my_cell_heading'});
 * 
 * 
 * for(var i in my_array) {
 * 
 *  //create row
 *  var tr = table.row({'data-row': 'row-' + i});
 * 
 *  var obj = my_array[i];
 * 
 *  //create columns
 *  tr.cell(obj.name,{style: (obj.id != 1 ? '' : 'color:red'), class: 'my_cell'});
 *  tr.cell(obj.email,{class: 'my_cell'});
 * 
 * }
 * 
 * 
 * 
 * var output = table.get({output: 'html'});
 * 
 * 
 * 
 * document.write(output);
 * 
 * 
 * //the resulting HTML
 * 
 * <table class="my_table">
 *   <tbody>
 *     <tr data-row="heading">
 *       <td class="my_cell_heading">name</td>
 *       <td class="my_cell_heading">email</td>
 *     </tr>
 *     <tr data-row="row-0">
 *      <td class="my_cell" style="color:red">Thomas</td>
 *       <td class="my_cell" style="">thomas@mail.com</td>
 *     </tr>
 *    <tr data-row="row-1">
 *       <td class="my_cell" style="">Marco</td>
 *       <td class="my_cell" style="">marco@mail.com</td>
 *     </tr>
 *     <tr data-row="row-2">
 *       <td class="my_cell" style="">Luca</td>
 *       <td class="my_cell" style="">luca@mail.com</td>
 *     </tr>
 *   </tbody>
 * </table>
 * 
 */



Html.Table = function(obj) {

 var content = '';

 content += Html.element('table',obj).get(false);


 var obj = obj || {};


 this.row_number = 0;


 /**
  *  Creates a table row
  * 
  *  @method row 
  *  @memberof Html.table
  *  @param {Object} obj An object with custom keys / values to be used as attributes of the tr element (e.g. style, class, data, and so on)
  *  @returns {Object} Returns an object with various methods (cell and cells)
  */

 this.row = function(obj) {

  if(this.row_number > 0)
   content += '</tr>';

  var output_obj = {this_: this};


  output_obj.cell_number = 0;


  this.row_number++;

  var obj = obj || {};

  content += Html.element('tr',obj).get(false);



 /**
  * Creates a single cell (data structure)
  * 
  * @name cell
  * @method cell  
  * @memberof Html.table.row
  * @param {Object} obj An object with custom keys / values to be used as attributes of the td element (e.g. style, class, data, and so on)
  * @return {Object} Returns the current table "class" object, to allow method chaining
  */

  output_obj.cell = function(content_,obj) {


   this.cell_number++;

   var obj = obj || {};

   content += Html.element('td',obj).get(false);


   content += content_;   
   content += '</td>';

   return this;
  };



 /**
  * Creates multiple cells
  * 
  * @name cells   
  * @method cells   
  * @memberof Html.table.row
  * @param {Array} array An array with the content of each cell and its attriburs
  * @param {String} array.[n][0] The content of the 'n' cell 
  * @param {Object} array.[n][1] The attributes object of the 'n' cell
  * @return {Object} Returns the current table "class" object, to allow method chaining
  */

  output_obj.cells = function(array) {


  for(var i in array) {

   var value = array[i];


   this.cell_number++;

   var obj = value[1] || {};


   content += Html.element('td',obj).get(false);


   content += value[0];   
   content += '</td>';

 
  }

  return this.this_;
 };



  return output_obj;
 };




 /**
  * Gets the result
  * 
  * @memberof Html.table
  * @method get
  * @param {Object} obj Object used to define options
  * @param {Object} obj.output Obj.output can be either 'html' or 'element'
  * @return {String|Object} Returns the table as HTML string or the DOM element
 */


 this.get = function(obj) {

  var obj = obj || {};

  if(this.row_number > 0)
   content += '</tr>';

  content += '</table>';

  return content;

 };
 

 return this;
};



/**
 * A function to instantiate the Html.Table 
 * class without using the 'new' operator
 * 
 * @param {object} obj The attributes / values to
 * be applied to the HTML element
 * 
 * @return {object} An instance of the class Html.Table 
 * passing the provided object to the 
 * constructor
 */


Html.table = function(obj) {
 return new Html.Table(obj);
};

