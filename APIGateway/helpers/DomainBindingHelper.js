const mongoose = require('mongoose');
const domainSchema = require('../models/DomainBindingModel.js');
mongoose.connect('mongodb://domain:domainAdmin@localhost/Intranet?authSource=Intranet', {useNewUrlParser: true, useUnifiedTopology: true});
const DomainModel = mongoose.model('DomainBinding', domainSchema, 'DomainBinding');
const help = require('../helpers/PublisherHelper');
async function DomainAuth(req,res,next){
    var domain = req.hostname;
    //console.log("meow1");  
    var originAddress = req.connection.remoteAddress;
    var resp = await DomainModel.findOne({Domain: domain}).exec();
    if(resp !== null && resp.ValidIP.includes(originAddress)){
    req.ConnectionString = resp.ConnectionString;

    req.CurrentIssuer = domain;

    if(global.connection == undefined){
        global.connection= await help.connection;
      }
      if(global.channel == undefined){
        global.channel= await help.channel;
      }

//create global callback channel for this 


        next();

    } else {
        res.status(403).json('Error, Not Connected To Correct Network.');
    }
}
module.exports = DomainAuth;