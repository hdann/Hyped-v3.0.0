const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embedhelp = new Discord.MessageEmbed()
  .setTitle("🔧| Createrole")
  .setDescription(`<a:HYpositive:763111725510950932> | Como usar: 
  
  ${prefix}createrole <nome> <permissões> <cor>(opcional)`)
  .addField("👍| Observação:",  `Permissões disponíveis: \n \`ADMINISTRATOR\` = **Adiministrador** \n \`BAN_MEMBERS\` = **Moderador** \n \`MANAGE_GUILD\` = **Server Manager**`)
  .setImage("https://cdn.discordapp.com/attachments/777870495390892033/882052292252168262/unknown.png")
  .setColor(color)
  .setTimestamp()
  .setFooter("© HypedGroupCode");
  if(!message.member.hasPermission(config.permission.adm)) return message.reply(':x: | Nop! Você não pode usar isso!');

  if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  if(!args[0,1]) return message.channel.send(embedhelp)

  let nome = args[0]
  let permission = args[1]
  let cor = args[2]

  if(!cor) cor = color 

  message.guild.roles.create({
    data: {
      name: `${nome}`,
      color: `${cor}`,
      permissions: `${permission}`
    },
    reason: `Comando: createrole, usuário: ${message.author.tag}`
  })

  message.channel.send(`Cargo criado: ${nome}`)
}
