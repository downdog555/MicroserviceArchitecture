const mongoose = require('mongoose');
const DomainSecretBinding = new mongoose.Schema({
    Domain:{type: String, default: "NONESET"},
    Secret: {type: String, default: "NONESET"}
});
module.exports = DomainSecretBinding;