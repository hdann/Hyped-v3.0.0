const Discord = require('discord.js');
const fs = require('fs');
const colors = require('../database/colors.json');

module.exports.run = async (client, message, args, prefix, color, config) => {

  const embederror = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}SetColor`)
  .setColor(`RANDOM`)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}SetColor <Sua Cor> `)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> O Bot Aceita Apenas Cores Em HEX! Ex: #ad5757`);
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Você não pode trocar a cor deste servidor, pois vc não tem a permissão necessária `MANAGE_GUILD`");
  
  if(!args[0]) return message.reply(embederror)

  colors[message.guild.id] = {
    color: args[0]
  }

  fs.writeFile("./database/colors.json", JSON.stringify(colors), (err) => {
    if (err) console.log(err)
  });

  let embed = new Discord.MessageEmbed()
  .setTitle("👍 | Cor Definda!")
  .setColor(`${args[0]}`)
  .setDescription(`-> | Definida para **${args[0]}**`)
  message.channel.send(embed)
}