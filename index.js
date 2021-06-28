const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if(msg.content != "!verify" && msg.channel.id == "858932336602906645") {
    msg.delete()
  }

  if (msg.content === '!verify' && msg.channel.id == "858932336602906645") {
    if(msg.member.roles.cache.has("500680513128759316") == false) {
      console.log(msg.member.roles)
      msg.member.roles.add("500680513128759316")
      msg.react("✅")
    }
    else {
      msg.react("❌")
    }
  }
});

client.login(config.token);
