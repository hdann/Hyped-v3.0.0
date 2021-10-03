const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Nop! Você não pode usar isso!')
  if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
  if(!args[0]) return message.reply(':x: | Mencione um canal!');
  if(!channel) return message.reply(':x: | Mencione um canal!');

  let id = channel.id

  let embed = new Discord.MessageEmbed()
  .setTitle(":thumbsup: | Novo Canal de Welcome Definido!")
  .setColor("RANDOM")
  .setDescription(`Eu mandarei as mensagens de boas vindas no ${channel}`)
  .setTimestamp()
  .setFooter("© HypedGroupCode")
  message.channel.send(embed)
  db.set(`${message.guild.id}_welcomecanal`, id)
}