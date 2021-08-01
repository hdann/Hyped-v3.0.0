const Discord = require('discord.js');
const beautify = require('beautify');
const token = process.env.TOKEN

module.exports.run = async (client, message, args, prefix, color, config) => {
  if (message.author.id !== config.owner.id) {
    return message.channel.send(":x:|**Apenas o Meu Dono Pode Rodar Este Comando**").then(m => m.delete(5000))
  }

  if(!args[0]) {
    message.channel.send(":x:| Krl Diogo, Escreve um Bagulho ae Prr!").then(m => m.delete(5000))
  }

  try {
    if (args.join(" ").toLowerCase().includes("token")) {
      return;
    }
    const toEval = args.join(" ");
    const evaluated = eval(toEval);

    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTimestamp()
    .setTitle("<:HYdev:756119645215260753> | Comando de Eval")
    .addField("> Comando Pedido:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
    .addField("> Resultado:", evaluated)
    message.channel.send(embed);

  } catch (err) {
   let embed2 = new Discord.MessageEmbed()
   .setColor("RED")
   .setTitle("`❌ | Erro!`")
   .setDescription(err)
   .setTimestamp();

   message.channel.send(embed2)

  }
}