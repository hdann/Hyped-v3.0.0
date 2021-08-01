const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args, prefix, color, config) => {

  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

   let dogembed = new Discord.MessageEmbed()
   .setColor(color)
   .setTitle("Cachorros :dog:")
   .setImage(body.url);

   message.channel.send(dogembed);

}