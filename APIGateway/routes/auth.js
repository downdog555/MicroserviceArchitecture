const routes = require('express').Router();
const mongoose = require('mongoose');
const userSchema = require('../models/UserBindingModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = "asdasdasda";
//order is important
//routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
routes.post('/Auth/Login', async (req,res)=>{
    console.log("meow");
    const {username, password} = req.body;
    //Find user
    const connectionString = req.ConnectionString;
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    const userModel = mongoose.model('Users', userSchema, 'Users');
    var resp = await userModel.findOne({username: username}).exec();
    if(resp !== null){
    //and compare
    if (await bcrypt.compare(password, resp.password)){
     //Create Tokens 
    const access = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),username: username,issuer: req.CurrentIssuer, role: "admin"}, secret,{ algorithm: 'HS512' });
    //bind into cookie
    res.status(200).cookie('tokenAccess', access, { maxAge: 86400 , httpOnly: true, secure:false}).send(/* ... */);

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