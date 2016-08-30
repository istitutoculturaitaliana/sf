<?php


/**
 * 
 * This file contains the controller's set
 * of functions. 
 * The controller is in the middle between 
 * the "model" and the "view", and always executed
 * server side
 * 
 */



$content = function($label,$values = array(),$post = array()) {

  switch($label) {


   case 'friends_data' :


    if(empty($post)) {
     

  $obj = array(
 array('id' => 123,'name' => 'Paolo','email' => 'paolo@mail.com','phone' => '123')
 ,array('id' => 456,'name' => 'Mika','email' => 'mika@mail.com','phone' => '456')
 ,array('id' => 789,'name' => 'Rémi','email' => 'rémi@mail.com','phone' => '789')
  );
  
    } else {


  $obj = array(
 array('id' => 123,'name' => 'Paolo','email' => 'paolo@mail.com','phone' => '123')
 ,array('id' => 456,'name' => 'Mika','email' => 'mika@mail.com','phone' => '456')
 ,array('id' => 789,'name' => 'Rémi','email' => 'rémi@mail.com','phone' => '789')
 ,array('id' => 999,'name' => $post[0]['value'],'email' => $post[1]['value'],'phone' => $post[2]['value'])
  );
 
}



    return array('status' => 'success','data' => $obj);


   break;



  }
  


 return '';

};



