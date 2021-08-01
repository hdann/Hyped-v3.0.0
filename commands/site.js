const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Olá quer ver mais de minhas funções? Entre no meu site! =>  ${config.websiteURL}`)
    .setColor(color)
    .setFooter(`© HYPED`)
  message.channel.send(embed);
};