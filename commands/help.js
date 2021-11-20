const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix, color, config) => {

  //Linguagem Pt-Br
  const brazilembed = new Discord.MessageEmbed()
  .setTitle(`Bem Vindo Ao Menu De Ajuda!`)
  .setColor(color)
  .addField(`🔗|Me Adicione`, `[Clique Aqui](https://www.hypeds.com/addbot)`)
  .addField(`💿|Meus Comandos`, `*Para acessar as abas basta reagir de acordo com o que procura!*`)
  .addField(`<:pasta:786293846156771379>|CATEGORIAS:`, `
  \🔍**|Info**
  \⚙️**|Utiliários**
  \🔧**|Staff**
  \😆**|Diversão**
  \😀**|Diversão2**
  \🛠️**|Config**
  \↩️|*Voltar*`)
  .setImage(`https://i.imgur.com/HpI5ppM.png`)
  if(message.guild.region === "brazil") return message.channel.send(brazilembed).then(msg => {
    msg.react('🔍').then(r => {
      msg.react('⚙️').then(r6 => {
      msg.react('🔧').then(r1 => {
        msg.react('😆').then(r2 => {
          msg.react('😀').then(r3 => {
          msg.react('🛠️').then(r4 => {
            msg.react('↩️').then(r5 => {
              //Message Collector
              const infosFilter = (reaction, user) => reaction.emoji.name === '🔍' && user.id === message.author.id;
              const admFilter = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
              const funFilter = (reaction, user) => reaction.emoji.name === '😆' && user.id === message.author.id;
              const funFilter2 = (reaction, user) => reaction.emoji.name === '😀' && user.id === message.author.id;
              const configFilter = (reaction, user) => reaction.emoji.name === '🛠️' && user.id === message.author.id;
              const backFilter = (reaction, user) => reaction.emoji.name === '↩️' && user.id === message.author.id;
              const utilFilter = (reaction, user) => reaction.emoji.name === '⚙️' && user.id === message.author.id;

              const infos = msg.createReactionCollector(infosFilter);
              const adm = msg.createReactionCollector(admFilter);
              const fun = msg.createReactionCollector(funFilter);
              const fun2 = msg.createReactionCollector(funFilter2);
              const config = msg.createReactionCollector(configFilter);
              const back = msg.createReactionCollector(backFilter);
              const util = msg.createReactionCollector(utilFilter);

              //Embed Edits
              infos.on('collect', r => {
                const infoembed = new Discord.MessageEmbed()
                .setTitle(`🔍|Comandos Informativos`)
                .setColor(color)
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos', `*${prefix}ajuda ou ${prefix}help* - Exibe o menu de ajuda.

               *${prefix}avatar <usuário>* - Mostra o avatar do usuário!

               *${prefix}perfil ou profile <usuario>* - Mostra o seu Perfil do Hyped.

               *${prefix}points ou ${prefix}pontos* - Mostra sua pontuação no Hyped.

               *${prefix}ping* - Mostra o delay bot-servidor.

               *${prefix}serverinfo* - informações do servidor!

               *${prefix}servericon* - Mostra o ícone do servidor.

               *${prefix}userinfo* - informações do usuario!

               *${prefix}botinfo* - informações do BOT!

               *${prefix}uptime* - o horário em que eu acordei!`)
               msg.edit(infoembed)
               msg.reactions.resolve('🔍').users.remove(message.author.id)
              })
              util.on('collect', r => {
                const utilsEmbed = new Discord.MessageEmbed()
                .setTitle(`⚙️| Comandos Utiliários`)
                .setColor(color)
                .setDescription(`Meu prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos', `*${prefix}daily* - Te da Até $ 10.000,00 por Dia.
                
                *${prefix}atm ou ${prefix}bal* - Te mostra quanto dinheiro vc tem

                *${prefix}loja* - Te permite comprar decorações para o seu perfil do hyped.
                
                *${prefix}tempo ou ${prefix}weather* - Mostra como está o tempo na sua cidade!
                
                *${prefix}qrcode <url>* - Cria um qrcode!
                
                *${prefix}encurta <url>* - Encurta uma url.
                
                *${prefix}verify* - Faz a verifiação do captcha.
                
                *${prefix}urlbutton* - Faz um botão com url!`)
                msg.edit(utilsEmbed)
                msg.reactions.resolve('⚙️').users.remove(message.author.id)
              })
              adm.on('collect', r1 => {
                const admembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("🔧|Comandos de administração!")
                .setDescription(`Meu Prefixo Neste servidor **${prefix}**`)
                .addField(`Meus Comandos`, `*${prefix}clear ou ${prefix}limpar <1-99>* - Limpa as Mensagens! 
                
                *${prefix}aviso ou ${prefix}warn <usuário>* - Avisa um usuário

                *${prefix}avisos ou ${prefix}warns <usuário>* - Mostra os Warns de um usuário

                *${prefix}clearwarns ou ${prefix}rwarns <usuário>* - Limpa os warns de um usuário

                *${prefix}ticket <create ou delete>* - Cria um Ticket!
                
                *${prefix}ban <usuário> <razão>* - Bane Um usuário
                
                *${prefix}mute <usuário> <tempo> <razão>* - Muta um usuário
                
                *${prefix}unban <usuário>* - Desbane um usuário.

                *${prefix}unmute <usuário>* - Desmuta um usuário.
                
                *${prefix}slowmode <tempo>* - Configura um slowmode para o seu chat!

                *${prefix}lock* - Tranca um canal!

                *${prefix}unlock* - Destranca um canal!
                
                *${prefix}embed <mensagem>* - Cria um embed apartir de uma mensagem.`)
                msg.edit(admembed)
                msg.reactions.resolve('🔧').users.remove(message.author.id)
              })
              fun.on('collect', r2 => {
                const funembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("😆|Comandos De Diversão")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos:', `*${prefix}bolsonaro <mensagem>* - Faz o bolsonaro falar algo.

               *${prefix}simsimi* <mensagem> - Fale com o simsimi. 

               *${prefix}say <mensagem>* - Faz com que eu repita uma frase.

               *${prefix}fakemsg <usuário> <mensagem>* - Faz com que vc fale por alguém!

               *${prefix}reddit* - Envia um Meme do Reddit.

               *${prefix}triggered <usuário>* - Cria um meme triggered com o avatar do usuário.

               *${prefix}affect <usuário>* - Cria um meme affect com o avatar do usuário.

               *${prefix}beautiful <usuário>* - Cria um meme beautiful com o avatar do usuário.

               *${prefix}comunism <usuário>* - Cria um meme comunism com o avatar do usuário.

               *${prefix}wasted <usuário>* - Cria um meme wasted com o avatar do usuário.

               *${prefix}reverse <mensagem>* - Inverte sua mensagem !`)
               msg.edit(funembed)
               msg.reactions.resolve('😆').users.remove(message.author.id)
              })
              fun2.on('collect', r3 => {
                const embeddiversao = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("😆|Comandos de diversão!")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos:', `*${prefix}howgay <usuário>* - Responde se vc é gay!

               *${prefix}hackear <usuario>* - Hackeie um usuário!
 
               *${prefix}baitola <usuario>* - Mostra se vc e baitola!

               *${prefix}gay <usuário>* - Cria uma imagem gay com o avatar do usuário.

               *${prefix}delete <usuário>* - Cria um meme delete com o avatar do usuário.

               *${prefix}tapa <usuário>* - Da um Tapa Em alguém!

               *${prefix}blur <usuário>* - Da um blur no avatar do usuário.

               *${prefix}wanted <usuário>* - Cria um meme wanted com o avatar do usuário.

               *${prefix}tiodopave* - Manda um piada de Tiozão

               *${prefix}8ball <mensagem>* - Responde suas perguntas.

               *${prefix}morse <mensagem>* - Transforma um texto em código morse.`)
               msg.edit(embeddiversao)
               msg.reactions.resolve('😀').users.remove(message.author.id)
              })
              config.on('collect', r4 => {
                const configembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("🛠️|Comandos de Configuração")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField(`Meus Comandos`, `*${prefix}setcolor* - Define um cor para as mensagens em embed
                
                *${prefix}setprefix <prefixo>* - Define um prefixo para seu servidor

                *${prefix}setlogs <canal>* - Define um canal para as logs do bot.

                *${prefix}setblocker <on ou off>* - Liga o Sistema Anti-Invite

                *${prefix}sobremim <mensagem>* - Define uma Bio Para o seu Perfil.

                *${prefix}setcaptcha <on ou off> <id do cargo>* - Define um captcha no seu servidor.

                *${prefix}ticket <on ou off>* - Habilita o sistema de ticket no servidor!

                *${prefix}setwelcome <canal>* - Define um chat para o welcome.`)
                msg.edit(configembed)
                msg.reactions.resolve('🛠️').users.remove(message.author.id)
              })
              back.on('collect', r5 => {
                const backembed = new Discord.MessageEmbed()
                .setTitle(`Bem Vindo Ao Menu De Ajuda!`)
                .setColor(color)
                .addField(`🔗|Me Adicione`, `[Clique Aqui](https://www.hypeds.com/addbot)`)
                .addField(`💿|Meus Comandos`, `*Para acessar as abas basta reagir de acordo com o que procura!*`)
                .addField(`<:pasta:786293846156771379>|CATEGORIAS:`, `
                \🔍**|Info**
                \⚙️**|Utiliários**
                \🔧**|Staff**
                \😆**|Diversão**
                \😀**|Diversão2**
                \🛠️**|Config**
                \↩️|*Voltar*`)
                .setImage(`https://i.imgur.com/HpI5ppM.png`)
                msg.edit(backembed)
                msg.reactions.resolve('↩️').users.remove(message.author.id)
              })

              })
            })
          })
        })
      })
      })
    })

  })

  //Linguagem Ingles 1
  const embed1 = new Discord.MessageEmbed()
  .setTitle(`Welcome To Help Menu!`)
  .setColor(color)
  .addField(`🔗|Add Me`, `[Click Here](https://www.hypeds.com/addbot)`)
  .addField(`🔧|Staff`, `\`${prefix}warn\` <user> - Warn a User!
  \`${prefix}mute\` <user> <time> <reason> - Mute a User
  \`${prefix}ban\` <user> <reason> - Ban a User
  \`${prefix}embed\` <message> - Create a embed message
  \`${prefix}setprefix\` <prefix> - Sets a Prefix for your server`)
  .addField(`🔍|Info`, `\`${prefix}avatar\` <user> - Gets an user Avatar
  \`${prefix}botinfo\` - Gets Bot Info
  \`${prefix}serverinfo\` - Gets serverinfo
  \`${prefix}userinfo\` - Gets userinfo
  \`${prefix}weather\` <city> - Gets your weather`)
  .addField(`😆|Fun`, `\`${prefix}say\` <message> - Make i say something
  \`${prefix}bigtext\` <message> - Makes your message BIG
  \`${prefix}fakemsg\` <user> <message> - Fake a msg!
  \`${prefix}lenny\` - Send a Lenny!
  \`${prefix}morse\` <message> - Makes a morse code message
  \`${prefix}cat\` - Sends a Random Cat
  \`${prefix}dog\` - Sends a Random Dog`)
  
  if(message.guild.region === "us-east") return message.channel.send(embed1)
  if(message.guild.region === "us-south") return message.channel.send(embed1)
  if(message.guild.region === "us-central") return message.channel.send(embed1)
  if(message.guild.region === "hongkong") return message.channel.send(embed1)
  if(message.guild.region === "sydney") return message.channel.send(embed1)
  if(message.guild.region === "singapore") return message.channel.send(embed1)
  if(message.guild.region === "russia") return message.channel.send(embed1)
  if(message.guild.region === "europe") return message.channel.send(embed1)
}