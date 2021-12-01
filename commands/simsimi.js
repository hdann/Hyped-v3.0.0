const Discord = require('discord.js');
const request = require('https');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}simsimi`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}simsimi <Pergunta>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> O Simsimi é muito mal educado. Não se sinta ofendido por suas respostas!`)
  .setFooter(`© HypedGroupCode`);

  if(!message.guild.me.hasPermission(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  let argumentos = args.slice(0).join(" ")
  if(!argumentos) return message.lineReply(embd)

  //Webhook
  let image = (`https://imgur.com/4p2m765.png`)
  let webhook = await message.channel.createWebhook('Simsimi', {avatar: image})

  let apis = [
    `https://api-sv2.simsimi.net/v2/?text=${argumentos}&lc=pt&cf=false`,
    `https://api.simsimi.net/v2/?text=${argumentos}&lc=pt&cf=false`
  ]

  var svrandom = await apis[Math.floor(Math.random() * apis.length)]

  //`https://api.simsimi.net/v1/?text=${argumentos}&lang=pt&cf=true`

  request.get(svrandom, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', async () => {
      console.log(JSON.parse(data).success)
      await webhook.send(`<@${message.author.id}> | ` + JSON.parse(data).success)
      webhook.delete();
      //message.channel.send(`<@${message.author.id}> Simsimi:` + JSON.parse(data).success)
    });

  }).on("error", (err) => {
    console.log("Error:" + err.message);
  });

}

/*
request.get(`https://api.simsimi.net/v1/?text=${argumentos}&lang=pt&cf=false`).then(async (response) => {

    console.log(response.data.success)
    await webhook.send(`<@${message.author.id}> | ` + response.data.success)
    webhook.delete();

  }).catch(error => {
    console.log(error)
  })


request.get(`https://api.simsimi.net/v1/?text=${argumentos}&lang=pt&cf=false`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', async () => {
      console.log(JSON.parse(data).success)
      await webhook.send(`<@${message.author.id}> | ` + JSON.parse(data).success)
      webhook.delete();
    });

  }).on("error", (err) => {
    console.log("Error:" + err.message);
  });
*/