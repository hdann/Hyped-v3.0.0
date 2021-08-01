const Discord = require('discord.js');
const os = require('os'); //Para Obter Informações do Servidor Que Hospeda o Bot

module.exports.run = async (client, message, args, prefix, color, config) => {
  //Uptime
  let totalSecondsp = client.uptime / 1000;
  let daysp = Math.floor(totalSecondsp / 86400);
  let hoursp = Math.floor(totalSecondsp / 3600);
  totalSecondsp %= 3600;
  let minutesp = Math.floor(totalSecondsp / 60);
  let secondsp = totalSecondsp % 60;

  let uptime = `${daysp.toFixed()} dias  ${hoursp.toFixed()} horas ${minutesp.toFixed()} minutos ${secondsp.toFixed()} segundos.`

  //Informações do Servidor Que Hospeda o Bot
  let cpu = Math.round(process.cpuUsage().system / 1024 / 1024).toString()
  if(cpu < 1) {
      cpu = (process.cpuUsage().system / 1024 / 1024).toFixed(2)
  }
  let ram = Math.round(process.memoryUsage().rss / 1024 / 1024).toString()
  let modelo = os.cpus().map((i) => `${i.model}`)[0]

  const inline = true

  const embed = new Discord.MessageEmbed()
  .setColor(color)
  .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setAuthor('🤖| Informações Sobre Mim 🙂')
  .setDescription(config.client.description)
  .addField('> **<a:HYbaiacu:756119666971377756>| Versão do Bot**:', `Neste Servidor, a Versão rodando é a: **${config.client.version}**`)
  .addField('> **🔧| Meu Prefixo**', `**${prefix}**`, inline)
  .addField('<:HYdev:756119645215260753>| Meu Criador', `${config.owner.nickname}`, inline)
  .addField('> **📌| Meu nick**', `${config.client.nickname}`)
  .addField('> **📎| Meu ID**', config.client.id, inline)
  .addField('**🌎| Servidores**', `${client.guilds.cache.size}`, true)
  .addField('**👫| Usuários**', `${client.users.cache.size}`, inline)
  .addField('> 🖥️| Host', `https://repl.it`)
  .addField(`> %| Uso da cpu:`, `${cpu}%`, true)
  .addField(`<:HYram:756119655948484650>| Uso da ram`, `${ram}MB`, true)
  .addField(`> <:HYxeon:756119645379100692>| Modelo da cpu`, `${modelo}`)
  .addField('> **👾| Status da Host**',`[Clique Aqui!](${config.statusURL})`,inline,true)
  .addField('> **🗓️| Estou online a**', `**${uptime}**`)
  .addField('> **📊| Fui Criado em**', `*16/09/2020, às 11:00:47*`)
  .addField('> **🖥️| Meu Site**', `[Clique Aqui!](${config.websiteURL})`)
  .addField('> **📌| Vote Em Mim!**', `[Clique Aqui!](https://hypeds.com/vote)`)
  .addField('<a:HYbaiacu:756119666971377756> | Atualize algumas informações:', '**Clique em ↩**')
  .setFooter(`2021 © H Y P E D.`)
  .setTimestamp()
  message.channel.send(embed).then(msg => {
    msg.react('↩')
  })
}