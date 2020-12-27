const routes = require('express').Router();
const DomainAuth = require('../helpers/DomainBindingHelper.js');
const DomainBindingConnection = require('../helpers/DomainBindingConnectionHelper');
const mongoose = require('mongoose');
const userSchema = require('../models/UserBindingModel');
const pepper = "asdasdasdasdasdsadsad";
const bcrypt = require('bcrypt');
//order is important
//routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
routes.post('/Auth/Login', async (req,res)=>{
    console.log("meow");
    const {username, password} = req.body;
    //Find user
    const connectionString = await DomainBindingConnection(req);
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    const userModel = mongoose.model('Users', userSchema, 'Users');
    //hash password using bcrypt
  
    var resp = await userModel.findOne({username: username}).exec();
    if(resp !== null){
    //and compare
    if (await bcrypt.compare(password, resp.password)){
     //Create Tokens 

    //bind into cookie
    res.status(200).cookie('tokenAccess', "signedToken", { maxAge: 86400 , httpOnly: true, secure:true}).send(/* ... */);

    } else{
        res.status(403).json("Error, Incorrect values"); 
    }
   

    }  else{
        res.status(403).json("Error, Incorrect values"); 
    }
   
});
routes.post('/Auth/Logout', (req,res)=>{
    res.status(200).json({message:'Logout Post'});
});
module.exports = routes;