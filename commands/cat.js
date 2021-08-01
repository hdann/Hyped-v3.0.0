const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args, prefix, color, config) => {
    let{body} = await superagent
  .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle("Gatos 🐱")
  .setImage(body.file);

  message.channel.send(catembed);
}