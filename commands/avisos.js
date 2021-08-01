const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}avisos`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}avisos <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  if(!message.member.hasPermission(config.permission.mod)) return message.channel.send(`:x: | Apenas pessoas com a permissão: ${config.permission.mod} podem usar esse comando!`);

  const membro = message.mentions.users.first()
  if(!membro) return message.channel.send(embd)

  let warnings = db.get(`warnings_${message.guild.id}_${membro.id}`)
  if(warnings === null) warnings = 0;

  const embed = new Discord.MessageEmbed()
  .setTitle(`⚠️| Avisos de ${membro.username}`)
  .setColor(color)
  .setDescription(`-> | ${membro} Tem **${warnings}** aviso(s)!`)
  .setThumbnail(membro.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
  .setTimestamp()
  .setFooter("© HypedGroupCode");

  message.channel.send(embed)
}