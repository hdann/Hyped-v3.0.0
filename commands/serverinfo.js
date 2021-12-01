const Discord = require('discord.js')

const moment = require('moment')
moment.locale('pt-br')

 module.exports.run = async (client, message, args, prefix, color, config) => {

    const date = message.guild.createdAt
    const joined = message.member.joinedAt

    const region = {
      brazil: ':flag_br: Brazil'
    }

   const botGuild = await client.guilds.cache.get(message.guild.id)
   let botCount = botGuild.members.cache.filter(m => m.user.bot === true).size

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      .setAuthor('🔍| Informações do servidor')
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription('📰 | Aqui estão algumas informações deste servidor:')
      .addField('> **📌| Nome**', message.guild.name, true)
      .addField('**📎| ID**', message.guild.id, true)
      .addField('> **👑| Dono(a)**', `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
      .addField('> 🔹| Nível de boost:',message.guild.premiumTier, true)
      .addField('<a:pogfish:821748401023746118> | Nivel de Verificação:', `${message.guild.verificationLevel}`)
      .addField(`👥| Membros: (${message.member.guild.memberCount})`,`**😀| Pessoas:** ${botGuild.memberCount - botCount} \n **🤖| Bots:**${botCount}`, true)
      .addField('**🌎| Região**', message.guild.region, true)
      .addField(`**💬| Canais:** (${message.guild.channels.cache.size})`, `**📝| Canais de Texto:** ${message.guild.channels.cache.filter(m => m.type === 'text').size} \n **🔊| Canais de Voz:** ${message.guild.channels.cache.filter(m => m.type === 'voice').size} \n **📢| Canais de Anúncios:** ${message.guild.channels.cache.filter(m => m.type === 'news').size}`,true)
      .addField('> **📥| Criado em**', formatDate('DD/MM/YYYY, às HH:mm:ss', date))
      .addField('> **🚪| Você entrou em**', formatDate('DD/MM/YYYY, às HH:mm:ss', joined))
      .setFooter(`© HypedGroupCode`)
      .setTimestamp()


    message.lineReply(embed)

}

function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}