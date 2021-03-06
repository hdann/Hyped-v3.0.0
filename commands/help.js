const Discord = require('discord.js')

module.exports.run = async (client, message, args, prefix, color, config) => {

  //Linguagem Pt-Br
  const brazilembed = new Discord.MessageEmbed()
  .setTitle(`Bem Vindo Ao Menu De Ajuda!`)
  .setColor(color)
  .addField(`๐|Me Adicione`, `[Clique Aqui](https://www.hypeds.com/addbot)`)
  .addField(`๐ฟ|Meus Comandos`, `*Para acessar as abas basta reagir de acordo com o que procura!*`)
  .addField(`<:pasta:786293846156771379>|CATEGORIAS:`, `
  \๐**|Info**
  \โ๏ธ**|Utiliรกrios**
  \๐ง**|Staff**
  \๐**|Diversรฃo**
  \๐**|Diversรฃo2**
  \๐ ๏ธ**|Config**
  \โฉ๏ธ|*Voltar*`)
  .setImage(`https://i.imgur.com/HpI5ppM.png`)
   message.lineReply(brazilembed).then(msg => {
    msg.react('๐').then(r => {
      msg.react('โ๏ธ').then(r6 => {
      msg.react('๐ง').then(r1 => {
        msg.react('๐').then(r2 => {
          msg.react('๐').then(r3 => {
          msg.react('๐ ๏ธ').then(r4 => {
            msg.react('โฉ๏ธ').then(r5 => {
              //Message Collector
              const infosFilter = (reaction, user) => reaction.emoji.name === '๐' && user.id === message.author.id;
              const admFilter = (reaction, user) => reaction.emoji.name === '๐ง' && user.id === message.author.id;
              const funFilter = (reaction, user) => reaction.emoji.name === '๐' && user.id === message.author.id;
              const funFilter2 = (reaction, user) => reaction.emoji.name === '๐' && user.id === message.author.id;
              const configFilter = (reaction, user) => reaction.emoji.name === '๐ ๏ธ' && user.id === message.author.id;
              const backFilter = (reaction, user) => reaction.emoji.name === 'โฉ๏ธ' && user.id === message.author.id;
              const utilFilter = (reaction, user) => reaction.emoji.name === 'โ๏ธ' && user.id === message.author.id;

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
                .setTitle(`๐|Comandos Informativos`)
                .setColor(color)
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos', `*${prefix}ajuda ou ${prefix}help* - Exibe o menu de ajuda.

               *${prefix}avatar <usuรกrio>* - Mostra o avatar do usuรกrio!

               *${prefix}perfil ou profile <usuario>* - Mostra o seu Perfil do Hyped.

               *${prefix}points ou ${prefix}pontos* - Mostra sua pontuaรงรฃo no Hyped.

               *${prefix}ping* - Mostra o delay bot-servidor.

               *${prefix}serverinfo* - informaรงรตes do servidor!

               *${prefix}servericon* - Mostra o รญcone do servidor.

               *${prefix}userinfo* - informaรงรตes do usuario!

               *${prefix}botinfo* - informaรงรตes do BOT!

               *${prefix}uptime* - o horรกrio em que eu acordei!`)
               msg.edit(infoembed)
               msg.reactions.resolve('๐').users.remove(message.author.id)
              })
              util.on('collect', r => {
                const utilsEmbed = new Discord.MessageEmbed()
                .setTitle(`โ๏ธ| Comandos Utiliรกrios`)
                .setColor(color)
                .setDescription(`Meu prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos', `*${prefix}daily* - Te da Atรฉ $ 10.000,00 por Dia.
                
                *${prefix}atm ou ${prefix}bal* - Te mostra quanto dinheiro vc tem

                *${prefix}loja* - Te permite comprar decoraรงรตes para o seu perfil do hyped.
                
                *${prefix}tempo ou ${prefix}weather* - Mostra como estรก o tempo na sua cidade!
                
                *${prefix}qrcode <url>* - Cria um qrcode!
                
                *${prefix}encurta <url>* - Encurta uma url.
                
                *${prefix}verify* - Faz a verifiaรงรฃo do captcha.
                
                *${prefix}urlbutton* - Faz um botรฃo com url!`)
                msg.edit(utilsEmbed)
                msg.reactions.resolve('โ๏ธ').users.remove(message.author.id)
              })
              adm.on('collect', r1 => {
                const admembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("๐ง|Comandos de administraรงรฃo!")
                .setDescription(`Meu Prefixo Neste servidor **${prefix}**`)
                .addField(`Meus Comandos`, `*${prefix}clear ou ${prefix}limpar <1-99>* - Limpa as Mensagens! 
                
                *${prefix}aviso ou ${prefix}warn <usuรกrio>* - Avisa um usuรกrio

                *${prefix}avisos ou ${prefix}warns <usuรกrio>* - Mostra os Warns de um usuรกrio

                *${prefix}clearwarns ou ${prefix}rwarns <usuรกrio>* - Limpa os warns de um usuรกrio
                
                *${prefix}ban <usuรกrio> <razรฃo>* - Bane Um usuรกrio
                
                *${prefix}mute <usuรกrio> <tempo> <razรฃo>* - Muta um usuรกrio
                
                *${prefix}unban <usuรกrio>* - Desbane um usuรกrio.

                *${prefix}unmute <usuรกrio>* - Desmuta um usuรกrio.

                *${prefix}ticket <create ou delete>* - Cria um Ticket!
                
                *${prefix}slowmode <tempo>* - Configura um slowmode para o seu chat!

                *${prefix}lock* - Tranca um canal!

                *${prefix}unlock* - Destranca um canal!
                
                *${prefix}embed <mensagem>* - Cria um embed apartir de uma mensagem.`)
                msg.edit(admembed)
                msg.reactions.resolve('๐ง').users.remove(message.author.id)
              })
              fun.on('collect', r2 => {
                const funembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("๐|Comandos De Diversรฃo")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos:', `*${prefix}bolsonaro <mensagem>* - Faz o bolsonaro falar algo.

               *${prefix}simsimi* <mensagem> - Fale com o simsimi. 

               *${prefix}say <mensagem>* - Faz com que eu repita uma frase.

               *${prefix}fakemsg <usuรกrio> <mensagem>* - Faz com que vc fale por alguรฉm!

               *${prefix}reddit* - Envia um Meme do Reddit.

               *${prefix}triggered <usuรกrio>* - Cria um meme triggered com o avatar do usuรกrio.

               *${prefix}affect <usuรกrio>* - Cria um meme affect com o avatar do usuรกrio.

               *${prefix}beautiful <usuรกrio>* - Cria um meme beautiful com o avatar do usuรกrio.

               *${prefix}comunism <usuรกrio>* - Cria um meme comunism com o avatar do usuรกrio.

               *${prefix}wasted <usuรกrio>* - Cria um meme wasted com o avatar do usuรกrio.

               *${prefix}reverse <mensagem>* - Inverte sua mensagem !`)
               msg.edit(funembed)
               msg.reactions.resolve('๐').users.remove(message.author.id)
              })
              fun2.on('collect', r3 => {
                const embeddiversao = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("๐|Comandos de diversรฃo!")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField('Meus Comandos:', `*${prefix}howgay <usuรกrio>* - Responde se vc รฉ gay!

               *${prefix}hackear <usuario>* - Hackeie um usuรกrio!
 
               *${prefix}baitola <usuario>* - Mostra se vc e baitola!

               *${prefix}gay <usuรกrio>* - Cria uma imagem gay com o avatar do usuรกrio.

               *${prefix}delete <usuรกrio>* - Cria um meme delete com o avatar do usuรกrio.

               *${prefix}tapa <usuรกrio>* - Da um Tapa Em alguรฉm!

               *${prefix}blur <usuรกrio>* - Da um blur no avatar do usuรกrio.

               *${prefix}wanted <usuรกrio>* - Cria um meme wanted com o avatar do usuรกrio.

               *${prefix}tiodopave* - Manda um piada de Tiozรฃo

               *${prefix}8ball <mensagem>* - Responde suas perguntas.

               *${prefix}morse <mensagem>* - Transforma um texto em cรณdigo morse.`)
               msg.edit(embeddiversao)
               msg.reactions.resolve('๐').users.remove(message.author.id)
              })
              config.on('collect', r4 => {
                const configembed = new Discord.MessageEmbed()
                .setColor(color)
                .setTitle("๐ ๏ธ|Comandos de Configuraรงรฃo")
                .setDescription(`Meu Prefixo neste servidor **${prefix}**`)
                .addField(`Meus Comandos`, `*${prefix}setcolor* - Define um cor para as mensagens em embed
                
                *${prefix}setprefix <prefixo>* - Define um prefixo para seu servidor

                *${prefix}setlogs <canal>* - Define um canal para as logs do bot.

                *${prefix}setblocker <on ou off>* - Liga o Sistema Anti-Invite

                *${prefix}ticket <on ou off>* - Define o Sistema de Ticket Ligado ou Desligado!

                *${prefix}sobremim <mensagem>* - Define uma Bio Para o seu Perfil.

                *${prefix}setcaptcha <on ou off> <id do cargo>* - Define um captcha no seu servidor.

                *${prefix}setwelcome <canal>* - Define um chat para o welcome.`)
                msg.edit(configembed)
                msg.reactions.resolve('๐ ๏ธ').users.remove(message.author.id)
              })
              back.on('collect', r5 => {
                const backembed = new Discord.MessageEmbed()
                .setTitle(`Bem Vindo Ao Menu De Ajuda!`)
                .setColor(color)
                .addField(`๐|Me Adicione`, `[Clique Aqui](https://www.hypeds.com/addbot)`)
                .addField(`๐ฟ|Meus Comandos`, `*Para acessar as abas basta reagir de acordo com o que procura!*`)
                .addField(`<:pasta:786293846156771379>|CATEGORIAS:`, `
                \๐**|Info**
                \โ๏ธ**|Utiliรกrios**
                \๐ง**|Staff**
                \๐**|Diversรฃo**
                \๐**|Diversรฃo2**
                \๐ ๏ธ**|Config**
                \โฉ๏ธ|*Voltar*`)
                .setImage(`https://i.imgur.com/HpI5ppM.png`)
                msg.edit(backembed)
                msg.reactions.resolve('โฉ๏ธ').users.remove(message.author.id)
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
  .addField(`๐|Add Me`, `[Click Here](https://www.hypeds.com/addbot)`)
  .addField(`๐ง|Staff`, `\`${prefix}warn\` <user> - Warn a User!
  \`${prefix}mute\` <user> <time> <reason> - Mute a User
  \`${prefix}ban\` <user> <reason> - Ban a User
  \`${prefix}embed\` <message> - Create a embed message
  \`${prefix}setprefix\` <prefix> - Sets a Prefix for your server`)
  .addField(`๐|Info`, `\`${prefix}avatar\` <user> - Gets an user Avatar
  \`${prefix}botinfo\` - Gets Bot Info
  \`${prefix}serverinfo\` - Gets serverinfo
  \`${prefix}userinfo\` - Gets userinfo
  \`${prefix}weather\` <city> - Gets your weather`)
  .addField(`๐|Fun`, `\`${prefix}say\` <message> - Make i say something
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