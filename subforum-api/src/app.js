const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const {
    StatusCodes
} = require('http-status-codes');
const { parse } = require('himalaya');

const sanitizePath = require('./middleware/sanitizePath');
const ExtractPostsService = require('./services/ExtractPostsService');

const app = express();
const extractPostsService = new ExtractPostsService();

app.use(helmet());
app.use(cors());
app.use(sanitizePath);

app.get('/:forumId', async (req, res) => {
    const { page = 1 } = req.query;

    try {
        const { data: html } = await axios.get(
            `http://shinobi-war.kylos.pl/viewforum.php?f=${
                req.params.forumId
            }&start=${(page - 1) * 25}`,
            {
                headers: {
                    Accept:
                        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
                }
            }
        );

        const parsedHtml = parse(html);

        const posts = extractPostsService.extractPosts(
            parsedHtml
        );

        return res.send(posts);
    } catch (err) {
        console.error(err);

        return res.sendStatus(
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
});

module.exports = app;
