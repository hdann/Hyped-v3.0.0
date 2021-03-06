const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async (client, message, args, prefix, color, config) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(':x: | Nop! Você não pode usar isso!');

  let user = message.mentions.users.first();
  if(!user) return message.reply(':x: | Mencione um usuário!')

  if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

  const rawTime = args[1];
  const time = ms(rawtime);

  if(!time) return message.reply('❌|Você não especificou um tempo!');

  const reason = args.splice(2).join(' ');
  if(!reason) return message.reply('❌|Você precisa dar um motivo!');

  const channel = client.guilds.cache.get("777870393137430589").channels.cache.get("782791748942299167");

  const log = new Discord.MessageEmbed()
  .setTitle('User Muted')
  .addField('User:', user, true)
  .addField('By:', message.author, true)
  .addField('Expires:', rawTime)
  .addField('Reason:', reason)
  channel.send(log);

  const embed2 = new Discord.MessageEmbed()
  .setTitle('Usuário Mutado!')
  .setColor('RED')
  .addField('Tempo:', rawTime, true)
  .addField('Motivo:', reason, true)
  message.channel.send(embed2);

  const embed = new Discord.MessageEmbed()
  .setTitle('Você esta mutado!')
  .setColor('RED')
  .addField('Tempo:', rawTime, true)
  .addField('Motivo:', reason, true);

  try {
    user.send(embed);
  } catch(err) {
    console.log(err);
  }

  if(!message.guild.roles.cache.find(o => o.name === "Muted")) message.guild.roles.create({
    data: {
      name: 'Muted',
      color: 'RANDOM',
      permissions: 'VIEW_CHANNEL',
    },
    reason: 'Usuário Mutado!'
  })

  const role = message.guild.roles.cache.find(r => r.name === 'Muted');

  await member.roles.add(role)

  setTimeout(async() => {
    member.roles.remove(role);
  }, time);
}