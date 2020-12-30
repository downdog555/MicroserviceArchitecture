const  defaultConnection = "mongodb://domain:domainAdmin@localhost/Intranet?authSource=Intranet";
const mongoose = require('mongoose');
const conn = mongoose.createConnection(defaultConnection,  {useNewUrlParser: true, useUnifiedTopology: true});
module.exports = conn;