const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix, color, config) => {
  let numero = Math.floor(Math.random() * 100) + 0;

  const embedaviso = new Discord.MessageEmbed()
    .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}Baitola`)
    .setColor(`RANDOM`)
    .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}Baitola <@membro>`)
    .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`);

  let membro = message.mentions.users.first()
  if(!membro) return message.reply(`❌|Mencione um membro`);

  let embedono = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **0%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "732549418829611098") return message.channel.send(embedono);

  let embedlukas = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **0%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "790786020970201090") return message.channel.send(embedlukas);

  let embedlucena = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **-10%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "227431484498116608") return message.channel.send(embedlucena);

  let embedkawan = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **999%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "852718017086488599") return message.channel.send(embedkawan);

  let embedhenry = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **0%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "404263862888693762") return message.channel.send(embedhenry);

  let embedgay = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **100%** Baitola`)
  .setColor('RANDOM')
  if(membro.id === "508644402940477450") return message.channel.send(embedgay);

  let embed = new Discord.MessageEmbed()
  .setTitle(`:rainbow_flag: │Teste de Baitola!`)
  .setDescription(`${membro.username} é **${numero}%** Baitola`)
  .setColor('RANDOM')
  message.channel.send(embed)
}