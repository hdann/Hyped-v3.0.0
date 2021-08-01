const Discord = require('discord.js')

exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}unban`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}unban <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  const member = message.mentions.users.first()

  if(!message.member.hasPermission(config.permission.mod)) return message.channel.send(`:x: | Apenas pessoas com a permissão: ${config.permission.mod} podem usar esse comando!`)
  if(!member) return message.channel.send(embd)

  message.guild.members.unban(member.id).then(
    message.channel.send(`:thumbsup:| ${member} foi desbanido com sucesso.`)
  )
}