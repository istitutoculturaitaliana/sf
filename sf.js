
/**
 * 
 * @fileoverview
 * 
 * This is the main client-side file
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
 * @author thomas-topway.it <thomas.topway.it@mail.com>
 * @version 0.1
 * @licence This is an open source software 
 * conceived within the frame of the Institute of 
 * Italian culture (NGO), and originally 
 * implemented by Tommaso de Vivo (tdvit@mail.com) 
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



/**
 * 
 * @namespace
 * 
 */


Sf = {};



/**
 * @type {object}
 * @desc Object containing
 * all the controllers' data
 */

Sf.data = {};



/**
 * @type {array} 
 * @desc An array with the identification of 
 * all the controllers to be queried through
 * Ajax
 */

Sf.queue = [];


/**
 *   
 * @type {object} 
 * @desc An object with the callable functions of 
 * all the views to be rendered. 
 */

Sf.view = {};


/**
 * @type {object} 
 * @desc An object similar
 * to Sf.view, with the callable functions
 * used to validate FORMS
 */

Sf.validation = {};



/**
 * Check if the script is executed server side
 * @return {bool} Returns true if server side and false if
 * client side
 */


Sf.server_side = function() {
 return (typeof window == 'undefined' || typeof PHP != 'undefined');
};


/**
 * A "negative" alias of the function above: 
 * check if the script is executed client-side
 *
 * @return {bool} Returns true if client side and false if
 * server side
 *
 */

Sf.client_side = function() {
 return !Sf.server_side();
};



/**
 * This function will restore client-side
 * the controllers data used server-side
 * at run-time
 *
 * @param {string} context 
 * Can be "data" or "html": "data"
 * are the controllers data and "html" the
 * data related to the HTML elements  
 * (see Html.js: we allow the use of javascript
 * objects as element's attributes,
 * without the need to encode them within
 * the HTML element itself)
 *
 * @param {object} data A base64 encoded 
 * stringified JSON object --- such data will
 * be written in the static HTML document
 * inside a script tag
 * 
 */

Sf.restore_data = function(context,data) {

 switch(context) {
  case 'data' :
   Sf.data = Sf.str(data).base64_decode().json_decode().get();
  break;

  case 'html' :
   Html.data = Sf.str(data).base64_decode().json_decode().get();
  break;
 } 


};




/**
 * @classdesc A class to easily handle strings
 * and to group string-related functions
 * 
 * @class
 * 
 * 
 * @param {string} str The string passed
 * to the constructor, hereinafter 
 * indicated as "class argument"
 * 
 * @return {object} the class instance to
 * allow method chaining
 * 
 */

Sf.Str = function(str) {

 var str_ = (str ? str + '' : '');

 /**
  * @method tag_enclose 
  * Encloses the class argument with html tags
  * 
  * @param {string} tag The tag name
  * @param {object} obj An object containing 
  * a set of attributes / values to be applied 
  * to the html element
  * 
  * Note that the method uses the function 
  * Html.element allowing to pass native 
  * objects as values of the html attributes.
  * (see Html.element to find out more)
  *
  * @return {object} Returns the class instance
  * to allow method chaining
  */
 
 this.tag_enclose = function(tag,obj) {
  str_ = Html.element(tag,obj).html(str_);
  return this;
 };


 /**
  * @method trim
  * Ensures that the class argument string is
  * without blank characters on its boundaries
  *
  * @return {object} Returns the class instance
  */

 this.trim = function() {
  if(str_)
   str_ = str_.replace(/^\s\s*/,'').replace(/\s\s*$/,'');
  return this;
 };


 /**
  * @method in_array
  * @param {array} array The array where to search for 
  * the class argument 
  * @return {bool} Returns true if the class argument is 
  * found in the array, otherwise returns false
  */

 this.in_array = function(array) {
  for(var i in array) {
   if(str_ == array[i])
    return true;
  }
   return false;
 };


 /**
  * @method json_decode
  * @return {object} Returns a new Sf.Obj
  * with the decoded JSON string as 
  * class argument
  * 
  * @todo Use a "polyfill" implementation 
  * where the JSON object is not available
  */

 this.json_decode = function() {
  return Sf.obj(JSON.parse(str_));
 };


 /**
  * @method base64_encode
  * @return {string} Returns the encoded class argument
  */

 this.base64_encode = function() {
  if(window && window.btoa)
   return window.btoa(str_);
  else
   return Third_parties.base64_encode(str_);
 };


 /**
  * @method base64_decode Decodes a base64 encoded 
  * class argument
  * @return {object} Returns the class instance
  * 
  * @todo Check if the class argument is actually
  * a well formed base64 encoded string before
  * decoding
  */

 this.base64_decode = function() {
  if(window && window.atob)
   str_ = window.atob(str_);
  else
   //this is a "polyfill" implementation 
   str_ = Third_parties.base64_decode(str_);
  return this;
 };


 /**
  * @method get
  * Returns the transformed class argument
  * @return {string} Returns the transformed class argument string
  */

 this.get = function() {
  return str_;
 };



 return this;

};




/**
 * @classdesc
 * A class to easily handle objects and
 * to group object-related functions 
 * 
 * @class
 * 
 * @param {object} obj The object passed
 * to the constructor, hereinafter 
 * indicated as "class argument" 
 * 
 * 
 * @return {object} the class instance to
 * allow method chaining
 */

Sf.Obj = function(obj) {
 
 var obj = obj || {};

 // we work on a copy

 var obj_ = {};
 for(var i in obj) 
  obj_[i] = obj[i];


 /**
  * @method stringify
  * Encodes the class argument into a 
  * JSON string
  * 
  * @return {string} Returns a new instance
  * of Sf.str (see below) with the encoded
  * string as class argument
  */

 this.stringify = function() {
  var str = JSON.stringify(obj_);
  return Sf.str(str);
 };


 /**
  * @method json_encode
  * Alias for this.stringify
  */

 this.json_encode = this.stringify;


 /**
  * @method merge
  * Merges the provided object with the
  * class argument (if the merge object has 
  * same keys of the class argument, the values
  * of the latter will be overwritten)
  * 
  * @param {object} obj The object to be merged
  * @return {object} Returns the class instance
  */


 this.merge = function(obj) {
  for(var i in obj) {
   if(!obj_.hasOwnProperty(i))
    obj_[i] = obj[i];
  }

  return this;
 };


 /**
  * @method filter
  * Removes from the class argument the 
  * keys equal to the values of the
  * provided array
  * 
  * @param {array} array The array with keys to filter
  * @return {object} returns the class' instance
  */

 this.filter = function(array) {
  for(var i in array) {
   if(obj_.hasOwnProperty(array[i]))
    delete obj_[array[i]];
  }

  return this;
 };


 /**
  * @method size
  * @return {int} Returns the size of the class
  * argument 
  */

 this.size = function() {
  var n = 0;
  for(var i in obj_) 
   n++;
  return n;
 };



 /**
  * @method keys_to_array
  * Returns an array whose values are
  * the properties / keys of the class argument
  * 
  * @return {object} Returns a new instance of
  * the Sf.array object with the array of
  * keys as class argument
  */

 this.keys_to_array = function() {
  var output = [];

  for(var i in obj_) 
   output.push(i);

  return Sf.array(output);
 };


 /**
  * @method join
  * Joins an object in a similar
  * way as an array. The 
  * keys / properties of the object will
  * be lost
  * 
  * @return {object} Returns a new instance of
  * the Sf.str object with the array of values
  * as class argument
  */

 this.join = function(token) {
  var array = [];
   for(var i in obj_) 
    array.push(obj_[i]);

  return Sf.str(array.join(token));
 };


 /**
  * @method assert_m_prop
  * Ensures that all the values
  * listed in the provided array 
  * exist as multidimensional (nested) properties
  * of the class argument
  * 
  * @param {array} array An array of strings.
  * Each string represents the name of a nested property
  * of the class argument object 
  * 
  * @return {object} Returns the class instance
  */

 this.assert_m_prop = function(array) {
  
  var obj = obj_;

  for(var i in array) {
   if(!obj.hasOwnProperty(array[i]))
    obj[array[i]] = {};

   obj = obj[array[i]];
  }

  return this;
 };


 /**
  * @method get
  * @return {object} Returns the trasformed object
  */

 this.get = function() {
  return obj_;
 };


 return this;

};





/**
 * @class
 * 
 * @classdesc 
 * A class to easily handle arrays
 * and to group array-related functions
 * 
 * 
 * @param {array} array The array passed
 * to the constructor, hereinafter  
 * indicated as "class argument"
 * 
 * 
 * @return {object} the class instance to
 * allow method chaining
 */


Sf.Array = function(array) {
 
 var array = array || [];

 //we work on a copy

 var array_ = [];
 for(var i in array) 
  array_.push(array[i]);


 /**
  * @method isset Checks if the lenght
  * of the class argument array 
  * is greater than a specified index
  * 
  * @param {int} i The index value 
  * @return {bool} Return true if the index exists,
  * otherwise returns false
  */

 this.isset = function(i) {
  return (i < array_.lenght -1);
 };


 /**
  * @method for_each
  * A simple iterator
  * @param {function} funct The function to be executed on 
  * every key / value of the array
  * @args {array} args The arguments to be passed to that function. 
  * The current key and value (respectively) will be
  * prepended by default to the custom arguments list
  * @return {object} Returns the class instance
  */

 this.for_each = function(funct,args) {
  var context = null;
  for(var i in array_) 
   funct.apply(context,Sf.array([i,array_[i]]).merge(args).get());
  return this;
 };


 /**
  * @method merge
  * Merges the provided array with the class argument 
  * @param {array} array The array to merge with-
  * @return {object} Returns the class instance
  */

 this.merge = function(array) {
  for(var i in array)
   array_.push(array[i]);
  return this;
 };


 /**
  * @method delete
  * Deletes the specified value from the class argument 
  * @param {mixed} value The value to be deleted
  * @return {object} Returns the class instance
  */

 this.delete = function(value) {
  for(var i in array_) {
   if(array_[i] == value)
    delete array_[i];
  }

  return this;
 };


 /**
  * @method stringify   
  * Encodes the class argument in a  
  * JSON string
  * 
  * @return {string} Returns a new instance
  * of Sf.str (see above) with the encoded
  * string as class argument
  */

 this.stringify = function() {
  var str = JSON.stringify(array_);
  return Sf.str(str);
 };


 /** 
  * @method json_encode 
  * Alias for this.stringify
  */

 this.json_encode = this.stringify;


 /**
  * @method list
  * Transforms the class argument 
  * in an object with the provided property names
  * (the values with index greater than the 
  * provided array will be discarded) 
  * 
  * @param {array} array An array of property / key names
  * @return {object} Returns a new instance of the 
  * Sf.obj (see above) with the new object as
  * class argument
  */

 this.list = function(array) {
  var obj = {};

  for(var i in array) 
   obj[array[i]] = array_[i];

  return Sf.obj(obj);
 };


 /**
  * @method get
  * @returns array Returns the transformed class argument 
  */

 this.get = function() {
  return array_;
 };


 return this;

};



/**
 * @classdesc 
 * 
 * A class to easily select DOM elements
 * and to group DOM selectors and DOM
 * manipulation functions
 * 
 * Sf encourages to make a moderate
 * use of CSS selectors to not bound
 * the programming / structure of a web 
 * application to its design / style.
 * 
 * Specifically, CSS selectors using
 * tag and class names should be used only
 * when the transformation concerns the style
 * / class of the element,
 * while in all other cases we should rely
 * on the id or some custom attribute.
 * 
 * In no cases we should identify an element
 * by its class or tag name when is not concerned 
 * a modification of specifically its style,
 * because the class name and even the tag (and
 * their hierarchy) could change for purposes of design.
 * 
 * In short, CSS selectors, or native, or
 * through Sizzle (incorporated by JQuery) should be used by
 * the design department *on top* of the application,
 * while the core and programming department should
 * make a minimalist and careful use of them, 
 * so that a "polyfill" for the querySelector()
 * function at this level should be not required
 * nor envisaged.
 * 
 * 
 * @class
 * 
 * @param {element} The reference DOM element
 * 
 */


Sf.Selector = function(el) {

 this.ref_el = el || null;
 this.el = null;

 /**
  * @method attr_up
  * Searches for the nearest parent element
  * with the specified attribute and value
  * 
  * @param {string} name The attribute name
  * @param {string} value The attribute value
  * 
  * @return {object} Returns the class instance
  */

 this.attr_up = function(name,value) {
  var el = this.ref_el;

  while(typeof el.hasAttribute != 'function' || !el.hasAttribute(name) || el.getAttribute(name) != value) {
   //console.log(el)
   el = el.parentNode;
  }

  //return el || null;

  this.el = el || null;

  return this;
 };


 /**
  * @method outerHTML
  * Replaces a DOM element with the provided
  * text/html 
  * 
  * @param {string} html The text/html to be applied
  * as outerHTML
  * 
  * @todo use another implementation where outerHTML
  * is not available
  */

 this.outerHTML = function(html) {
  if(this.el)
   this.el.outerHTML = html;
 };


 /**
  * @method get 
  * Gets the class argument
  * @return {object} Returns the DOM element 
  * (can be null)
  */

 this.get = function() {
  return this.el;
 };


 return this;
};



/**
 *  A short for Sf.Str to avoid the use of the 'new' operator
 */
Sf.str = function(str) {
 return new Sf.Str(str);
};

/**
 * A short for Sf.Obj to avoid the use of the 'new' operator
 */
Sf.obj = function(obj) {
 return new Sf.Obj(obj);
};

/**
 * A short for Sf.Array to avoid the use of the 'new' operator
 */
Sf.array = function(array) {
 return new Sf.Array(array);
};

/**
 * A short for Sf.Selector to avoid the use of the 'new' operator
 */
Sf.selector = function(ref_el) {
 return new Sf.Selector(ref_el);
};



/** 
 * The standard method to instantiate
 * a native Ajax object
 */

Sf.xhr_object = function() {
 try {
  return new XMLHttpRequest();
 } catch(e) {
  try { 
   return new ActiveXObject('Msxml2.XMLHTTP');
  } catch(e) { 
   return new ActiveXObject('Microsoft.XMLHTTP');
  }
 }
 return null;
};



/**
 * This is the function used to update the view
 * 
 * @todo Rather than to call the function specifying 
 * an event on the
 * HTML element itself, the call to the function
 * should be implemented through some custom "sf" 
 * attribute, for instance in the following way:
 *
 * sf-update="[event]"
 * 
 * where event can be "onclick", "onchange", and
 * so on. (Then on DOM ready the function will be
 * attached to the element with the specified
 * event)
 * 
 * 
 * @param {element} parent_el The DOM element to
 * which is attached the event which fires the
 * function
 * 
 */


//client side
Sf.update = function(parent_el) {

 /**
  * @type {object}
  * 
  * @desc First we check for the 'sf-' prefixed attributes
  * within the element.
  * By default, at the current Sf version, they
  * can be the following:
  * 
  *  (sf-) load		{string} The identification of the view to be loaded;
  * 			in this form: [scope]|[namespace]|[label]
  * 
  *  (sf-) load-values	{string or object} The values to be passed
  * 			to the view to be loaded
  * 
  *  (sf-) validate	{string} The validation function to be 
  * 			called for instance on form submit
  * 			Still a string in this form:
  * 			[scope]|[namespace]|[label]
  * 
  * 			(to be found in scope / namespace / validate.js -> label)
  * 			
  * 
  *  (sf-) post		{string} The controller scope, namespace and
  * 			label to be queried. It should be the same 
  * 			controller used to render the view indicated
  * 			by sf-load
  * 
  * 
  *  (sf-) replace	{string} The identification of the view to be
  * 			replaced, still in this form:
  * 			[scope]|[namespace]|[label]
  * 
  *  (sf-) history	{integer} Can be 1, 0, or minus [n] -- The
  * 			value will affect the browser history: if 
  * 			negative the navigation history will go back	
  * 			of n steps
  * 
  * 			@todo MUST BE IMPLEMENTED	
  * 
  *  (sf-) url		{string} S custom url, which can replace
  * 			or be added to the page state
  * 
  * 			@todo MUST BE IMPLEMENTED
  * 	
  *  (sf-) fading		{null or string or object} Specifies the
  * 			fading between the view to be replaced
  * 			and the replacement view
  * 
  * 			@todo MUST BE IMPLEMENTED
  */

 var obj = {
'load': ''
,'load-values': {}	//string or object
,'validate': ''
,'post': ''
,'replace': ''
,'history': '-1'
,'url': ''
,'fading': '1'
};


 /*
  * check if the standard attribute is specified
  * and if the value of it is an object stored
  * in the global Html.data object
  */

 for(var i in obj) {
  if(parent_el.hasAttribute('sf-' + i)) {
   if(!parent_el.hasAttribute('sf-' + i + '-id')) 
    obj[i] = parent_el.getAttribute('sf-' + i);
   else 
    obj[i] = Html.data[parent_el.getAttribute('sf-' + i + '-id')];
  }
 }



 /*
  * If a validation (sf-validate) function is specified  
  * and if the parent_el is a FORM, then parse the values
  * of it
  */

 var form_values = [];

 if(Sf.str(obj.validate).trim().get() != '' && parent_el.tagName.toLowerCase() == 'form') {

  var form = parent_el;
  var allowed_type = ['text','textarea','select-one','hidden'];

  /*
   * we are using the custom iterator of Sf.Array class
   * with as arguments the key "i", the value "value" 
   * and the custom argument "allowed_type"
   */

  Sf.array(form.elements).for_each(function(i,el,form_values,allowed_type) {
   if(Sf.str(el.type).in_array(allowed_type))
    form_values.push({name: el.name,value: Sf.str(el.value).trim().get(),el: el});
  },[form_values,allowed_type]);



 /*
  * transform the argument of 'sf-validate' 
  * (the identification of the validation function to be called, 
  * expressed in this form: [scope]|[namespace]|[label] )
  * in an object like this:
  * 
  * {'scope': [scope] ,'namespace': [namespace],'label': [label]}
  */

 
  var obj_validate = Sf.array(obj.validate.split('|')).list(['scope','namespace','label']).get();


 /*
  * call the specified validation function
  * passing the values taken from the FORM
  */


  var context = null;
  form_values = Sf.validation[obj_validate.scope][obj_validate.namespace].apply(context,[obj_validate.label,form_values]);


 /*
  * If the result of the validation function associated
  * to the FORM is not FALSE, we delete the existing 
  * controller data specified by sf-post (the identification  
  * of the controller to be invoked) to ensure that 
  * the controller will be newly invoked by Ajax
  * (in order both to record and to provide data)
  */

  
  //if(typeof form_values == 'object' && Sf.obj(form_values).size()) {
  if(form_values !== false) {

  /*
   * transform the value of 'sf-post' 
   * (the controller identification expressed in this form: 
   * [scope]|[namespace]|[label] )
   * in an object like this:
   * 
   * {'scope': [scope] ,'namespace': [namespace],'label': [label]}
   */
   
   var obj_post = Sf.array(obj.post.split('|')).list(['scope','namespace','label']).get();

   /*
    * assert the existence of all the required dimensions for
    * the Sf.data object, expected to be in this form:
    * Sf.data = {[scope]: {[namespace]: {}}};
    */

   Sf.data = Sf.obj(Sf.data).assert_m_prop([obj_post.scope,obj_post.namespace]).get();


   /*
    * delete the cache of the specified controller
    */

   delete Sf.data[obj_post.scope][obj_post.namespace][obj_post.label];
  }

 }


 /*
  * reset the queue with the controllers
  * to be queried (i.e. also those of the
  * nested views)
  */  

 Sf.queue = [];




 /*
  * transform the value of 'sf-load' 
  * (the identification of the view to be loaded, 
  * expressed in this form: [scope]|[namespace]|[label] )
  * 
  * plus the values expressed in 'sf-load-values'
  * 
  * in an object like this:
  * 
  * {'scope': [scope] ,'namespace': [namespace],'label': [label], values: [values]}
  */


 var obj_load = Sf.array(obj.load.split('|')).list(['scope','namespace','label']).merge({values: obj['load-values']}).get();


 /*
  * start the rendering of the view indicated 
  * by obj_load
  */


 var content = Sf.render(obj_load);


  /*
   * If Sf.queue is empty, there is nothing to
   * be done server-side, so we can just replace
   * the old view (sf-replace) with the new (sf-load)
   */

 if(!Sf.queue.length) {
  
  /*
   * every view is automatically enclosed with a container
   * identified by an attribute / value like:
   * 
   * sf-id="[scope]|[namespace]|[label]"
   * 
   * Because in the document there could be multiple views with the same
   * label, we avoid the use of the ID attribute (which must
   * be unique) and we search the container of a view
   * from the element calling the "update" function 
   */ 

  Sf.selector(parent_el).attr_up('sf-id',obj.replace).outerHTML(content);  
  return;
 }



 /*
  * Sf.queue is not empty and we are required
  * to query the server to get the controllers
  * data specified within it, through Ajax
  */


  var xhr = Sf.xhr_object();


  //take it statically ?
  if(!xhr) {
   
   /*
    * @todo Ajax is not available. 
    * Implement a work-around to render the 
    * changes statically
    */

  }



 /**
  * 
  * @var {object} post_data Values to be passed to the script "ajax_controller"
  * 
  * @var {array} post_data.queue An array of objects in this form:
  * 
  * ["[scope]|[namespace]|[label]", values]
  *  
  * (the first key is the controller identification,
  * and the second key the values to be passed to it)
  * 
  * @var {string} post_data.post.controller Identification
  * of the controller specified in sf-post, in this form:
  * 
  * "[scope]|[namespace]|[label]"
  * 
  * @var {array} post_data.post.data An array of objects
  * with the values taken from the FORM. Every object
  * represents an input in this form:
  * 
  * {name: [name],value: [value],el: [native DOM element]}
  *  
  * 
  * @todo The described data structure could be different.
  * For instance obj_post could be passed instead of
  * obj.post, or the key "post" could be expressed as 
  * an array, instead than as an object.
  */

 var post_data = Sf.obj({queue: Sf.queue,post: {controller: obj.post,post_data: form_values}}).stringify().get();



 /*
  * the function to be called on success
  * 
  * @todo add more options related to the Ajax call,
  * for instance "before_loading", "dbclick_check",
  * "on_timeout", etc.
  */


 var on_success_function = function(xhr,obj,obj_load,parent_el) {

  /**
   * @var {array} data Data is an array containing the results of
   * every queried controller
   */  

  var data = Sf.str(xhr.responseText).json_decode().get();

  for(var i in data) {
   
   /*
    * the first key of every value of Sf.queue
    * is a resource identification in this form: 
    * [scope]|[namespace]|[label]
    * 
    * which now we convert in the related object
    * {scope: [scope],namespace: [namespace],label: [label]}
    */

   var value = Sf.array(Sf.queue[i][0].split('|')).list(['scope','namespace','label']).get();


   /*
    * assert the existence of all the required dimensions for
    * the Sf.data object, expected to be in this form:
    * Sf.data = {[scope]: {[namespace]: {}}};
    */

   Sf.data = Sf.obj(Sf.data).assert_m_prop([value.scope,value.namespace]).get();

   /*
    * Assign the result taken server-side to the controller's
    * data cache
    */

   Sf.data[value.scope][value.namespace][value.label] = data[i];
  }

  /*
   * render again the view to be loaded
   * (this time we should have all required data)
   */

  var content = Sf.render(obj_load);


  /*
   * replace the view specified in sf-replace
   * with the content of the view specified
   * in sf-load
   */
   
  Sf.selector(parent_el).attr_up('sf-id',obj.replace).outerHTML(content);
 };


  /*
   *  Note the query attribute "rand": this will ensure that the 
   * browser will not serve cached data 
   */

  var url = 'ajax_controller?rand=' + Html.id();

  xhr.open((!post_data ? 'GET' : 'POST'),url,true);


  xhr.onreadystatechange = function() {

   if(xhr.readyState == 4 && xhr.status == 200) {

    /**
     * @name on_success_function 
     * @function
     * 
     * @param {element} context The context of the keyword "this"
     * @param {array} The list of arguments to be passed to the
     * "on_success_function" function, the first is the xhr object
     * and the other are optional 
     */

    var context = null;
    on_success_function.apply(context,[xhr,obj,obj_load,parent_el]);
   }
  }; 

  xhr.send(post_data);

};





/**
 * Interface to the controller's data
 * 
 * @param {object} obj An object of the resource (in this case
 * a controller) identification. It should be in this form:
 *
 * {scope: [scope], namespace: [namespace], label: [label]}
 * 
 * @return {object} The result taken server-side from the 
 * controller
 * 
 * 
 * If executed server side the function directly queries
 * the controller, while if executed client side the function
 * queues the controller's identification and queries the
 * server only once through Ajax (see above)
 * 
*/


Sf.get_data = function(obj) {

 /*
  * assert the existence of all the required dimensions for
  * the Sf.data object, expected to be in this form:
  * Sf.data = {[scope]: {[namespace]: {}}};
  */

 Sf.data = Sf.obj(Sf.data).assert_m_prop([obj.scope,obj.namespace]).get();


 if(!Sf.server_side()) {

  /*
   * if the requested controller data are not
   * in the cache, than put the controller
   * identification in the queue
   */

  if(!Sf.data[obj.scope][obj.namespace].hasOwnProperty(obj.label)) {
   Sf.queue.push([[obj.scope,obj.namespace,obj.label].join('|'),obj.values]);

   return {};
  }
  


 /*
  * if the function is executed server-side
  * we query immediately the controller,
  * and we record the result as encodeded 
  * data to be restored on page load into 
  * Sf.data itself 
 */


 } else {

  //get data from the controller 
  Sf.data[obj.scope][obj.namespace][obj.label] = PHP.controller.get(obj.scope,obj.namespace,obj.label,obj.values);

  /*
   * pass the result to the server-side script,
   * precisely to the method "record_data" of the
   * class instance "loader", in the file sf.php.
   * 
   * Such data will be later rendered by the function 
   * __load__ among the "script resources" of the
   * document
   */

  PHP.loader.record_data('data',{scope: obj.scope, namespace: obj.namespace, label: obj.label,result: Sf.data[obj.scope][obj.namespace][obj.label]});

 }

 //return the controller's result

 return Sf.data[obj.scope][obj.namespace][obj.label];
};




/**
 * This function is called by a view 
 * to associate the related code to 
 * a specified scope and namespace
 * 
 * @param {object} obj An object in this form: 
 * {scope: [scope], namespace: [namespace], label: [label]}
 * 
 * @param {function} funct The callback function with
 * the various view's elements
 */

Sf.add_view = function(obj,funct) {

 /*
  * assert the existence of all the required dimensions for
  * the Sf.data object, expected to be in this form:
  * Sf.data = {[scope]: {[namespace]: {}}};
  */

 Sf.view = Sf.obj(Sf.view).assert_m_prop([obj.scope]).get();


 /*
  * associate the view function to a specific
  * scope (for instance "pages" or "nodes") and
  * namespace (for instance the page and the node
  * name)  
  */

 Sf.view[obj.scope][obj.namespace] = funct;

};



/**
 * 
 * A wrapper to associate a callback
 * function of a "validation" resource 
 * to a specified scope and namespace
 * 
 * @param {object} obj An object in this form: 
 * {scope: [scope], namespace: [namespace], label: [label]}
 * 
 * (the identification of the validation function)
 * 
 * @param {function} funct The callback function with
 * the various validations methods 
 */

Sf.add_validation = function(obj,funct) {

 /*
  * assert the existence of all the required dimensions for
  * the Sf.validation object, expected to be in this form:
  * Sf.data = {[scope]: {[namespace]: {}}};
  */

 Sf.validation = Sf.obj(Sf.validation).assert_m_prop([obj.scope]).get();


 /*
  * associate the validation unction to a specific
  * scope (for instance "pages" or "nodes") and
  * namespace (for instance the page and the node
  * name)  
  */
 
 Sf.validation[obj.scope][obj.namespace] = funct;

};



/**
 * The main rendering function
 * 
 * @param {object} obj An object in this form: 
 * {scope: [scope], namespace: [namespace], label: [label]}
 * (the identification of the element to
 * be rendered)
 * 
 * @return {string} The output html/text string
 * 
 */

Sf.render = function(obj) {

 if(Sf.server_side()) {


  /*
   * If server side, and the related view is not
   * registered (for instance because we are rendering
   * a nested elements whose script has not yet been
   * included) the required scripts are included
   * in the javascript execution "on the fly" 
   * through the method "add_script"
   */

  if(!Sf.view.hasOwnProperty(obj.scope) || !Sf.view[obj.scope].hasOwnProperty(obj.namespace)) {

   PHP.loader.add_script(obj.scope,obj.namespace);

  }

 }


 /*
  * execute the function corresponding to the view
  * identified by the given scope and namespace
  */

 var context = null;
 var content = Sf.view[obj.scope][obj.namespace].apply(context,[obj.label,obj.values]);



 /*
  * enclose every view element with an inline container
  * with attribute sf-id="[scope]|[namespace]|[label]"
  * used to handle the view when necessary (for instance
  * when we are calling the Sf.update method, with the aim 
  * to replace a view with another one)
  */

 content = Sf.str(content).tag_enclose('span',{
'sf-id': Sf.obj(obj).filter(['values']).join('|').get()
}).get();


 return content;
 
};


