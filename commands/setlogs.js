const db = require('quick.db');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Nop! Você não pode usar isso!')

  if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
  if(!channel) return message.reply(':x: | Digite o canal para definir as logs do servidor')
  if(!args[0]) return message.reply(':x: | Digite o canal para definir as logs do servidor')

  let id = channel.id
  const embed = new Discord.MessageEmbed()
  .setTitle(":thumbsup: | Canal de Logs Definido")
  .setColor("RANDOM")
  .setDescription(`O novo canal de logs é ${channel}`)
  message.channel.send(embed)
  db.set(`${message.guild.id}_channeldemsg`, id)
}