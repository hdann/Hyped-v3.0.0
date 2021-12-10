const reddit = require('random-reddit');
const Discord = require('discord.js');
const Disbut = require('discord-buttons');

module.exports.run = async (client, message, args) => {
  let redditArray = [
    "memes",
    "HolUp",
    "orochinho"
  ]

  let reddita = redditArray[Math.floor(Math.random() * redditArray.length)]

  const img = await reddit.getImage(`${reddita}`);

  const embed = new Discord.MessageEmbed()
  .setTitle("😆| Meme do Reddit")
  .setDescription(`Reddit: r/${reddita}`)
  .setColor("#ce3700")
  .setImage(img)
  .setFooter("© HypedGroupCode")
  .setTimestamp();

  const button = new Disbut.MessageButton()
  .setLabel(`Novo Meme`)
  .setID(`btnRefresh`)
  .setStyle(`blurple`);

  const button2 = new Disbut.MessageButton()
  .setLabel(`Outro Reddit`)
  .setID(`otrReddit`)
  .setStyle(`blurple`);

  const row1 = new Disbut.MessageActionRow()
  .addComponents(button, button2);

  message.reply(embed, row1).then(m => {
    client.on("clickButton", async b => {
      if(b.id === "btnRefresh") {
        let redditImg2 = await reddit.getImage(reddita)

        const embed2 = new Discord.MessageEmbed()
        .setTitle("😆| Meme do Reddit")
        .setDescription(`Reddit: r/${reddita}`)
        .setColor("#ce3700")
        .setImage(redditImg2)
        .setFooter("© HypedGroupCode")
        .setTimestamp();

        m.edit(embed2)
        await b.reply.defer()
      }

      if(b.id === "otrReddit") {
        let otrReddit = redditArray[Math.floor(Math.random() * redditArray.length)]

        let redditImg3 = await reddit.getImage(otrReddit)

        const embed3 = new Discord.MessageEmbed()
        .setTitle("😆| Meme do Reddit")
        .setDescription(`Reddit: r/${otrReddit}`)
        .setColor("#ce3700")
        .setImage(redditImg3)
        .setFooter("© HypedGroupCode")
        .setTimestamp();

        m.edit(embed3)
        await b.reply.defer()
      }
    })
  })
}