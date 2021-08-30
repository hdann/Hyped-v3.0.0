const Discord = require('discord.js');
const db = require('quick.db');
const disbut = require('discord-buttons')

module.exports.run = async (client, message, args, prefix, color, config) => {
  let money = db.get(`money_${message.author.id}`)
  let items = db.get(`${message.author.id}_items`)

  const embed = new Discord.MessageEmbed()
  .setTitle(`🛒 | Loja do Hyped`)
  .setDescription(`Compre itens para customizar seu perfil!`)
  .setColor(color)
  .addField('> 🙃 | Emblemas de Perfil', `1 | "<:furry:880983048294924308>": Emblema de perfil - $ 10.000 \n 2 |  "<a:pogfish:821748401023746118>": Emblema de Perfil - $ 10.000 \n 3 | "<:HYdev:756119645215260753>": Emblema de perfil - $ 10.000 \n  4 | "<a:HYbaiacu:756119666971377756>": Emblema de perfil - $ 5.000  \n 5 |  "<a:loading:785559393449017394>": Emblema de perfil - $ 5.000`)
  .addField('> 🖼️ | Backgrounds de Perfil', ':x: | Coming Soon')
  .setFooter(`Seu Dinheiro: ${money}`)
  .setTimestamp();

  const botao1 = new disbut.MessageButton()
  .setLabel('1')
  .setStyle('blurple')
  .setID('1');

  const botao2 = new disbut.MessageButton()
  .setLabel('2')
  .setStyle('blurple')
  .setID('2');

  const botao3 = new disbut.MessageButton()
  .setLabel('3')
  .setStyle('blurple')
  .setID('3');

  const botao4 = new disbut.MessageButton()
  .setLabel('4')
  .setStyle('blurple')
  .setID('4');

  const botao5 = new disbut.MessageButton()
  .setLabel('5')
  .setStyle('blurple')
  .setID('5');

  const row = new disbut.MessageActionRow()
  .addComponents(botao1, botao2, botao3, botao4, botao5);

  message.channel.send(embed, row).then(m => {
    const buttonFilter = (button) => button.clicker.user.id === message.author.id
    const buttonCollector = m.createButtonCollector(buttonFilter)

    buttonCollector.on('collect', async b => {
      if(b.id === "1") {
        if(money < 10000) return b.reply.send(`:x: | Você não tem dinheiro suficiente!`)
        if(db.get(`${message.author.id}_items.1`) === '<:furry:880983048294924308>') return b.reply.send(`:x: | Vc já comprou este item!`)
        if(!items) db.set(`${message.author.id}_items`, { 1: false, 2: false, 3: false, 4: false, 5: false })
        await b.reply.send(`:thumbsup: | Você comprou um emblma de perfil. Veja no seu perfil, digite **${prefix}perfil**`)

        db.subtract(`money_${message.author.id}`, 10000)
        db.set(`${message.author.id}_items.1`, '<:furry:880983048294924308>') 
      }
      if(b.id === "2") {
        if(money < 10000) return b.reply.send(`:x: | Você não tem dinheiro suficiente!`)
        if(db.get(`${message.author.id}_items.2`) === '<a:pogfish:821748401023746118>') return b.reply.send(`:x: | Vc já comprou este item!`)
        if(!items) db.set(`${message.author.id}_items`, { 1: false, 2: false, 3: false, 4: false, 5: false })
        await b.reply.send(`:thumbsup: | Você comprou um emblma de perfil. Veja no seu perfil, digite **${prefix}perfil**`)

        db.subtract(`money_${message.author.id}`, 10000)
        db.set(`${message.author.id}_items.2`, '<a:pogfish:821748401023746118>') 
      }
      if(b.id === "3") {
        if(money < 10000) return b.reply.send(`:x: | Você não tem dinheiro suficiente!`)
        if(db.get(`${message.author.id}_items.3`) === '<:HYdev:756119645215260753>') return b.reply.send(`:x: | Vc já comprou este item!`)
        if(!items) db.set(`${message.author.id}_items`, { 1: false, 2: false, 3: false, 4: false, 5: false })
        await b.reply.send(`:thumbsup: | Você comprou um emblma de perfil. Veja no seu perfil, digite **${prefix}perfil**`)

        db.subtract(`money_${message.author.id}`, 10000)
        db.set(`${message.author.id}_items.3`, '<:HYdev:756119645215260753>')
      }
      if(b.id === "4") {
        if(money < 5000) return b.reply.send(`:x: | Você não tem dinheiro suficiente!`)
        if(db.get(`${message.author.id}_items.4`) === '<a:HYbaiacu:756119666971377756>') return b.reply.send(`:x: | Vc já comprou este item!`)
        if(!items) db.set(`${message.author.id}_items`, { 1: false, 2: false, 3: false, 4: false, 5: false })
        await b.reply.send(`:thumbsup: | Você comprou um emblma de perfil. Veja no seu perfil, digite **${prefix}perfil**`)

        db.subtract(`money_${message.author.id}`, 5000)
        db.set(`${message.author.id}_items.4`, '<a:HYbaiacu:756119666971377756>')
      }
      if(b.id === "5") {
        if(money < 5000) return b.reply.send(`:x: | Você não tem dinheiro suficiente!`)
        if(db.get(`${message.author.id}_items.5`) === '<a:loading:785559393449017394>') return b.reply.send(`:x: | Vc já comprou este item!`)
        if(!items) db.set(`${message.author.id}_items`, { 1: false, 2: false, 3: false, 4: false, 5: false })
        await b.reply.send(`:thumbsup: | Você comprou um emblma de perfil. Veja no seu perfil, digite **${prefix}perfil**`)

        db.subtract(`money_${message.author.id}`, 5000)
        db.set(`${message.author.id}_items.5`, '<a:loading:785559393449017394>')
      }
    })
  })
}