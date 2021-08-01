const Discord = require('discord.js');
const ms = require("parse-ms");//2.1.0

module.exports.run = async (client, message, args, prefix, color, config) => {
  const embd = new Discord.MessageEmbed()
  .setTitle(`<a:HYpositive:763111725510950932> | Comando: ${prefix}lembrete`)
  .setColor(color)
  .setDescription(`<a:HYseta1:756119648654852106> **Use**: ${prefix}lembrete <tempo> <mensagem>`)
  .addField(`👍 | Observação:`, `<a:HYseta1:756119648654852106> O tempo deve ser colocado em: numérico [s/m/h/d] 
  
  Exemplo: ${prefix}lembrete 20s lembrar de terminar o código do Hyped.`)
  .setFooter(`© HypedGroupCode`);

	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.channel.send(embd)
	if (!reminder) return message.channel.send(embd)

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Seconds
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Minutes
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Hours
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Days
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply(':x: | O tempo deve ser númerico [s/m/h/d]');
	}

	message.reply(`:thumbsup: | Eu vou lembrar você de \`${reminder}\` daqui \`${time}\``);

	setTimeout(function () {
		message.reply(`-> | <@${message.author.id}> Você me pediu para te lembrar de: \`${reminder}\` `);
	}, parseInt(timems));

};