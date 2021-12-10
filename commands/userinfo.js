const Discord = require('discord.js');
const Disbut = require('discord-buttons');
const db = require('quick.db');
const moment = require('moment');

moment.locale('pt-br')

module.exports.run = async (client, message, args, prefix, color, config) => { 
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}userinfo`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}userinfo <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Você também pode usar ID's de usuários!`)
  .setFooter(`© HypedGroupCode`);

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!member) return message.lineReply(embd);

  let serverpoints = db.get(`${message.guild.id}_${member.id}_points`);
  let globalpoints = db.get(`${member.id}_points`);

  const inline = true;

  const status = {
    online: ' <:online:821496127890391050> Online',
    idle: ' <:away:821496127634538546> Away',
    dnd: ' <:dnd:821496127684608051> Do Not Disturb',
    offline: ' <:offline:821496127701385267> Offline'
  }

  const embedLeft = new Discord.MessageEmbed()
  .setAuthor(`🔍| Informações do usuário`)
  .setColor(color)
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
  .setDescription('📝 | Aqui estão algumas informações deste usuário')
  .addField('> **#|Nome**', `${member.user.tag}`, inline)
  .addField('**👾|ID**', member.user.id, inline)
  .addField('**📎|Nickname**', `${member.nickname !== null ? `Nickname: ${member.nickname}` : 'Nenhum'}`, true)
  .addField('> **📌|Status**', `${status[member.user.presence.status]}`, inline, true)
  .addField('> **📥|Entrou no Discord em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt))
  .addField('📄 | Próxima página:', '️**Clique em ▶️**')
  .setTimestamp()
  .setFooter(`© HypedGroupCode`);

  const embedRight = new Discord.MessageEmbed()
  .setTitle('🔍| Mais Informações do usuário')
  .setDescription('📝 | Aqui estão mais algumas informações deste usuário')
  .setColor(color)
  .addField('> 🏆|Pontos', `-> Pontos no servidor: **${serverpoints}**\n\n -> Pontos globais: **${globalpoints}**`)
  .addField('> Comando solicitado por',`**${message.member.displayName}**`,inline)
  .addField('> **🚪|Entrou aqui em:**', formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt))
  .addField('> **💼|Cargos**', member.roles.cache.array())
  .addField('📄 | Voltar a Página', '️**Clique em ◀️**')
  .setTimestamp()
  .setFooter(`© HypedGroupCode`);

  const bArrowLeft = new Disbut.MessageButton()
  .setEmoji('◀️')
  .setID('ArrowLeft')
  .setStyle('blurple');

  const bArrowLeftDisabled = new Disbut.MessageButton()
  .setEmoji('◀️')
  .setID('ArrowLeftDisabled')
  .setStyle('blurple')
  .setDisabled(true);

  const bArrowRight = new Disbut.MessageButton()
  .setEmoji('▶️')
  .setID('ArrowRight')
  .setStyle('blurple');

  const bArrowRightDisabled = new Disbut.MessageButton()
  .setEmoji('▶️')
  .setID('ArrowRightDisabled')
  .setStyle('blurple')
  .setDisabled(true);

  const row1 = new Disbut.MessageActionRow()
  .addComponents(bArrowLeftDisabled, bArrowRight);

  const row2 = new Disbut.MessageActionRow()
  .addComponents(bArrowLeft, bArrowRightDisabled);

  message.channel.send(embedLeft, row1).then(m => {
    client.on('clickButton', async b => {
      if(b.id === "ArrowLeft") {
        b.message.edit(embedLeft, { components: row1 })
        await b.reply.defer()
      }
      if(b.id === "ArrowRight") {
        b.message.edit(embedRight, { components: row2 })
        await b.reply.defer()
      }
    })
  })
}

function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}