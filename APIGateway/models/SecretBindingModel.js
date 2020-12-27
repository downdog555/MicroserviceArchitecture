const mongoose = require('mongoose');
const SecretBindingModel = new mongoose.Schema({
    secret:{type: String, default: "NONESET"},
 
});
module.exports = SecretBindingModel;