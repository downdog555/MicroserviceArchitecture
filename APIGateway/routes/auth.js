const routes = require('express').Router();
const DomainAuth = require('../helpers/DomainBindingHelper.js');
//order is important
routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
routes.post('/Auth/Login', (req,res)=>{
    res.status(200).json({message:'Login Post'});
});
routes.post('/Auth/Logout', (req,res)=>{
    res.status(200).json({message:'Logout Post'});
});
module.exports = routes;