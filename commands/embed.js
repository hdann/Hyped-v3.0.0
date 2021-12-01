const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix, color, config) => {

  await message.delete()
  if (!message.member.permissions.has(config.permission.manager)) return message.channel.send(`${message.author}, ❌| Nop! Você não pode usar isso!`).then(msg => msg.delete(8000))

  const embederror = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: Embed`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: Embed <mensagem>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Use o comando: SetColor para escolher uma cor para seu Embed!`);
  

  let mensg = args.join(' ')
  if (!mensg) {
    message.channel.send(embederror)
    return undefined;
  }

  const embed = new Discord.MessageEmbed()
    .setDescription(`${mensg}`)
    .setColor(color)
    .setTimestamp()
    .setFooter(`Publicado por: ${message.author.username}`, message.author.avatarURL)
  message.lineReply(embed)
}