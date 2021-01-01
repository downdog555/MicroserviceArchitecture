var amqplib = require('amqplib');
var reply = require('amqplib-rpc').reply;
const helper = require('./helpers/ReplyHelper');
const GetUserReq = require('../Contracts/GetUser/GetUserRequest');
const mongoose = require('mongoose');
const userSchema = require('./Models/UserBindingModel');
const GetUserResponse = require('../Contracts/GetUser/GetUserResponse');
async function basic(msg){
 // var json = JSON.parse(msg.content.toString());
 console.log(msg.content.toString());
  //do stuff
 // console.log(msg);
  var content = "response"// gets converted to buffer automatically
  var opts = {} // optional
  reply(global.channel, msg, content, opts)
  global.channel.ack(msg)
}
async function GetUser(msg){
  var json = JSON.parse(msg.content.toString());
  //this should have a connection string as well as the username
    const connectionString = json.connectionString;
    mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
 
    const userModel = mongoose.model('Users', userSchema, 'Users');
    var resp = await userModel.findOne({username: json.username});
    var response = {success: false, error: "User Not Found"};
    if(resp !== null)
    {
      response = JSON.stringify(resp);
    }

  //do stuff
  // console.log(msg);
   var content = response// gets converted to buffer automatically
   var opts = {} // optional
   reply(global.channel, msg, content, opts)
   global.channel.ack(msg)
 }
helper.AddConsumer("User.GetUser", GetUser );