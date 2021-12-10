const Discord = require("discord.js");
const Disbut = require('discord-buttons');
const db = require("quick.db");
const ms = require("parse-ms");//2.1.0

module.exports.run = async (client, message, args, prefix, color, config) => {
  let user = message.author
  let timeout = 86400000

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
  let amount = Math.floor(Math.random() * 10000) + 5000;

  const embed = new Discord.MessageEmbed()
  .setTitle(`:dollar: | Colete seu Daily!`)
  .setDescription(`> Clique no botão abaixo e colete seu daily!`)
  .setColor(color)
  .setFooter(`HYPED ${config.client.version}`)
  .setTimestamp();

  const embedSuccess = new Discord.MessageEmbed()
  .setTitle(`:dollar: | Você resgatou o seu daily!`)
  .setDescription(`> Você resgatou **$ ${amount}**`)
  .setColor(color)
  .setFooter(`HYPED ${config.client.version}`)
  .setTimestamp();

  const botao = new Disbut.MessageButton()
  .setStyle("green")
  .setLabel("Resgatar")
  .setEmoji("🎁")
  .setID('claimDaily');

  const botaoDisabled = new Disbut.MessageButton()
  .setStyle("green")
  .setLabel("Resgatar")
  .setID('claimDailyOff')
  .setEmoji("🎁")
  .setDisabled(true);

  const row1 = new Disbut.MessageActionRow()
  .addComponent(botao);

  const row2 = new Disbut.MessageActionRow()
  .addComponent(botaoDisabled);

  message.channel.send(embed, row1).then(m => {
    client.on('clickButton', async b => {
      if(b.id === "claimDaily") {
        m.edit(embed, { component: row2 })

        if(daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms(timeout - (Date.now() - daily));

          await b.reply.send(`:x: | Você já recebeu sua recompensa diária!\n\nColete novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
        } else {
          b.reply.send(embedSuccess)

          db.add(`money_${user.id}`, amount);
          db.set(`daily_${message.guild.id}_${user.id}`, Date.now());
        }
      }
    })
  })
}
