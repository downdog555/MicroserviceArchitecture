const mongoose = require('mongoose');
const domainSchema = require('../models/DomainBindingModel.js');
mongoose.connect('mongodb://domain:domainAdmin@localhost/Intranet?authSource=Intranet', {useNewUrlParser: true, useUnifiedTopology: true});
const DomainModel = mongoose.model('DomainBinding', domainSchema, 'DomainBinding');

async function DomainConnectionString(req){
    var domain = req.hostname;
    //console.log("meow1");  
    var originAddress = req.connection.remoteAddress;
    var resp = await DomainModel.findOne({Domain: domain}).exec();
   return resp.ConnectionString;
}
module.exports = DomainConnectionString;