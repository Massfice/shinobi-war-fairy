const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const {
    StatusCodes
} = require('http-status-codes');
const bodyParser = require('body-parser');
const { DiscordAPIError } = require('discord.js');
const {
    validationResult
} = require('express-validator');

const sanitizePath = require('./middleware/sanitizePath');

const botLoginService = require('./services/BotLoginService');
const DirectMessageService = require('./services/DirectMessageService');

const validator = require('./validator');

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(sanitizePath);

app.post('/dm', validator, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res
            .send(errors)
            .status(StatusCodes.BAD_REQUEST);
    }

    const { userId, message } = req.body;

    const bot = botLoginService.getBot();

    const directMessageService = new DirectMessageService(
        bot
    );

    try {
        await directMessageService.send(
            userId,
            message
        );

        return res.sendStatus(
            StatusCodes.CREATED
        );
    } catch (err) {
        if (
            err instanceof DiscordAPIError &&
            err.httpStatus === 404
        ) {
            return res.sendStatus(
                StatusCodes.NOT_FOUND
            );
        }

        return res.sendStatus(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
});

module.exports = app;
