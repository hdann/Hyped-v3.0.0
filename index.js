//Variaveis de Packages
const Discord = require('discord.js');
const fs = require('fs');
const Canvas = require('discord-canvas');
const db = require('quick.db');
const express = require('express');
const DBL = require('dblapi.js');
const moment = require('moment');

//Variaveis de Arquivos
const config = require('./config.json');

const TOKEN = process.env.TOKEN
const DBLTOKEN = process.env.DBL
const PORT = process.env.PORT

//Variaveis
const client = new Discord.Client();
const botconfig = config;
const app = express();
moment()

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

//Disbut
require('discord-buttons')(client);

//Discord bot List
const dbl = new DBL(DBLTOKEN, client);

dbl.on('posted', () => {
  console.log('✅| Contagem enviada!')
})

dbl.on('error', e => {
  console.log(`❌| ${e}`)
})

//Conferidor de comandos!
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("❌| Não achei nenhum comando!");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`-> ${f} carregado!`);
    client.commands.set(props.help, props);

  });

});

client.on('message', async (message) => {
    //set prefix
    let prefixes = JSON.parse(fs.readFileSync("./database/prefixes.json", "utf8"));
    if (message.channel.type == 'dm') return;
    if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefix: config.defaultPrefix
     }
    }
    let prefix = prefixes[message.guild.id].prefix;

    //Multi Color
    let colors = JSON.parse(fs.readFileSync("./database/colors.json", "utf8"));
    if (!colors[message.guild.id]) {
    colors[message.guild.id] = {
      color: config.defaultColor
      }
    }
    let color = colors[message.guild.id].color;

    //Sistema de Commando e leitura de msg com prefixo!
     if (message.channel.type == 'dm') return;
     if (message.author.bot) return;

     //Resposta a Ping
     if (message.content.startsWith("@everyone")) message.react('<:ping:798182774292086824>')
     if (message.content.startsWith("@here")) message.react('<:ping:798182774292086824>')

     //respondendo a menção
     if (message.content.startsWith(`<@!${client.user.id}>`||`@${client.username}`)) {
     message.channel.send(`Olá, tudo bem? Quer Saber Mais Sobre Mim?  Use \`${prefix}help\` e veja meus comandos!`)
     }
     if (!message.content.toLowerCase().startsWith(prefix)) return;

     //✅》Mensagem de Erro
    const embederror = new Discord.MessageEmbed()
    .setTitle(":x: | Erro! ")
    .setDescription("-> Não Achei Esse Comando!")
    .setTimestamp()
    .setColor('RED')
    .setFooter("© HypedGroupCode");
  

    const args = message.content
        .trim().slice(prefix.length)
        .split(/ +/g);
    let command = args.shift().toLowerCase();
    //aliases cmds
    if(command === "warn") command = "aviso"
    if(command === "warns") command = "avisos"
    if(command === "rwarns") command = "clearwarns"
    if(command === "e") command = "eval"
    if(command === "ajuda") command = "help"
    if(command === "limpar") command = "clear"
    if(command === "bal") command = "atm"
    if(command === "weather") command = "tempo"
    if(command === "profile") command = "perfil"
    if(command === "send") command = "chat"
    if(command === "pontos") command = "points"
    if(command === "xp") command = "points"

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args, prefix, color, config);
        console.log(`${message.guild.name}: ${message.author.tag} Usou ${command} no #${message.channel.name}`)
    } catch (err) {
    console.error('❌| Erro:' + err);
    message.channel.send(embederror)
  }
});

//Registrando slash comands
client.on('ready', () => {
  let prefix = config.defaultPrefix

  console.log('✅| Slash Comands Funcionando')

  client.api.applications(client.user.id).commands.post({
    data: {
      name: "help",
      description: "Envia Meus Comandos"

    }

  });

  client.ws.on('INTERACTION_CREATE', async interaction => {
    const cmdS = interaction.data.name.toLowerCase();
    const argss = interaction.data.options;

    if(cmdS == 'help') {
      const helpembed = new Discord.MessageEmbed()
      .setTitle(`Bem vindo ao menu de ajuda!`)
      .setColor("RANDOM")
      .addField(`🔗|Me Adicione!`, `[Click Here](https://hypeds.com/adicionar)`)
      .addField(`🔧|Staff`, `\`${prefix}warn\` <user> - Avisa um usuário!
      \`${prefix}mute\` <user> <time> <reason> - Muta um usuário
      \`${prefix}ban\` <user> <reason> - Bane um usuário
      \`${prefix}embed\` <message> - Cria uma mensagem em embed
      \`${prefix}setprefix\` <prefix> - Define um prefixo no seu servidor`)
      .addField(`🔍|Info`, `\`${prefix}avatar\` <user> - Pega o avatar de um usuário
      \`${prefix}botinfo\` - Obtém as informações do bot
      \`${prefix}serverinfo\` - Obtém as informações do servidor
      \`${prefix}userinfo\` <user> - Obtém as informações de um usuário
      \`${prefix}weather\` <city> - Obtém as informações do clima da sua cidade`)
      .addField(`😆|Fun`, `\`${prefix}say\` <message> - Faz eu falar algo
      \`${prefix}bigtext\` <message> - Faz a sua mensagem grande
      \`${prefix}fakemsg\` <user> <message> - Faz uma mensagem fake
      \`${prefix}lenny\` - Aquela carinha 
      \`${prefix}morse\` <message> - Envia a sua mensagem em morse
      \`${prefix}howgay\` <user> - Vê o quão GAY é você
      \`${prefix}bolso\` <message>  - Faz o bolsonaro falar algo`)
      .setFooter(`Para ver todos os meus comandos digite ${prefix}help`);

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, helpembed)
        }
      })
      
    }

    if(cmdS == 'embed') {
      const descriptions = argss.find(arg => arg.name.toLowerCase() == "conteúdo").value;

      const cmdembeds = new Discord.MessageEmbed()
      .setDescription(descriptions)
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(`Publicado por: ${interaction.member.user.username}`);

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: await createAPIMessage(interaction, cmdembeds)
        }
      })
 
    }

  })

});

async function createAPIMessage(interaction, content) {
  const apiMessage = await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id), content)
  .resolveData()
  .resolveFiles();

  return { ...apiMessage.data, files: apiMessage.files };
}

//✅》Sistema de logs

//Mensagem Atualizada
client.on('messageUpdate', async (oldMessage, newMessage) => {
  let channelID = db.get(`${oldMessage.guild.id}_channeldemsg`)
  if (!channelID) return
  let channel = oldMessage.guild.channels.cache.get(channelID)
  if (!channel) return

  const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(":white_check_mark: | Sistema de Logs")
.setDescription(`**Mensagem atualizada**

**Onde Foi**:${oldMessage.channel} 

**Autor Da Mensagem**: ${oldMessage.author}

**Mensagem Antiga**:  \`\`\`${oldMessage.content}\`\`\`
**Nova Mensagem**:  \`\`\` ${newMessage.content}\`\`\`  `)

if (oldMessage.author.bot) return;

  
  channel.send(embed);  
  
})

//Mensagem apagada
client.on('messageDelete', async (message) => {

  let channelID = db.get(`${message.guild.id}_channeldemsg`)
  if (!channelID) return
  let channel = message.guild.channels.cache.get(channelID)
  if (!channel) return

if (message.author.bot) return;
let messageapagada = new Discord.MessageEmbed()
.setColor(`RANDOM`) 
.setTitle(`:white_check_mark: | Sistema de Logs`)
.setDescription(`**Mensagem apagada!**

**Autor Da Mensagem**: ${message.author}

**Onde Foi**: <#${message.channel.id}> 

**A Mensagem**: \`\`\` ${message.content}\`\`\`  `)


channel.send(messageapagada);
});

//Level-System
client.on('message', (message) => {
  if(message.author.bot) return; 
  
  db.add(`${message.guild.id}_${message.author.id}_points`, 1)
  db.add(`${message.author.id}_points`, 1)
})

//✅》Welcome
client.on('guildMemberAdd', (member, guild) => {
  let welcomec = db.get(`${member.guild.id}_welcomecanal`)
  if(!welcomec) return;
  let channelw = member.guild.channels.cache.get(welcomec)
  if(!channelw) return;

  const welcomeembed = new Discord.MessageEmbed()
  .setTitle(`🚪 | Bem Vindo a **${member.guild.name}**`)
  .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setDescription(`Seja Bem Vindo <@${member.id}>! Divirta-se! \n \n Agora temos ${member.guild.members.cache.size} membros nesse servidor!`)
  .setColor("RANDOM")
  channelw.send(welcomeembed)
})

//goodbye
client.on('guildMemberRemove', (member, guild) => {
  let welcomeca = db.get(`${member.guild.id}_welcomecanal`)
  if(!welcomeca) return;
  let channelwl = member.guild.channels.cache.get(welcomeca)
  if(!channelwl) return;

  const awelcomeembed = new Discord.MessageEmbed()
  .setTitle(`🚪 | Tchau `)
  .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setDescription(`Adeus <@${member.id}>!  \n \n Agora temos ${member.guild.members.cache.size} membros nesse servidor!`)
  .setColor("RANDOM")
  channelwl.send(awelcomeembed)
})


//✅》ATIVIDADE DO BOT!
client.on("ready", () => {
  let activities = [
      `Utilize ${config.defaultPrefix}help`,
      `${client.guilds.cache.size} servidores!`,
      `${client.channels.cache.size} canais!`,
      `Paz No Discord`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        //type: "WATCHING",
        type: "STREAMING", url: "https://twitch.tv/diogo06221"
      }), 1200 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("✅| Minhas atividades estão Online!")
});

client.on("ready", () => {
  let activities = [
      `Utilize ${config.defaultPrefix}ajuda para obter ajuda`,
      `${client.guilds.cache.size} servidores!`,
      `Entre No Meu Website! Https://hypedbot.net/hypedbot`,
      `${client.channels.cache.size} canais!`,
      `Me veja no TOP.GG!`,
      `${client.users.cache.size} usuários!`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING",
      }), 1000 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("✅| Minhas Segundas atividades estão Online!")
});


//Invite Blocker
client.on("message", async message => {
  const regex =  /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
  
  let inviteblockid = db.get(`${message.guild.id}_inviteblock`)

  if(!inviteblockid) return;
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {  
        if (regex.exec(message.content)) {
           await message.channel.send(
              `${message.author} **Você não pode postar link de outros servidores!**`
           )
           await message.delete(regex);
           console.log('Mensagem Limpa!')
        }
    } 
})


//Msg de Boas Vindas
client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("734227709445799989");
  let channel = await client.channels.cache.get("756098421584035861");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sairam De Um Servidor!");
   } else {
      const image = await new Canvas.Welcome()
      .setUsername(`${member.user.username}`)
      .setMemberCount(`${member.guild.memberCount}`)
      .setGuildName("H Y P E D|classic")
      .setAvatar(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://imgur.com/ddz6Rz5.png")
      .toAttachment();
 
      const canvasembed = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

    channel.send(canvasembed);
  }
});

client.on("guildMemberAdd", async (member) => { 

  let guild = await client.guilds.cache.get("817408279474733116");
  let channel = await client.channels.cache.get("817408280417533991");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sairam De Um Servidor!");
   } else {
      const image3 = await new Canvas.Welcome()
      .setUsername(`${member.user.username}`)
      .setMemberCount(`${member.guild.memberCount}`)
      .setGuildName("H Y P E D")
      .setAvatar(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
      .setColor("border", "#2220ff")
      .setColor("username-box", "#2220ff")
      .setColor("discriminator-box", "#2220ff")
      .setColor("message-box", "#2220ff")
      .setColor("title", "#2220ff")
      .setColor("avatar", "#2220ff")
      .setBackground("https://imgur.com/pipbJkR.png")
      .toAttachment();
 
      const canvasembed = new Discord.MessageAttachment(image3.toBuffer(), "welcome-image.png");

    channel.send(canvasembed);
  }
});

//msg de goodbye
client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("734227709445799989");
  let channel = await client.channels.cache.get("756098421584035861");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sairam De Um Servidor!");
   } else {
      const image2 = await new Canvas.Goodbye()
      .setUsername(`${member.user.username}`)
      .setMemberCount(`${member.guild.memberCount}`)
      .setGuildName("H Y P E D|classic")
      .setAvatar(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://imgur.com/ddz6Rz5.png")
      .toAttachment();
 
      const canvasembed = new Discord.MessageAttachment(image2.toBuffer(), "welcome-image.png");

    channel.send(canvasembed);
  }
});

client.on("guildMemberRemove", async (member) => { 

  let guild = await client.guilds.cache.get("817408279474733116");
  let channel = await client.channels.cache.get("817408280417533991");
  let emoji = await member.guild.emojis.cache.find(emoji => emoji.name === "");
  if (guild != member.guild) {
    return console.log("Sairam De Um Servidor!");
   } else {
      const image4 = await new Canvas.Goodbye()
      .setUsername(`${member.user.username}`)
      .setMemberCount(`${member.guild.memberCount}`)
      .setGuildName("H Y P E D")
      .setAvatar(member.user.displayAvatarURL({ dynamic: true, format: "png", size: 512 }))
      .setColor("border", "#8015EA")
      .setColor("username-box", "#8015EA")
      .setColor("discriminator-box", "#8015EA")
      .setColor("message-box", "#8015EA")
      .setColor("title", "#8015EA")
      .setColor("avatar", "#8015EA")
      .setBackground("https://imgur.com/pipbJkR.png")
      .toAttachment();
 
      const canvasembed = new Discord.MessageAttachment(image4.toBuffer(), "welcome-image.png");

    channel.send(canvasembed);
  }
});

//Console Físico
client.on("ready", () => {
  /*
  var content = "Está tudo Ok";
  var channel = client.guilds.cache.get("777870393137430589").channels.cache.get("777870601243197451");
  setInterval(function() {
    channel.send(content); 
  }, 100 * 60 * 60 * 1); 
  channel.send(content);
  */
  console.log("✅| Está tudo OK");
})

//Porta express
app.get("/", (request, response) => {
  const ping = new Date();
  response.send(`<html><head><style>
    body {
        background-color: #2C2F33;
        font-family: 'Roboto', sans-serif;
    }

    .outer-container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #23272A;
        box-shadow: 0px 0px 10px #1B1E21;
        border-radius: 50px;
        width: 45%;
    }

    .plasma {
        color: #ffffff;
        font-size: 70px;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }

    .ends {
        color: #ffffff;
        font-size: 35px;
        margin: 0;
        text-align: center;
    }

    .date {
        color: #99AAB5;
        font-size: 25px;
        margin: 0;
        padding-bottom: 50px;
        text-align: center;
    }

    .logo {
        max-width: 100%;
        height: auto;
        width: auto\9;
        margin: 0;
    }
</style>

<link href="https://fonts.googleapis.com/css2?family=Roboto&amp;display=swap" rel="stylesheet">
<link rel="shortcut icon" type="image/x-icon" href="https://static.wixstatic.com/media/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/a926b2_cfc2b507c19546d88a6a2231b832b022%7Emv2.png">

<title>Status Do Hyped</title>

</head><body><div class="outer-container" wfd-id="0">
    <div class="container" wfd-id="1">
        <img src="https://botlist.hypedbot.net/img/logo.png" class="logo">
        <p class="plasma">Status Do Hyped</p>
        <p class="ends" id="ends">Status Da Host: Online</p>
        <p class="date" id="date">Status Do Site: Online</p>
    </div>
</div>
</body></html>`)
  ping.setHours(ping.getHours() -3 );
  console.log(`⚠️ | Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
})
app.listen(PORT)


//Código de ! Diogo06🐾#1135 Não Disturbe
client.login(TOKEN);