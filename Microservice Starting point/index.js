var amqplib = require('amqplib');
var reply = require('amqplib-rpc').reply;
const helper = require('./helpers/ReplyHelper');
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
helper.AddConsumer("test", basic )