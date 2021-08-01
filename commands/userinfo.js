const Discord = require('discord.js')

const moment = require('moment')
moment.locale('pt-br')

module.exports = {

  run: function (client, message, args, prefix, color, config) {
    const embederror21 = new Discord.MessageEmbed()
   .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}Userinfo`)
   .setColor(color)
   .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}Userinfo <@member> `)
   .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`);

    let user = message.mentions.users.first();
    if (!user) return message.reply(embederror21);
    const inline = true
    const status = {
      online: ' <:online:821496127890391050> Online',
      idle: ' <:away:821496127634538546> Away',
      dnd: ' <:dnd:821496127684608051> Dnd',
      offline: ' <:offline:821496127701385267> Offline'
    }
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member
    const target = message.mentions.users.first() || message.author
    const bot = member.user.bot ? '`🤖` Sim' : ' `🙂` Não'

    const embed = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
      .setColor(color)
      .setAuthor('🔍| Informações do usuário')
      .setDescription('📝 | Aqui estão algumas informações deste usuário')
      .addField('> **#|Nome**', `${member.user.tag}`, inline)
      .addField('**👾|ID**', member.user.id, inline)
      .addField('**📎|Nickname**', `${member.nickname !== null ? `Nickname: ${member.nickname}` : 'Nenhum'}`, true)
      .addField('> **📌|Status**', `${status[member.user.presence.status]}`, inline, true)
      .addField('> **📥|Entrou no Discord em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt))
      .addField('📄 | Próxima página:', '️**Clique em ▶️**')
      .setTimestamp()
      .setFooter(`© HypedGroupCode`)
      message.channel.send(embed).then(msg => {
        msg.react('◀️').then(r => {
        msg.react('▶️').then(r1 => {

         })
        
        const ladoFilter = (reaction, user) =>
        reaction.emoji.name === '▶️' && user.id ===
        message.author.id;
        const lado2Filter = (reaction, user) =>
        reaction.emoji.name === '◀️' && user.id ===
        message.author.id;

        const lado = msg.createReactionCollector(ladoFilter)
        const lado2 = msg.createReactionCollector(lado2Filter)

        lado.on('collect', r => {
          const ladoembed = new Discord.MessageEmbed()

          .setTitle('🔍| Mais Informações do usuário')
          .setDescription('📝 | Aqui estão mais algumas informações deste usuário')
          .setColor(color)
          .addField('> Comando solicitado por',`**${message.member.displayName}**`,inline)
          .addField('**🤖|Bot**', `${bot}`, inline, true)
          .addField('> **🚪|Entrou aqui em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt))
          .addField('> **💼|Cargos**', member.roles.cache.array())
          .addField('📄 | Voltar a Página', '️**Clique em ◀️**')
          .setTimestamp()
          .setFooter(`© HypedGroupCode`)
          msg.edit(ladoembed)
        })
        
        lado2.on('collect', r1 => {
          const lado2embed = new Discord.MessageEmbed()

          .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setColor(color)
          .setAuthor('🔍| Informações do usuário')
          .setDescription('📝 | Aqui estão algumas informações deste usuário')
          .addField('> **#|Nome**',`${member.user.tag}`, inline)
          .addField('**👾|ID**', member.user.id, inline)
          .addField('**📎|Nickname**', `${member.nickname !== null ? `Nickname: ${member.nickname}` : 'Nenhum'}`, true)
          .addField('> **📌|Status**', `${status[member.user.presence.status]}`, inline, true)
          .addField('> **📥|Entrou no Discord em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt))
          .addField('📄 | Próxima página:', '️**Clique em ▶️**')
          .setFooter(`© HypedGroupCode`)
          msg.edit(lado2embed)
        })

      })
    })
  }
}
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}