const mongoose = require('mongoose');
const DomainBinding = new mongoose.Schema({
    Domain:{type: String, default: "NONESET"},
    ValidIP:{type: [String], default: null}
});
module.exports = DomainBinding;