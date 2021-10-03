const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Nop! Você não pode usar isso!')

  if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  let server = message.guild.id

  const embed = new Discord.MessageEmbed()
  .setTitle(":thumbsup: | O Sistema de inviteblock foi ativado!")
  .setColor("RANDOM")
  .setDescription(`Eu excluirei todos os convites dos usuários que não tem a permissão \`ADMINISTRATOR\`
  
  -> Para desativar o sistema basta clicar no emoji abaixo!`)
  .setFooter("© HypedGroupCode")
  .setTimestamp()
  message.channel.send(embed).then(msg => {
    msg.react('❌').then(r => {
      const stopFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

      const stops = msg.createReactionCollector(stopFilter);

      stops.on('collect', r => {
        const stopembed = new Discord.MessageEmbed()
        .setTitle(":thumbsup: | O Sistema de inviteblock foi desativado!")
        .setDescription("Para ligar novamente digite \`h!setblocker\`")
        .setColor("RED")
        .setTimestamp()
        .setFooter("© HypedGroupCode")
        msg.edit(stopembed)
        db.delete(`${message.guild.id}_inviteblock`)
      })
    })
  })



  db.set(`${message.guild.id}_inviteblock`, server)
}