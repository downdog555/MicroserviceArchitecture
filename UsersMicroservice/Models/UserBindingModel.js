
const mongoose = require('mongoose');
const UserBindingModel = new mongoose.Schema({
    username:{type: String, default: "NONESET"},
    password:{type: String, default: null},
    firstName:{type: String, default: null},
    surName:{type: String, default: null},
    roles: {type: [String], default: null},
    Manager:{type: String, default: null},
    HolidayAuthoriser:{type: String, default: null},
    HolidayAllowance:{type: Number, default: null},
});
module.exports = UserBindingModel;



