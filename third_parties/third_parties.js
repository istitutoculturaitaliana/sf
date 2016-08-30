
Third_parties = {};



//http://www.nczonline.net/blog/2009/12/08/computer-science-in-javascript-base64-encoding

Third_parties.base64_encode = function(str,chars) {

 if(typeof chars == 'undefined') 
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
 else
  var chars = chars;


 var cur, prev, byte;
 var output = new Array();

 for(var i = 0; i < str.length; i++) {
  cur = str.charCodeAt(i);
  byte = i % 3;

  switch(byte){
   case 0: //first byte
    output.push(chars.charAt(cur >> 2));
   break;

   case 1: //second byte
    output.push(chars.charAt((prev & 3) << 4 | (cur >> 4)));
   break;

   case 2: //third byte
    output.push(chars.charAt((prev & 0x0f) << 2 | (cur >> 6)));
    output.push(chars.charAt(cur & 0x3f));
   break;
  }

  prev = cur;
 }

 if(byte == 0){
  output.push(chars.charAt((prev & 3) << 4));
  output.push('==');

 } else if(byte == 1){
  output.push(chars.charAt((prev & 0x0f) << 2));
  output.push('=');
 }

 return output.join('');
};

