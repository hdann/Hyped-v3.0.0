const Discord = require('discord.js');
const Jimp = require('jimp');
const db = require('quick.db');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}perfil`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}perfil <usuário>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`)
  .setFooter(`© HypedGroupCode`);

  let member = message.mentions.users.first()

  if(!member) return message.lineReply(embd)

  let money = db.fetch(`money_${member.id}`)
  let sobremim = db.get(`sobremim_${member.id}`)
  let xp = db.get(`${member.id}_points`)
  let followers = db.get(`followers_${member.id}`)
  let following = db.get(`following_${member.id}`)
  let isFollowing = db.get(`${message.author.id}_${member.id}_isFollowing`)
  let items = db.get(`${message.author.id}_items.1`) || db.get(`${message.author.id}_items.2`) || db.get(`${message.author.id}_items.3`) || db.get(`${message.author.id}_items.4`) || db.get(`${message.author.id}_items.5`)
  const chat = client.guilds.cache.get("777870393137430589").channels.cache.get("777870601243197451");

  let avatar = member.avatarURL({ dynamic: true, format: "png", size: 1024 });

  if(!sobremim) {
    sobremim = `-> Nenhuma Biografia Definida, use ${prefix}sobremim`
  }
  if(!money) money = 0
  if(!followers) followers = 0
  if(!following) following = 0
  if(!xp) xp = `0`
  if(!items) items = `🙍‍♂️`

  let moneys = `Money: $ ${money}`
  let xps = `Xp: ${xp}`
  let Followers = `Seguidores: ${followers} | Seguindo: ${following}`
  let msg = ` ${items} | Perfil de <@${member.id}>`

  Jimp.read(`https://imgur.com/PpvBecm.png`, function (err, image) {
    if(err) console.log(err)
    Jimp.loadFont("Anton.fnt").then(async function (font) {
      let avt = await Jimp.read(avatar)
      avt.resize(210, 210)

      image.print(font, 278, 830, member.tag)
      image.print(font, 1638, 785, moneys)
      image.print(font, 1638, 880, xps)
      image.print(font, 290, 890, sobremim)
      image.print(font, 70, 1015, Followers)
      image.composite(avt, 30, 775)

      image.getBuffer(Jimp.MIME_PNG, async (err, buffer) => {
        const attachment = new Discord.MessageAttachment(buffer, 'perfil.png')

        if(message.author.id === member.id) {
          return message.lineReply(`${items}| Seu Perfil`, attachment)
        }

        message.lineReply(msg, attachment).then(msg => {
          msg.react("✅").then(e => {
            msg.react("❌").then(e1 => {
              const followFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
              const unfollowFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

              const follows = msg.createReactionCollector(followFilter);
              const unfollows = msg.createReactionCollector(unfollowFilter);

              follows.on('collect', async r => {
                if(!isFollowing) {
                  db.add(`followers_${member.id}`, 1)
                  db.add(`following_${message.author.id}`, 1)
                  db.set(`${message.author.id}_${member.id}_isFollowing`, true)

                  await message.reply(`:thumbsup: | Você começou a seguir: **${member.tag}**`)
                  msg.reactions.resolve('✅').users.remove(message.author.id)
                  msg.reactions.resolve('✅').users.remove(client.user.id)
                }
                if(isFollowing === true) {
                  await message.reply(`:thumbsup: | Você já está seguindo: **${member.tag}**`)
                  msg.reactions.resolve('✅').users.remove(message.author.id)
                  msg.reactions.resolve('✅').users.remove(client.user.id)
                }
              })
              unfollows.on('collect', async r1 => {
                if(!isFollowing) {
                  await message.reply(`:thumbsup: | Você não está seguindo: **${member.tag}**`)
                  msg.reactions.resolve('❌').users.remove(message.author.id)
                  msg.reactions.resolve('❌').users.remove(client.user.id)
                }
                if(isFollowing) {
                  db.subtract(`followers_${member.id}`, 1)
                  db.subtract(`following_${message.author.id}`, 1)
                  db.delete(`${message.author.id}_${member.id}_isFollowing`)

                  await message.reply(`:thumbsup: | Você deixou de seguir: **${member.tag}**`)
                  msg.reactions.resolve('❌').users.remove(message.author.id)
                  msg.reactions.resolve('❌').users.remove(client.user.id)
                }
              })
            })
          })
        })
      })
    })
  })
}