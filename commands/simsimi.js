const Discord = require('discord.js');
const request = require('https');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}simsimi`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}simsimi <Pergunta>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> O Simsimi é muito mal educado. Não se sinta ofendido por suas respostas!`)
  .setFooter(`© HypedGroupCode`);

  let argumentos = args.slice(0).join(" ")
  if(!argumentos) return message.channel.send(embd)

  //Webhook
  let image = (`https://imgur.com/4p2m765.png`)
  let webhook = await message.channel.createWebhook('Simsimi', {avatar: image})

  //`https://api.simsimi.net/v1/?text=${argumentos}&lang=pt&cf=true`

  request.get(`https://api.simsimi.net/v1/?text=${argumentos}&lang=pt&cf=false`, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', async () => {
      await webhook.send(`<@${message.author.id}>` + JSON.parse(data).success)
      webhook.delete();
    });

  }).on("error", (err) => {
    console.log("Error:" + err.message);
  }); 
}