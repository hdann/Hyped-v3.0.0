const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const m = await message.channel.send('<a:HYbaiacu:756119666971377756>=🏓**| Pingando!**');

  const embed = new Discord.MessageEmbed()
    .setTitle(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(client.ws.ping)}ms**`)
    .setColor("RANDOM")
    .setFooter(`© HypedGroupCode`)
  message.channel.send(embed).then(msg => {
    msg.react('↩').then(r => {

    })
    const pingFilter = (reaction, user) =>
    reaction.emoji.name === '↩' && user.id ===
    message.author.id;

    const ping = msg.createReactionCollector(pingFilter);

    ping.on('collect', r => {
      const pingembed = new Discord.MessageEmbed()

    .setTitle(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}ms.**\nLatência da API: **${Math.round(
      client.ws.ping
    )}ms**`)
    .setColor("RANDOM")
    .setFooter(`© HypedGroupCode`)
    msg.edit(pingembed)

    })
  })
};