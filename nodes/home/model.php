<?php


/**
 * The file contains the data structure 
 * implemented as sql tables.
 *  
 * @todo every field might contain
 * a regex pattern or might be
 * linked to a validation function
 * 
 * @todo Also the programming implementation / interface 
 *  could be different
 * 
 */



$array = array(

 'friends' => array(
	'count'			=> 'BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY'
	,'id'			=> 'BIGINT(16) NOT NULL'
	,'first_name'		=> 'VARCHAR(255) NOT NULL'
	,'last_name'		=> 'VARCHAR(255) NOT NULL'	
	,'timestamp' 		=> 'BIGINT(10) NULL'

	,'INDEX'		=> 'index_a (id,timestamp),
				index_b (first_name,last_name)'
	)


);

