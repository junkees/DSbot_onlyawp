const Discord = require('discord.js');
const db = require('../db/db.js')

module.exports.stats = async(client, msg) =>
{
    if(msg.content.startsWith('!stats'))
    {
        message = msg.content.split(' ')
        if(message.length == 1 || message.length == 2 || message.length > 3 || message[2] > 8) {
            msg.reply("неправильно введена команда. Правильно: !stats STEAMID НОМЕРСЕРВЕРА")
            return;
        }
        let srvid = 1
        switch(message[2])
        {
            case "1":
                srvid = 1
                break;
            case "2":
                srvid = 9
                break;
            case "3":
                srvid = 8
                break;
            case "4":
                srvid = 7
                break;
            case "5":
                srvid = 5
                break;
            case "6":
                srvid = 4
                break;
            case "7":
                srvid = 10
                break;
            case "8":
                srvid = 6
                break;

        }
        if(!message[1].startsWith('STEAM_1')) {
            msg.reply("неправильно введен STEAMID. Например: STEAM_1:1:448627396. Помните, что STEAMID должен начинаться со STEAM_1.")
            return;
        }
        db.con.changeUser({
            database: `s${srvid}_lr`
        })
        db.con.query(`SELECT * FROM lvl_base WHERE steam = "${message[1]}"`, (err, result) =>{
            if(err) return;
            if(result[0] == undefined)
            {
                msg.reply("ничего не найдено. Помните, что STEAMID должен начинаться со STEAM_1. Попробуйте изменить вторую цифру, например STEAM_1:0:448627396 => STEAM_1:1:448627396")
                return;
            }
            //console.log(JSON.stringify(result[0]['id']))
            let playtime;
            playtime = parseFloat(JSON.stringify(result[0]['playtime']/60/60))
            const embed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle(`Статистика ${message[1]}`)
                .setTimestamp(Date.now())
                .setFooter(`Выполнил ${msg.author.username}#${msg.author.discriminator}`)
                .setDescription(`Очки: ${JSON.stringify(result[0]['value'])}\nНик: ${JSON.stringify(result[0]['name'])}\nУбийств: ${JSON.stringify(result[0]['kills'])}\nСмертей: ${JSON.stringify(result[0]['deaths'])}\nВыстрелов: ${JSON.stringify(result[0]['shoots'])}\nПопаданий: ${JSON.stringify(result[0]['hits'])}\nПопаданий в голову: ${JSON.stringify(result[0]['headshots'])}\nОнлайн: ${playtime.toFixed(2)} час(ов)\n`)
            msg.reply(embed)
        })
    }
}

// STEAM_0:0:448627396