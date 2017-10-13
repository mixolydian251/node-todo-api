const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 'booty pirates'
};

var token = jwt.sign(data, 'secret_sauce');
console.log(token);

var hash = jwt.verify(token, 'secret_sauce');
console.log(hash.id.toString());




// var message = "Jordy Hensley";
// var hash = SHA256(message);
//
// console.log(`Message: ${message}`, hash.toString());
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data: data,
//     hash: SHA256(JSON.stringify(data) + 'secret_sauce').toString() //secret_sauce is 'salt'
// };
// resultHash = SHA256(JSON.stringify(token.data) + 'secret_sauce').toString();
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// console.log(resultHash);
// console.log(token.hash);
//
// if (resultHash === token.hash){
//     console.log('Data not changed');
// } else {
//     console.log('Data changed -- DO NOT TRUST')
// }