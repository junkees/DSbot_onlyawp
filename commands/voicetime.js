const { DH_CHECK_P_NOT_PRIME } = require('constants');
const Discord = require('discord.js');
const db = require('../db/db.js')

module.exports.voicetimecomm = async(client, msg) =>
{
    if(msg.content == "!voicetime") {
        db.con.changeUser({
            database: "discord_bot"
        })
        console.log(msg.author.id)
        db.con.query(`SELECT all_time FROM users WHERE discord_id = "${msg.author.id}"`, (err, result) => {
            if(err) return;
            msg.reply(`ваше время: ${parseInt(result[0]['all_time']/60)} минут(а)`)
        })
    }
}
module.exports.voicetime = async(oldState, newState) =>
{
    db.con.changeUser({
        database: "discord_bot"
    })

    db.con.query(`INSERT IGNORE INTO users (discord_id, start_time, all_time, balance) VALUES ('${newState.member.id}', UNIX_TIMESTAMP(), '0', '0')`, err => {
        if(err) return;
    })
    if(newState.bot) return;
    if(!oldState.channel && newState.channel)
    {
        db.con.query(`UPDATE users SET start_time=UNIX_TIMESTAMP() WHERE discord_id='${newState.member.id}'`, err => {
            if(err) return;
        })
    } else if(!newState.channel && oldState.channel) {
        db.con.query(`UPDATE users SET all_time=UNIX_TIMESTAMP()-start_time+all_time WHERE discord_id = ${oldState.member.id}`, err => {
            if(err) return;
        })
    }
}