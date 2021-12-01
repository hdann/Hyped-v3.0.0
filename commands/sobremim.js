const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args, prefix, color, config) => {

  const embederror21 = new Discord.MessageEmbed()
   .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}Sobremim`)
   .setColor(color)
   .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}Sobremim <Bio> `)
   .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`);



  let bio = args.join(' ')

  if(!bio){
  return message.lineReply(embederror21)
  }

message.lineReply(`Seu novo sobremim é: \`${bio}\`, Use ${prefix}perfil para ver sua Bio!`)
db.set(`sobremim_${message.author.id}`, bio)
}