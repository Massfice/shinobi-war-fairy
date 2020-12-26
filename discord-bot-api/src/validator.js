const { body } = require('express-validator');

module.exports = [
    body('userId')
        .trim()
        .notEmpty()
        .withMessage('User Id cannot be empty.'),

    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message cannot be empty.')
];
