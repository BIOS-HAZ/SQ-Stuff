//node index.js -> Starts the bot

const Discord = require('discord.js');
const console = new Discord.Client();

const token = '';
console.login(token);

//console.on('ready', () => {
   // console.log('This bot is online!');
//})

console.on('message', (receivedMessage) => {
  if (receivedMessage.author == console.user) { // Prevent bot from responding to its own messages
      return
  }
  
  if (receivedMessage.content.startsWith("!")) {
      processCommand(receivedMessage)
  }
})

function botLog(message) {
    var fileurl = "https://cdn.battlemetrics.com/b/standardVertical/3544720.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300"
    console.log('message', message => {
      if(msg.content === '!server'){
        const embed = new RichEmbed()
          .setTitle("Squad Server Stats")
          .setDescription("this is the thing description")
          .attachFile(fileurl);
    }
  });
}

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

  botLog("Command received: " + primaryCommand)
  botLog("Arguments: " + arguments) // There may not be any arguments

  switch (primaryCommand) {
  case 'help':
      helpCommand(arguments, receivedMessage)
  case 'multiply':
      multiplyCommand(arguments, receivedMessage)
  case 'hello': //Hello command
      receivedMessage.channel.send("Hello Friend! Here are the commands.")
  default:
      receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
  }
}

function helpCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
      receivedMessage.channel.send("It looks like you might need help with " + arguments)
  } else {
      receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
  }
}

function multiplyCommand(arguments, receivedMessage) {
  if (arguments.length < 2) {
      receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
      return
  }
  let product = 1 
  arguments.forEach((value) => {
      product = product * parseFloat(value)
  })
  receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}
