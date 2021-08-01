const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}clearwarns`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}clearwarns <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  if (!message.member.hasPermission(config.permission.adm))
  return message.reply(`:x: | Apenas pessoas com a permissão: ${config.permission.adm} podem usar esse comando!`)

  const membro = message.mentions.users.first()
  if (!membro) return message.channel.send(embd)

  db.set(`warnings_${message.guild.id}_${membro.id}`, 0)

  const embed = new Discord.MessageEmbed()
  .setTitle(":thumbsup:| Warns Removidos!")
  .setDescription(`Os warns de ${membro.username} foram removidos!`)
  .setColor(color)
  .setTimestamp()
  .setFooter(`© HypedGroupCode - Staff Responsável ${message.author.username}`)
  message.channel.send(embed)
}