const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!args[0]) return message.channel.send(':x: | Escreva um ID válido.')

  message.channel.send(`https://discord.com/oauth2/authorize?client_id=${args[0]}&permissions=82671&scope=bot`)
}