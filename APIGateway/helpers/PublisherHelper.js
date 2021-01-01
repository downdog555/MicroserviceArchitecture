const amqp = require('amqplib');
const Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');
var request = require('amqplib-rpc').request
var connection = (async () => {return await amqp.connect()})();
var channel = (async () => {return await (await connection).createChannel()})();



async function SendMessage(message, queue){
var a  = await global.channel.assertQueue(queue);
return await  request(global.connection,a.queue, message);
// global.callbacks[uuid] = callback;
// ch.sendToQueue(queue, Buffer.from(message), { correlationId: uuid, replyTo: global.privateQueue });

// await delay();
// if (callbacks[correlationId] !== undefined) {
//   res.status(500).send();
//   delete callbacks[correlationId];
// }
}

module.exports = { SendMessage, connection, channel};