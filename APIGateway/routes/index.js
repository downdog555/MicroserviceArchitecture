const routes = require('express').Router();
const DomainAuth = require('../helpers/DomainBindingHelper.js');
//order is important
// routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
routes.get('/',(req,res)=>{
    console.log("meow");
    res.status(200).json({message:'Hellow world'});
});
routes.get('/apiv1/', (req,res)=>{
    res.status(200).json({message:'Hellow world apiv1'});
});
module.exports = routes;