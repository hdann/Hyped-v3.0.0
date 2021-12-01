const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply(config.reply.noperm)

  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}setblocker`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}setblocker <on || off>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  const embed = new Discord.MessageEmbed()
  .setTitle("<a:HYpositive:763111725510950932> | O Sistema de inviteblock foi ativado!")
  .setColor(color)
  .setDescription(`> Eu excluirei todos os convites dos usuários que **não** tem a permissão \`ADMINISTRATOR\`!`)
  .setFooter("© HypedGroupCode")
  .setTimestamp();

  let server = message.guild.id

  if(!args[0]) return message.reply(embd)
  if(args[0] === "on") {
    message.lineReply(embed)
    db.set(`${message.guild.id}_inviteblock`, server)
    return;
  }
  if(args[0] === "off") {
    message.lineReply(":x: | O sistema de inviteblock foi desativado!")
    db.delete(`${message.guild.id}_inviteblock`)
    return
  }
}