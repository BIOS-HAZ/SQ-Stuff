//node BIOS_DiscordBot.js -> Starts the bot
const Discord = require('./node_modules/discord.js');
const botserver = new Discord.Client();

const token = '';
botserver.login(token);

botserver.on('ready', () => {
    console.log('This bot is online!');
})

botserver.on('message', (receivedMessage) => {
  if (receivedMessage.author == botserver.user) { // Prevent bot from responding to its own messages
      return
  }
  
  if (receivedMessage.content.startsWith("!")) {
      processCommand(receivedMessage)
  }
})

function processCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

  console.log("Command received: " + primaryCommand)
  console.log("Arguments: " + arguments) // There may not be any arguments

  switch (primaryCommand) {
  case 'help':
      helpCommand(arguments, receivedMessage)
      break
  case 'multiply':
      multiplyCommand(arguments, receivedMessage)
      break
  case 'hello': //Hello command
    finduser(arguments, receivedMessage)
      receivedMessage.channel.send("Hello Friend! Here are the commands. !server1 | !server2 | !multiply")
      break
  case 'server1': // test command
    testNewCommand(arguments, receivedMessage)
    //finduser(arguments, receivedMessage)
    break
    case 'server2': // test command
    test2NewCommand(arguments, receivedMessage)
    //finduser(arguments, receivedMessage)
    break
  default:
      receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
  }
}

function testNewCommand(arguments, receivedMessage) {
    var fileurl = "https://cdn.battlemetrics.com/b/standardVertical/3544720.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300"
    console.log(`Testing Embeded: ${receivedMessage}`);
    receivedMessage.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: botserver.user.username,
                icon_url: botserver.user.avatarURL
            },
            title: "Fear and Terror Server Status",
            url: fileurl,
            image:{url:"https://cdn.battlemetrics.com/b/standardVertical/3544720.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300"},
            //description: "This is a test embed to showcase what they look like and what they can do.",
            fields: [{
                name: "Fear and Terror Server #1",
                value: "Comp server:"
            },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: botserver.user.avatarURL,
                text: "© FaT"
            }
        }

        
  });
}

// 2nd Command
function test2NewCommand(arguments, receivedMessage) {
    var fileurl = "https://cdn.battlemetrics.com/b/standardVertical/3544720.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300"
    console.log(`Testing Embeded: ${receivedMessage}`);
    receivedMessage.channel.send({
        embed: {
            color: 3447003,
            author: {
                name: botserver.user.username,
                icon_url: botserver.user.avatarURL
            },
            title: "Fear and Terror Server #2 Status",
            url: fileurl,
            image:{url:"https://cdn.battlemetrics.com/b/IFnCrBZIP/2953884.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300"},
            //description: "This is a test embed to showcase what they look like and what they can do.",
            fields: [{
                name: "Fear and Terror Server #1",
                value: "INV/RAAS server:"
            },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: botserver.user.avatarURL,
                text: "© FaT"
            }
        }      
  });
  //receivedMessage.channel.send("https://cdn.battlemetrics.com/b/IFnCrBZIP/2953884.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300");

}


function helpCommand(arguments, receivedMessage) {
  if (arguments.length > 0) {
      receivedMessage.channel.send("It looks like you might need help with " + arguments)
  } else {
      receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]` or !server1 or !server2")
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

function finduser(arguments, receivedMessage) {
    let user = botserver.users.find(user => user.id == receivedMessage.author.id);
    if (user) {
        receivedMessage.channel.send(`Found ${user.username}!`)
    } else {
        receivedMessage.channel.send(`Did not find anyone by that ID.`)
    }
}
