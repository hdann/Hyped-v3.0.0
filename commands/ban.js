const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}ban`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}ban <usuário> <motivo>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Não posso banir membros com cargo acima do meu. \n Não posso banir membros que tenham a permissão \`${config.permission.adm}\``)
  .setFooter(`© HypedGroupCode`);

  if(!message.member.permissions.has(config.permission.mod)) {
    return message.channel.send(`:x: | Apenas pessoas com a permissão: ${config.permission.mod} podem usar esse comando!`)
  }

  if(!message.guild.me.permissions.has(config.permission.mod)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.mod}`)
  }

  let membro = message.mentions.members.first() || message.guild.members.cache.get(args[0])

  if(!membro) return message.channel.send(embd)

  if(membro.user.id === message.author.id) {
    return message.reply(":x: | Não posso te banir!")
  }
  if(membro.user.id === config.client.id) {
    return message.reply(":x: | Não posso me banir!")
  } 
  if(!membro.bannable) {
    return message.reply(":x: | Eu não posso banir esse membro!")
  }
  if(membro.permissions.has(config.permission.adm)) {
    return message.reply(":x: | Eu não posso banir esse membro!")
  }

  let motivo = args.slice(1).join(" ")
  if(!motivo) return message.channel.send(embd)

  const embed = new Discord.MessageEmbed()
  .setTitle("<:HYbanido:822151905593393164>| Alguém foi banido!")
  .setColor(color)
  .addField("🙋| Membro", membro.user.tag, false)
  .addField("🔧| Moderador", message.author.tag, false)
  .addField("📰| Motivo", motivo, false);
  message.channel.send(embed);
  membro.ban({ reason: motivo })
}