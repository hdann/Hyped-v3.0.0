const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}avatar`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}avatar <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  let membro = message.mentions.users.first()
  if(!membro) return message.channel.send(embd);
  const embed = new Discord.MessageEmbed()
  .setTitle(`🖼️| Avatar de: ${membro.tag}`)
  .setColor(color)
  .setImage(membro.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
  .setFooter(`© HypedGroupCode`);

  message.channel.send(embed);
}