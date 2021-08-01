const Disbut = require('discord-buttons');
const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  message.delete()
  //prefix

  const embedhelp = new Discord.MessageEmbed()
  .setTitle("🔧| Url-Button")
  .setDescription(`<a:HYpositive:763111725510950932> | Como usar: 
  
  ${prefix}urlbutton <mensagem> <titulo-do-botão> <url>`)
  .addField("👍| Observação:", `A url precisa ter "https://"`)
  .setImage("https://cdn.discordapp.com/attachments/777870495390892033/863897862093799434/unknown.png")
  .setColor(color)
  .setTimestamp()
  .setFooter("© HypedGroupCode");

  if(!args[0]) return message.channel.send(embedhelp);

  if(!args[1]) return message.channel.send(embedhelp);

  if(!args[2]) return message.channel.send(embedhelp);

  let button = new Disbut.MessageButton()
  .setStyle('url')
  .setLabel(`${args[1]}`)
  .setURL(`${args[2]}`);

  let row = new Disbut.MessageActionRow()
  .addComponents(button);

  message.channel.send(`${args[0]}`, row)
  
}