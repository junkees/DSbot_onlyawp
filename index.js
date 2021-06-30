const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const db = require('./db/db.js')
const verify = require('./commands/verify')
const stats = require('./commands/stats')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

db.con.changeUser({
  database: "s1_lr"
});

client.on('message', msg => {
  verify.verify(client, msg)
  stats.stats(client, msg)
});

client.login(config.token);


/*
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
*/