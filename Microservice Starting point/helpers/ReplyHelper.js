const amqp = require('amqplib');
const Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');
var request = require('amqplib-rpc').request
var connection = (async () => {return await amqp.connect()})();
var channel = (async () => {return await (await connection).createChannel()})();



async function AddConsumer(queue, handler){
    if(global.connection == undefined){
        global.connection= await connection;
      }
      if(global.channel == undefined){
        global.channel= await channel;
      }
var a  = await global.channel.assertQueue(queue);
var b = global.channel.consume(a.queue, handler)
}
async function MainHandler(message){
var json = JSON.parse(message.content.toString());
//do stuff
var content = "response"// gets converted to buffer automatically
var opts = {} // optional
reply(global.channel, message, content, opts)
global.channel.ack(message)


}

module.exports = { connection, channel, AddConsumer};