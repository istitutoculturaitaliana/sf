
/**
 * This file contains the set of views 
 * related to this scope.
 * Nested views can be called through
 * the function
 *
 * Sf.render({scope: [scope],namespace: [namespace],label: [label],values: {}});
 *
 */


Sf.add_view({scope: 'pages',namespace: 'home'}, function(label,values) {

 var output = '';


 switch(label) {


  case 'page_layout' :


   output += Html.element('div',{class: 'container_header'}).
html('&nbsp;'
   );


   output += Html.element('div',{class: 'container_body'}).
html(
  
   Html.element('h1').html('A simple Sf application')
   + Sf.render({scope: 'nodes',namespace: 'home',label: 'table_with_friends',values: {pag: 1}})

   );


   output += Html.element('div',{class: 'container_footer'}).
html('&nbsp;'
   );



  break;



 }


 return output;

});

