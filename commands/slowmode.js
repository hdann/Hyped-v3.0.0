module.exports.run = async (client, message, args, prefix, color, config) => {

    const permission =
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.hasPermission("ADMINISTRATOR");
    const botPermission = message.guild.me.hasPermission("MANAGE_CHANNELS");
    const time = parseInt(args.shift()) || 0;

    if (!permission)
      return message.reply(
        "**❌| Nop! Você não pode usar isso!**"
      );

    if (!botPermission)
      return message.reply(
        "**❌|Preciso da permissão de `Gerenciar Canais`!**"
      );

    if (time == 0) {
      await message.channel.setRateLimitPerUser(time);
      return message.reply("**O modo lento foi desativado!!**");
    }

    await message.channel.setRateLimitPerUser(time);
    return message.reply(
      `**O modo lento foi ativo, o intervalo é de ${time} segundos**!!` + ` __Digite *${prefix}slowmode 0* para desativar!__`
    );
};