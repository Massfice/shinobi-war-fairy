const app = require('./src/app');
const botLoginService = require('./src/services/BotLoginService');

botLoginService.login().then((bot) => {
    botLoginService.setBot(bot);

    app.listen(3000);
});
