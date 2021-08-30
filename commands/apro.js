const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`❌| Nop! Você não pode usar isso!`)

  let membro = message.mentions.users.first()
  if (!membro) return message.reply(`❌|Mencione um bot`)

  let motivo = args.slice(1).join(" ");
  if (!motivo) return message.reply(`❌|Escreva um motivo`)

  let channel = client.guilds.cache.get("777870393137430589").channels.cache.get("784438579190300702")

  let embed = new Discord.MessageEmbed()
  .setTitle(`${membro.username} foi aprovado por ${message.author.username}!`)
  .setColor('#34ff1d')
  .setDescription(motivo)
  .setTimestamp()
  .setFooter(`Código de ! Diogo06🐾#1135`)
  channel.send(embed)
}