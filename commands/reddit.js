const reddit = require('random-reddit');
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let redditArray = [
    "memes",
    "HolUp",
    "DontPutThatInYourAss"
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

  message.channel.send(embed)
}