//client, message, args
module.exports.run = async (client, message, args, prefix, color, config) => {
    let channel;
    const userPermission =
      message.member.hasPermission("ADMINISTRATOR") ||
      message.member.hasPermission("MANAGE_GUILD");

    try {
      channel = await client.channels.fetch(args[0]);
    } catch {
      channel = message.mentions.channels.first() || message.channel;
    }

    if(!message.guild.me.permissions.has(config.permission.adm)) {
    return message.reply(`:x: | Eu não tenho a permissão: ${config.permission.adm}`)
  }

    if (!userPermission)
      return message.reply(`:x: | Apenas pessoas com a permissão: ${config.permission.manager} podem usar esse comando!`);

    channel
      .updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true })
      .then(() =>
        message.reply(
          `**🔓 | Este canal foi aberto! Agora todos podem enviar mensagens! Caso queira trancar este canal de novo basta digitar \`${prefix}lock\`**`
        )
      )
      .catch((err) => console.error("Erro ao destravar o canal: \n", err));
};