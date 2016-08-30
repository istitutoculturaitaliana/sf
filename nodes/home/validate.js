
/**
 * 
 * Elaborates the values taken from
 * the form to be passed to the controller
 * 
 */


Sf.add_validation({scope: 'nodes',namespace: 'home'},function(label,values) {

 var output = '';


 switch(label) {


 case 'new_friend' :
  
  //alert('validate')


  for(var i in values) {
   

  }

  return values;

 break;


 }


 return false;

});
