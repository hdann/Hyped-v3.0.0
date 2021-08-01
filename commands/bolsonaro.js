const Discord = require('discord.js'); 
var Jimp = require("jimp"); 

exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}bolsonaro`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}bolsonaro <mensagem>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Escreva algo em até 50 caracteres!`)
  .setFooter(`© HypedGroupCode`); 
    if (message.content.split(' ').slice(1).join(' ').length < 1) { 
        message.channel.send(embd)
    } else { 
        if (message.content.split(' ').slice(1).join(' ').length > 50) { 
            message.reply(`:x: | Limite de 50 caracteres!`)
        } else {
            if (message.member.hasPermission('ATTACH_FILES')) { 
                var authorMessage = message
                message.channel.send('<a:loading:785559393449017394> | Processando...').then(message => { 
                
                    Jimp.read(`https://imgur.com/askQIQ0.png`, function (err, image) {
                        if (err) message.channel.send(':x: | Erro!') 
                        Jimp.loadFont(Jimp.FONT_SANS_64_BLACK).then(function (font) { 
                            image.print(font, 523, 350, authorMessage.content.split(' ').slice(1).join(' '), 500) 
                            var aguardeMessage = message 
                            image.getBuffer(Jimp.MIME_PNG, (err, buffer) => { 
                                const attachment = new Discord.MessageAttachment(buffer, 'bolsonaro.png') 
                                message.channel.send(attachment).then(message => { 
                                    aguardeMessage.delete() 
                                })
                            })
                        })
                    })
                })
            } else {
                message.channel.send(':x: | Eu não tenho a permissão necessária para fazer isso. `ATTACH_FILES`') 
            }
        }
    }
}