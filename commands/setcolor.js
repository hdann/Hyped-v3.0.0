const Discord = require('discord.js');
const fs = require('fs');
const colors = require('../database/colors.json');

module.exports.run = async (client, message, args, prefix, color, config) => {

  const embederror = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}setcolor`)
  .setColor(`RANDOM`)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}setcolor <cor> `)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> O Bot Aceita Apenas Cores Em HEX! Ex: #ad5757`);
  
  if(!message.member.permissions.has("MANAGE_GUILD")) return message.reply(config.reply.noperm);
  if(!args[0]) return message.reply(embederror)

  colors[message.guild.id] = {
    color: args[0]
  }

  fs.writeFile("./database/colors.json", JSON.stringify(colors), (err) => {
    if (err) console.log(err)
  });

  let embed = new Discord.MessageEmbed()
  .setTitle("<a:HYpositive:763111725510950932> | Cor Definda!")
  .setColor(`${args[0]}`)
  .setDescription(`> Cor Definida para **${args[0]}**`)
  message.lineReply(embed)
}