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

    if (!userPermission)
      return message.reply(`:x: | Apenas pessoas com a permissão: ${config.permission.manager} podem usar esse comando!`);

    channel
      .updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false })
      .then(() =>
        message.reply(
          `**🔒 | Este canal foi trancado! Agora ninguém pode enviar mensagens!! Caso queira destrancar este canal basta digitar \`${prefix}unlock\`**`
        )
      )
      .catch((err) => console.error("Erro ao travar o canal: \n", err));
};