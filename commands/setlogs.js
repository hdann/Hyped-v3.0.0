const db = require('quick.db');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(config.reply.noperm)

  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
  if(!channel) return message.lineReply(':x: | Digite o canal para definir as logs do servidor')
  if(!args[0]) return message.lineReply(':x: | Digite o canal para definir as logs do servidor')

  let id = channel.id
  
  const embed = new Discord.MessageEmbed()
  .setTitle("<a:HYpositive:763111725510950932> | Canal de Logs Definido")
  .setColor(color)
  .setDescription(`> O novo canal de logs é ${channel}`)
  message.lineReply(embed)
  
  db.set(`${message.guild.id}_channeldemsg`, id)
}