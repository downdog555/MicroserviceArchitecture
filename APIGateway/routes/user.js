const routes = require('express').Router();
const DomainAuth = require('../helpers/DomainBindingHelper.js');
//order is important
routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
//Routes after here 



//ending middleware after here  
module.exports = routes;