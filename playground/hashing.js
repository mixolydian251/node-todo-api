const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


var password ='abc123';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
});


var hashedPassword = '$2a$10$Jotn5yK0Xs9n9ZSDQgpVmehg.dQ6oupmnqXDeIx6uHrOuGWcHmBFm';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});




// var data = {
//     id: 'booty pirates'
// };
//
// var token = jwt.sign(data, 'secret_sauce');
// console.log(token);
//
// var hash = jwt.verify(token, 'secret_sauce');
// console.log(hash.id.toString());




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