
/**
 * This file contains the set of views 
 * related to this scope.
 * Nested views can be called through
 * the function
 *
 * Sf.render({scope: [scope],namespace: [namespace],label: [label],values: {}});
 *
 */


Sf.add_view({scope: 'nodes',namespace: 'home'},function(label,values) {

 var output = '';


 switch(label) {


 case 'new_friend' :

  output += Html.element('h2',{'class': 'section'})
.html('new friend');


  var table = Html.table({class: 'my_table'});


  // heading
  table.row({}).cell(
   'Please enter the name, email and phone of your new friend'
  ,{class: 'my_cell'});


  var obj = {
'name': 'Name'
,'email': 'Email'
,'phone': 'Phone'
  };


  for(var i in obj) {

   //header
   table.row({}).cell(obj[i],{class: 'my_cell'});

   //input
   table.row({}).cell(Html.element('input',{type: 'text',name: i}).get(),{class: 'my_cell'});

  }


  //create row
  table.row({}).cell(Html.element('input',{type: 'submit',value: 'done'}).get(),{class: 'my_cell'});


  output += Sf.str(table.get())
.tag_enclose('form',{
action: ''
,onsubmit: 'Sf.update(this);return false;'

 //see [website_root]/sf.php -> Sf.update
 //for an explanation of the following
 //rules

,'sf-load': 'nodes|home|table_with_friends'
,'sf-load-values': values
,'sf-validate': 'nodes|home|new_friend'
,'sf-post': 'nodes|home|friends_data'
,'sf-replace': 'nodes|home|new_friend'
,'sf-history': '-1'
,'sf-url': ''
,'sf-fading': '1'

}).get();


 break;





 case 'table_with_friends' : 


/**
 * This will query the controller:
 * if server side directly,
 * and if client side through Ajax
 */

  var obj = Sf.get_data({'scope': 'nodes',namespace: 'home','label': 'friends_data',values: values});

  obj = obj.data;


  output += Html.element('h2',{'class': 'section'})
.html('My ' + Sf.obj(obj).size() + ' friends');


  var table = Html.table({'class': 'my_table'});


  // heading
  var tr = table.row({class: 'my_header_row','data-row': 'heading'});

  tr.cell('name',{class: 'my_cell_heading'});
  tr.cell('email',{class: 'my_cell_heading'});
  tr.cell('phone',{class: 'my_cell_heading'});


  for(var i in obj) {

   var value = obj[i];

   //create row
   var tr = table.row({'data-id': value.id});


   //create columns
   tr.cell(value.name,{class: 'my_cell'});
   tr.cell(value.email,{class: 'my_cell'});
   tr.cell(value.phone,{class: 'my_cell'});

  }


  output += table.get({output: 'html'});


  output += '<br><br>';
  
  output += Html.element('a',{
href: ''
,onclick: 'Sf.update(this);return false;'

 //see [website_root]/sf.php -> Sf.update
 //for an explanation of the following
 //rules

,'sf-load': 'nodes|home|new_friend'
,'sf-load-values': values
,'sf-replace': 'nodes|home|table_with_friends'
,'sf-history': '1'
,'sf-url': ''
,'sf-fading': '1'
})
.html('new friend');



  break;


 }


 return output;

});

