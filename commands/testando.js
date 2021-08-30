const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`❌| Nop! Você não pode usar isso!`)

  let membro = message.mentions.users.first()
  if (!membro) return message.reply(`❌|Mencione um bot`)

  let channel = client.guilds.cache.get("777870393137430589").channels.cache.get("784438579190300702")

  let embed = new Discord.MessageEmbed()
  .setTitle(`${message.author.username} está testando ${membro.username}`)
  .setColor(`BLUE`)
  .setTimestamp()
  .setFooter(` ! Diogo06🐾#1135`)
  channel.send(embed)
}