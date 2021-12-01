const Discord = require('discord.js');
const Caxinha = require('caxinha');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}affect`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}affect <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  const member = message.mentions.users.first()
  if(!member) return message.lineReply(embd)

  let image = await Caxinha.canvas.affect(member.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))

  let attachment = new Discord.MessageAttachment(image, "affect.png")

  await message.lineReply(attachment);
}