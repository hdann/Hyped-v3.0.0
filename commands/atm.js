const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const money = db.get(`money_${message.author.id}`);

  const embed = new Discord.MessageEmbed()
  .setTitle('💸| Seu Dinheiro')
  .setDescription(`> Você tem $${money}`)
  .setColor(color)
  message.lineReply(embed)
}