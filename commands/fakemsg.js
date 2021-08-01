const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}fakemsg`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}fakemsg <usuário> <mensagem>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  message.delete();
  try {
    let user;
    //usuário
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else if(args[0]) {
      user = client.users.get(args[0]);
    }
    let botmessage = args.slice(1).join(' ')

    if (args[0] == null) {return message.channel.send(embd)}

    if (args[1] == null) {return message.channel.send(embd)}
    //webhook
    
    let webhook = await message.channel.createWebhook(user.username, { avatar: user.displayAvatarURL() })
    await webhook.send(`${botmessage}`);
    webhook.delete();

  } catch (err) {//error
    message.reply(`Mencione um Membro!`)
  }
}