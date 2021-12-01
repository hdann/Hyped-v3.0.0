const Discord = require('discord.js');
const tinyURL = require('tinyurl');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}encurta`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}encurta <URL>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  if(!args[0]) return message.channel.send(embd);

  tinyURL.shorten(args[0], async (res, err) => {
    if(err) {
      console.log(err)
    }
    message.lineReply(`:thumbsup: | URL encurtada! A sua URL é: ${res}`)
  })
}