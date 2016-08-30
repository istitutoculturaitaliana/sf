#Sf
[https://istitutoculturaitaliana.org/sf](https://istitutoculturaitaliana.org/sf)


##Abstract

**Sf** (Simple Framework) is an hybrid,
isomorphic and recursive lightweight framework, based on
javascript views (which can further simplified
using templates) automatically updated through
Ajax. 
By contrast to other frameworks (e.g. Ruby on Rails) 
Sf only queries the server for the controllers data
(mainly JSON objects) while when the page has to
be served statically, relies on the same javascript
views executed through some server-side 
javascript engine (for instance V8Js and Rhino).
The server-side application is implemented by now in PHP, 
and a Ruby-Rack version will be soon available.
Sf offers a great experience both to the website's
designers and programmers (who have only to design
the different views and to specify the values which they require)
and to the users themselves, who will experience a lightfast 
interface, which will query the server only when
strictly necessary, because all the views and their
dependencies are automatically loaded both server 
and client side at run time.


##Release notes
Please note that this version (still to
be considered an "alpha" version) makes
use of PHP as server side language,
and is a version broadly incomplete:
there is not "error-check" (if something
is not expected by the application this would
produce an error)
and plenty of room for implementation!




##Getting started 

- Sf does not require any installation. Just copy the files
in your document root directory.

- Set-up V8Js for your PHP version

- Here if the file structure of the application:

```
 root

     .htaccess
     sf.js
     sf.php
     html.js
     browser.php 
     style.php
     ajax_controller.php

     nodes
         home
            view.js
            style.php
            controller.php
            model.php
      pages
         home
            view.js
            style.php
            index.php
            controller.php

```


Just play with these files considering that:

- The file .htaccess is acting as a "router" by
  now and will execute first the script located in
  pages/home/index.php

- The file index.php will load the javascript view located in 
  pages/home with label "page_layout" (invoking the
  \_\_load\_\_ function)

  (The view will be searched in pages/home/view.js
  with label "page_layout", and from there all 
  the nested views will be rendered recursively)

- To render HTML elements is suggested to use
  the functions / methods in the file html.js
  (both to avoid to write manually HTML tags, and
  to allow passing native javascript objects as
  attribute values, without the need to encode them.
  At the same time, such small library allows full
  control and encourages method chaining)

- In order to deploy further the application and to make use
  of the efficient conception of SF, is 
  recommended to read the documentation 
  starting from the file sf.php and sf.js, and
  then reading the documentation in all other files

- We expect that you can develop both your application, 
  and Sf in itself, according to your needs and given
  its basic concept.





##Definitions

term|description
---|---
**class argument** or **class subject**| The main property of a class assigned by the constructor.
**view**| An HTML portion of the HTML document, with a specific state
**controller** | A server side script used to provide with data (usually taken from a database) a view
**resource** | Resources are set of functions describing a view, FORMS validation, or controllers (the file of the first will have name "view.js", of the second "validation.js" and of the third "controller.php" (the extension in this case will depend on the server side language used). "resource" can also be used in the current meaning of script or stylesheet required in the HTML document
**scope** | A folder within the website root: by now expected to be "pages" or "nodes" (a "page" -- meant to be served statically --  might contain multiple nodes, which by contrast are meant to be served dynamically)
**namespace** | The specific "page" or "node" (a subdirectory within the directory specified by "scope") 
**label** | The label of the portion of code to be executed in the specified scope and namespace, and belonging to a specific "resource" 
**identification** | The "identification" of a view, a controller, and of similar resources, is an object in this form: {scope: [scope],namespace: [namespace],label: [label]} or a string in this form: [scope]\|[namespace]\|[label] -- that is a path to the resource and the label of the related portion of code.


##Resources
For more resources please check:

[http://istitutoculturaitaliana.org/sf/doc/php/](http://istitutoculturaitaliana.org/sf/doc/php/)
(the PHP documentation of the framework)

[http://istitutoculturaitaliana.org/sf/doc/html.js/](http://istitutoculturaitaliana.org/sf/doc/html.js/)
(the javascript documentation of html.js)

[http://istitutoculturaitaliana.org/sf/doc/sf.js/](http://istitutoculturaitaliana.org/sf/doc/sf.js/)
(the javascript documentation of sf.js)

Also please check here for information about the **licence**
[https://istitutoculturaitaliana.org/sf/doc/php/files/sf.html](https://istitutoculturaitaliana.org/sf/doc/php/files/sf.html)


##FAQ


--- **What is the difference between Angularjs and Sf** ?

The main difference with Angularjs is that Sf can be
rendered both server and client side, and does not
require to query the server from the client to serve 
the home page or whatever other static page during its first
access.


--- **What is the main difference with React** ?

The main difference with React is that Sf is 
recursive, and simple.
You can deploy the first web application in minutes
and you can build a webpage of nested components
(totally independent each other) without having to think
even at the dependencies. Also, an emulation of the DOM
on the server-side is not required.


--- **Does Sf require jQuery** ?
Absolutely no. You can add jQuery to your website,
if you are used with it or you are using some plug-in
on top of it, however Sf in itself manipulates the DOM
in a so basic way, that does not require any further
library.
Also, Sf encourages the use of CSS selectors based on
Sizzle only when you are manipulating tags and styles.


##Licence

This is an open source software 
conceived within the frame of the Institute of 
Italian culture (NGO), and originally 
implemented by Thomas de Vivo (tdvit@mail.com) 
It is published under the following license:
everyone can copy, use, modify and redistribute this
software provided that every copy of it (including the
partial use of its code) will retain the current disclaimer 
or in this form, or using the following short notice:

```
"(C) 2016 Institute of Italian culture (NGO)
 -- www.istitutoculturaitaliana.org/sf"
```

(even compacted in one line) 
(the provided link will contain a description of the software
and the complete license.)

The software is provided "as is": without any warranty
(including its eligibility for whatever kind
of purpose), and both the copyright owners and the
contributors are excluded from any liability
related to the use of it, even if instructions 
and recommendations of use will be provided
with such software or any derivative or 
related work.


