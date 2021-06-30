const Discord = require('discord.js');

module.exports.verify = async(client, msg) =>
{
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
    };
}