const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, color, config) => {

  const embederrorkick = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}Kick`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}Kick <@member> <reason>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> Nenhuma`);

  if(!message.member.hasPermission("BAN_MEMBERS")) {
    return message.reply("❌ | Nop! Vc não pode usar isso!")
  }

  if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
    return message.reply("❌ | Não Tenho Permissão!")
  }

  let membro = message.mentions.members.first()
  if(!membro) return message.reply(embederrorkick)

  if(membro.user.id === message.author.id) {
    return message.reply("❌ | Porque Quer Se Kickar?")
  }

  if(membro.user.id === client.user.id) {
    return message.reply("❌ | Porque Quer Me Kickar?")
  }

  if(!membro.bannable) {
    return message.reply("❌ | Não posso Kickar Este Usuário!")
  }

  if(membro.permissions.has("ADMINISTRATOR")) {
    return message.reply("❌ |Eu não posso Kickar este membro!")
  }

  let motivo = args.slice(1).join(" ")
  if(!motivo) motivo = "Não Definido"

  const embedban = new Discord.MessageEmbed()
  .setTitle("<:HYbanido:822151905593393164>| Alguém foi Expulso!")
  .setColor("#ff2848")
  .addField("🙋| Membro", membro.user.tag, false)
  .addField("🔧| Moderador", message.author.tag, false)
  .addField("📰| Motivo", motivo, false)
  message.channel.send(embed)
  membro.kick({reason: motivo})

}