const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  let member = message.mentions.users.first() ||  message.author

  let money = db.fetch(`money_${member.id}`)
  let sobremim = db.get(`sobremim_${member.id}`)

  let avatar = member.avatarURL({ dynamic: true, format: "png", size: 1024 });

  if(!sobremim) {
    sobremim = `Nenhuma Biografia Definida, use ${prefix}sobremim`
  }
  if(!money) money = 0

  const embed = new Discord.MessageEmbed()
  .setThumbnail(avatar)
  .setTitle(`🙍‍♂️| Perfil de: ${member.tag}`)
  .setColor(color)
  .addField(`> 💸| Dinheiro:`, `$ ${money}`)
  .addField(`> 📰| Mensagem:`, `${sobremim}`)
  .setFooter(`Sistema de Perfil do Hyped`);

  message.channel.send(embed)


}