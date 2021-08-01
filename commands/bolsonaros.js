const Discord = require('discord.js');
  
  var fortunes = [
  `https://imgur.com/elI5QcE.png`,
  `https://imgur.com/0ok2etj.png`,
  `https://imgur.com/gVRE5dn.png`,
  `https://imgur.com/SuVuG99.gif`,
  `https://imgur.com/4aGy3Ci.png`,
  `https://imgur.com/ylQMCVK.png`,
  `https://imgur.com/WRUz9Yw.png`,
  `https://imgur.com/WlYVGlA.png`,
  `https://imgur.com/CfB2cA8.png`


  ];
  
  exports.run = async (client, message, args, prefix, color, config) => {

    const bolsonaros = (fortunes[Math.floor(Math.random() * fortunes.length)]);

    const embed = new Discord.MessageEmbed()
    .setTitle('<a:HYbirowallk:822153035890556948>| Bolsonaro')
    .setImage(bolsonaros)
    .setTimestamp()
    .setColor(color)
    message.channel.send(embed)

  
  };
  