const Discord = require('discord.js');
const db = require('quick.db');
const disbut = require('discord-buttons');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}perfil`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}perfil <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  let member = message.mentions.users.first()

  if(!member) return message.channel.send(embd)

  let money = db.fetch(`money_${member.id}`)
  let sobremim = db.get(`sobremim_${member.id}`)
  let xp = db.get(`${member.id}_points`)
  let followers = db.get(`followers_${member.id}`)
  let following = db.get(`following_${member.id}`)
  let isFollowing = db.get(`${message.author.id}_${member.id}_isFollowing`)
  let items = db.get(`${member.id}_items.1`) || db.get(`${member.id}_items.2`) || db.get(`${member.id}_items.3`) || db.get(`${member.id}_items.4`) || db.get(`${member.id}_items.5`)


  let avatar = member.avatarURL({ dynamic: true, format: "png", size: 1024 });

  if(!sobremim) {
    sobremim = `-> Nenhuma Biografia Definida, use ${prefix}sobremim`
  }
  if(!money) money = 0
  if(!followers) followers = 0
  if(!following) following = 0
  if(!xp) xp = `-> Este usuário não tem nenhum XP. Ele talvez não gosta de falar muito!`
  if(!items) items = `🙍‍♂️`


  const embed = new Discord.MessageEmbed()
  .setThumbnail(avatar)
  .setTitle(`${items}| Perfil de: ${member.tag}`)
  .setColor(color)
  .addField(`> 💸 | Dinheiro:`, `$ ${money}`)
  .addField(`> 🏆 | XP Global:`, `**${xp}**`)
  .addField(`> 📰 | Mensagem:`, `${sobremim}`)
  .setFooter(`Seguidores: ${followers} | Seguindo: ${following}`);

  const embed1 = new Discord.MessageEmbed()
  .setThumbnail(avatar)
  .setTitle(`${items}| Perfil de: ${member.tag}`)
  .setColor(color)
  .addField(`> 💸 | Dinheiro:`, `$ ${money}`)
  .addField(`> 🏆 | XP Global:`, `**${xp}**`)
  .addField(`> 📰 | Mensagem:`, `${sobremim}`)
  .setFooter(`Seguidores: ${followers} | Seguindo: ${following} - Mencione o perfil de alguém para segui-lo!`);

  let botao1 = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('Follow')
  .setID('seguir');

  let botao2 = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('Unfollow')
  .setID('unfollow');

  let row1 = new disbut.MessageActionRow()
  .addComponents(botao1)
  .addComponents(botao2);

  if(message.author.id === member.id) {
    return message.channel.send(embed1)
  } 
  message.channel.send(embed, row1).then(m => {
    const buttonFilter = (button) => button.clicker.user.id === message.author.id
    const buttonCollector = m.createButtonCollector(buttonFilter)

    const buttonFilter2 = (bu) => bu.clicker.user.id === !message.author.id
    const buttonCollector2 = m.createButtonCollector(buttonFilter2)

    buttonCollector2.on('collect', async b1 => {
      if(b1.id === "seguir") {
        await b1.reply.send(`:x: | Você tem que digitar **${prefix}perfil** <@${member.id}> para poder seguir esse usuário!`, true)
      }
      if(b1.id === "unfollow") {
        await b1.reply.send(`:x: | Você tem que digitar **${prefix}perfil** <@${member.id}> para poder deixar de seguir esse usuário!`, true)
      }
    })

    buttonCollector.on('collect', async b => {
      if(!isFollowing) {
        if(b.id === "seguir") {
        db.add(`followers_${member.id}`, 1)
        db.add(`following_${b.clicker.user.id}`, 1)
        db.set(`${message.author.id}_${member.id}_isFollowing`, true)
        await b.message.edit(embed, { component: null })

       await b.reply.send(`:thumbsup: | Você começou a seguir **${member.tag}**`, true)
      }
      if(b.id === "unfollow") {
        await b.reply.send(`:x: | Você não está seguindo este usuário!`, true)
      }
    } 

    if(isFollowing === true) {
      if(b.id === "unfollow") {
      db.subtract(`followers_${member.id}`, 1)
      db.subtract(`following_${b.clicker.user.id}`, 1)
      db.delete(`${message.author.id}_${member.id}_isFollowing`)
      await b.message.edit(embed, { component: null })

      await b.reply.send(`:thumbsup: | Você deixou de seguir **${member.tag}**`, true)
     }
     if(b.id === "seguir") {
       await b.reply.send(`:x: | Você já está seguindo este usuário!`, true)
     }
    }
  })
 })
}