const arguments = [
    '%express',
    '%body-parser',
    '%cors',
    '%express-graphql'
];

module.exports = {
    services: {
        'entrypoints.prod': {
            class: '../entrypoints/Entrypoint',
            arguments: [
                ...arguments,
                false,
                '@graphql.schema.prod'
            ]
        },
        'entrypoints.dev': {
            class: '../entrypoints/Entrypoint',
            arguments: [
                ...arguments,
                true,
                '@graphql.schema.dev'
            ]
        }
    }
};
