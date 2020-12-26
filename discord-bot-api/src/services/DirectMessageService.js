class DirectMessageService {
    constructor(bot) {
        this.bot = bot;
    }

    async send(userId, message) {
        const user = await this.bot.users.fetch(
            userId
        );

        return user.send(message);
    }
}

module.exports = DirectMessageService;
