const Discord = require('discord.js');
const Caxinha = require('caxinha');

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}qrcode`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}qrcode <mensagem>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> `)
  .setFooter(`© HypedGroupCode`);

  let random = '';
  let dict = '1234567890'
  for(var i = 0; i < 4; i++){
    random = random + dict.charAt(Math.floor(Math.random() * dict.length));
  }

  let text = args[0]
  if(!text) message.channel.send(embd)

  let image = await Caxinha.canvas.createQrCode(text)

  let attachment = new Discord.MessageAttachment(image, `qrcode${random}.png`)

  await message.channel.send(attachment);
}