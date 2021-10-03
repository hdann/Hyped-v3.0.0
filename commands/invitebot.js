const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Está afim de me adicionar? Clique aqui ->  
    https://www.hypeds.com/hypedbot !`)
    .setColor("RANDOM")
    .setFooter(`© HYPED`)
  message.channel.send(embed);
};