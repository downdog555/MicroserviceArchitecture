const routes = require('express').Router();
const mongoose = require('mongoose');
const userSchema = require('../models/UserBindingModel');
const revokedSchema = require('../models/RevokedToken');
const DomainSecretSchema =  require('../models/DomainSecretModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretAddition = require("../helpers/SecretAddition");
const { v4: uuidv4 } = require('uuid');
const defaultConnecton = require("../helpers/DefaultConnection");
const userReq = require('../../Contracts/GetUser/GetUserRequest');
const help = require('../helpers/PublisherHelper');
//order is important
//routes.use(async function (res,req,next ){ await DomainAuth(res,req,next)});
routes.post('/Auth/Login', async (req,res)=>{
    console.log("meow");
    const {username, password} = req.body;
    //Find user
    const connectionString = req.ConnectionString;
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
 
    const userModel = mongoose.model('Users', userSchema, 'Users');
    const domainSecret = defaultConnecton.model('DomainSecrets', DomainSecretSchema, 'DomainSecrets');
    // var resp = await userModel.findOne({username: username});
    //Send Request to microservice
    var uReq =  {connectionString, username};
    var response =  await  help.SendMessage(JSON.stringify(uReq), "User.GetUser" );
    var resp = JSON.parse(response.content.toString());
    if(resp.success === undefined){
    //and compare
    if (await bcrypt.compare(password, resp.password)){
         //load secret from env
        
            //Create Tokens 
           const access = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60),username: username,issuer: req.CurrentIssuer, JTI: uuidv4(), role: "admin"}, secretAddition,{ algorithm: 'HS512' });
           //bind into cookie
           //Set to secure
           res.status(200).cookie('tokenAccess', access, { maxAge: 86400 , httpOnly: true, secure:false}).send(/* ... */);

          
     

    } else{
        res.status(403).json("Error, Incorrect values"); 
    }
   

    }  else{
        res.status(403).json("Error, Incorrect values"); 
    }
   
});
routes.post('/Auth/Logout', (req,res)=>{
    const connectionString = req.ConnectionString;
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
    const RevokedModel = mongoose.model('Revoked', revokedSchema, 'Revoked');
    var doc = new RevokedModel({JTI: req.user.JTI, EXP: req.user.exp, IAT:req.user.iat});
    doc.save(function(err){
        if(err){
            console.error(err);
        }
    })
    res.status(200).cookie('tokenAccess', "", { maxAge: 0 , httpOnly: true, secure:false}).send(/* ... */);
});
module.exports = routes;