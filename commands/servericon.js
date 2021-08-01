const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  let embed = new Discord.MessageEmbed()
  .setColor(color)
  .setTitle('🖼️| Icone do Servidor')
  .setImage(message.guild.iconURL());
  message.channel.send(embed)
}