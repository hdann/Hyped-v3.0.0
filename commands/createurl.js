const Discord = require('discord.js');
const db = require('quick.db');
const express = require('express');
const app = express()
const router = express.Router();

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}createurl`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}createurl <URL1> <URL2>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  let random = '';
  let dict = '1234567890'
  for(var i = 0; i < 4; i++){
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }
  if(!args[0]) return message.channel.send(embd)
  if(!args[1]) return message.channel.send(embd)

  router.get(`/${args[0]}`, (req, res) => {
    res.redirect(args[1])
  });

  module.exports = router;

  let channel = client.guilds.cache.get("777870393137430589").channels.cache.get("782791748942299167")

  console.log(`✅| URL Criada! ID: ${random}`)
  channel.send(`✅| URL Criada! ID: ${random}`)
  message.lineReply(`Sua URL customizada: https://status.hypeds.com/${args[0]} | ID: ${random}`)
}