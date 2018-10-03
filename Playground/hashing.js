const { SHA256 } = require('crypto-js');
const webToken = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var password = "abc1";


bcrypt.genSalt(10,(err,salt) => {
  bcrypt.hash(password,salt,(err,hash) => {
    passHash = hash;
    console.log('hash',hash);

  });
});

// var passHash = '$2a$10$X/U/Gcg9R7pR7eUyPA6lj.HJy.yCdbdeB54UQc8oVY5HpBDsbAPYW'
//
// bcrypt.compare(password, passHash).then((res) => {
//   if(res){
//     console.log('Correct Password');
//   }
// }).catch((e)=>{
//   console.log(e);
// });


// var data = {
//   id: 10
// };
//
// // .sign(data,SecretKey); it will return token
// var token = webToken.sign(data,'someText');
// console.log('Token',token);
//
// // .verify(token) verifies that data is not manipulated by taking tokens as input
// var decodedData = webToken.verify(token,'someText');
// console.log('Data',decodedData);


// var message = 'I am Normal Message';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//   id:4
// };
//
// var token = {
//   data:data,
//   hash: SHA256(JSON.stringify(data)+ 'SecretKey').toString()
// };
//
// //if i try to Manipulate the data in between it fails to validate
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'SecretKey').toString();
//
// if(resultHash === token.hash ){
//   console.log('Data was not changed');
// }else {
//   console.log('Data was changed');
// }
