const Discord = require("discord.js");

exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}clear`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}clear <número>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Forneça um número entre 1 - 99.`)
  .setFooter(`© HypedGroupCode`);

  if (!message.member.permissions.has(config.permission.manager))
    return message.reply(`:x: | Apenas pessoas com a permissão: ${config.permission.manager} podem usar esse comando!`);
  const deleteCount = parseInt(args[0], 10);
  if (!deleteCount || deleteCount < 1 || deleteCount > 99)
    return message.channel.send(embd)

  const fetched = await message.channel.messages.fetch({
    limit: deleteCount + 1
  });
  message.channel.bulkDelete(fetched);
  message.channel
    .send(`**${args[0]} mensagens limpas nesse chat!**`).then(msg => msg.delete({timeout: 5000}))
    .catch(error =>
      console.log(`Não foi possível deletar mensagens devido a: ${error}`)
    );
};