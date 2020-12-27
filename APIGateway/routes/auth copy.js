
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'test';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash){
console.log(hash);

})

