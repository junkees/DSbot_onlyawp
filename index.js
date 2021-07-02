const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const db = require('./db/db.js')
const verify = require('./commands/verify')
const stats = require('./commands/stats')
const voicetime = require('./commands/voicetime')
const shop = require('./commands/shop')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

db.con.changeUser({
  database: "s1_lr"
});

client.on('message', async (msg) => {
  verify.verify(client, msg)
  stats.stats(client, msg)
  voicetime.voicetimecomm(client, msg)
  shop.shop(client, msg)
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  voicetime.voicetime(oldState, newState)
});

client.login(config.token);
