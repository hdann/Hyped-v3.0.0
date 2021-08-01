const Discord = require('discord.js');
const discord = Discord
const c = require('../config.json');
const num_conv = require('number-to-words');

module.exports.run = async (client, message, args, prefix, color, config) => { 
    let output = args.join(' ');
    const embed = new Discord.MessageEmbed()
    .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}bigtext`)
    .setColor(color)
    .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}bigtext <texto>`)
    .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Não use caractéres especiais!`)
    if (!output)
        return message.channel.send(embed);

    let bigtext_arr = new Array();
    for (let i = 0; i < output.length; i++) {
        let isnumber = await parseInt(output[i]);
        if (isnumber >= 0 && isnumber <= 9)
            bigtext_arr.push(`:${num_conv.toWords(output[i])}:`)
        else {
            if (output[i] !== ' ') {
                if (!output[i].match(/^[a-zA-Z]+$/)) // Regex for alphabetical entries
                    bigtext_arr.push(`:question:`)
                else
                    bigtext_arr.push(`:regional_indicator_${output[i].toLowerCase()}:`)
            } else bigtext_arr.push('   ');
        }
    }

    try {
        await message.channel.send(bigtext_arr.join(''));
        return message.delete()
    } catch (e) {
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle('Ocorreu um erro ao enviar a mensagem!')
            .setColor(color));
    }


}