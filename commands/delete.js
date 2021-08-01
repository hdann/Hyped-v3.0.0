const Discord = require('discord.js');
const Caxinha = require('caxinha');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}delete`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}delete <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  const member = message.mentions.users.first()
  if(!member) return message.channel.send(embd)

  let image = await Caxinha.canvas.del(member.displayAvatarURL({ dynamic: false, format: 'png' }))

  let attachment = new Discord.MessageAttachment(image, "delete.png")

  await message.channel.send(attachment);
}