const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let gameState = {
  players: [],
  roles: {},
  phase: 'waiting',
};

client.once('ready', () => {
  console.log('Bot is online!');
});

client.on('messageCreate', message => {
  if (message.content === '!join') {
    if (!gameState.players.includes(message.author.id)) {
      gameState.players.push(message.author.id);
      message.channel.send(`${message.author.username} has joined the game!`);
    } else {
      message.channel.send('You are already in the game.');
    }
  }

  if (message.content === '!start' && gameState.phase === 'waiting') {
    if (gameState.players.length >= 3) {
      assignRoles();
      gameState.phase = 'night';
      message.channel.send('The game has started! It is now Night phase.');
    } else {
      message.channel.send('Not enough players to start the game.');
    }
  }

  if (message.content.startsWith('!vote') && gameState.phase === 'day') {
    const target = message.mentions.users.first();
    if (target) {
      message.channel.send(`${message.author.username} has voted to eliminate ${target.username}.`);
      // Handle voting logic
    } else {
      message.channel.send('Please mention a valid player to vote.');
    }
  }
});

function assignRoles() {
  const roles = ['Mafia', 'Villager', 'Doctor'];
  gameState.players.forEach((player, index) => {
    gameState.roles[player] = roles[index % roles.length];
    client.users.fetch(player).then(user => {
      user.send(`You have been assigned the role: ${gameState.roles[player]}`);
    });
  });
}

client.login('YOUR_DISCORD_BOT_TOKEN');