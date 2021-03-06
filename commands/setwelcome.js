const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!message.member.permissions.has(config.permission.adm)) return message.reply(config.reply.noperm)

  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}setwelcome`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}setwelcome <canal>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
  if(!args[0]) return message.reply(embd)
  if(!channel) return message.reply(embd)

  let embed = new Discord.MessageEmbed()
  .setTitle("<a:HYpositive:763111725510950932> | Novo Canal de Welcome Definido!")
  .setColor(color)
  .setDescription(`> Eu mandarei as mensagens de boas vindas no ${channel}`)
  .setTimestamp()
  .setFooter("© HypedGroupCode");

  message.lineReply(embed)

  let id = channel.id

  db.set(`${message.guild.id}_welcomecanal`, id)
}