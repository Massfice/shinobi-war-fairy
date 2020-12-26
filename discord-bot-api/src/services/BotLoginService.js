const Discord = require('discord.js');

const { botToken } = require('../config');

class BotLoginService {
    login() {
        const bot = new Discord.Client();

        bot.login(botToken);

        return new Promise((resolve) => {
            bot.on('ready', () => {
                console.info(
                    `Logged in as ${bot.user.tag}!`
                );

                resolve(bot);
            });
        });
    }

    setBot(bot) {
        this.bot = bot;
    }

    getBot() {
        return this.bot;
    }
}

const botLoginService = new BotLoginService();

module.exports = botLoginService;
