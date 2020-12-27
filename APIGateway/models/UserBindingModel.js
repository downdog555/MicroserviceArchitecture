const mongoose = require('mongoose');
const UserBindingModel = new mongoose.Schema({
    username:{type: String, default: "NONESET"},
    password:{type: String, default: null},
    roles: {type: [String], default: null}
});
module.exports = UserBindingModel;