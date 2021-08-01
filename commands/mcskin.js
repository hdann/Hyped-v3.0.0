const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply('**:x: | Cite um nick de Minecraft (Original)**')

    let embed = new Discord.MessageEmbed()

        .setTitle(`<a:HYminecraft:756119646578671638> | Skin de **${args[0]}**`)
        .setImage(`https://mc-heads.net/skin/${args[0]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor('RANDOM')
    message.channel.send(embed)
}