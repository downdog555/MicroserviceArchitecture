const mongoose = require('mongoose');
const RevokedTokenBinding = new mongoose.Schema({
    JTI:{type: String, default: "NONESET"},
    IAT: {type: String, default: "NONESET"},
    EXP: {type: String, default: "NONESET"}
});
module.exports = RevokedTokenBinding;