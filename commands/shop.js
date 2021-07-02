const Discord = require('discord.js');
const db = require('../db/db.js')

module.exports.shop = async(client, msg) =>
{
    if(msg.content.startsWith("!shop"))
    {
        message = msg.content.split(" ")
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
        let balance = 1
        if(message.length == 1)
        {
            const embed = new Discord.MessageEmbed()
            .setTitle("💰 Магазин за время")
            .setDescription("```✔️ 1.VIP Silver - 1 день\n✔️ 2.VIP Gold - 1 день\n✔️ 3.VIP Admin - 1 день\n\n🔴 Как купить?\n🟢 !shop item server```")
            .setTimestamp(Date.now())
            .setFooter(`Выполнил ${msg.author.username}#${msg.author.discriminator}`)
            msg.channel.send(embed)
            return;
        }
        if(message.length == 3) {
            db.con.changeUser({
                database: "discord_bot"
            })
            db.con.query(`SELECT balance FROM users WHERE discord_id = ${msg.author.id}`, (err, result) =>{
                if(err) return;
                if(result) balance = result[0]['balance']
            })
            switch(message[1])
            {
                case 1:
                    if(balance == 1) 
                    {
                        message.channel.send("123")
                    }
            }
            console.log(balance)
        }
        if(message.length > 3)
        {
            const incorrect = new Discord.MessageEmbed()
            .setTitle("❌ Ошибка ❌")
            .setDescription("```🔴 Неправильно введена команда.\n🟢 !shop - список товаров\n🟢 !shop item server - покупка привилегии\n🟢 Например !shop 2 4```")
            .setTimestamp(Date.now())
            .setFooter(`Выполнил ${msg.author.username}#${msg.author.discriminator}`)
            msg.channel.send(incorrect)
            return;
        }
        
        console.log(message.length)
    }
}