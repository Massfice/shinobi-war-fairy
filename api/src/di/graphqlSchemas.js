const arguments = ['%graphql'];
const method = 'create';

module.exports = {
    services: {
        'graphql.schema.prod': {
            factory: {
                class:
                    '../graphql/schemas/ProdSchemaFactory',
                method
            },
            arguments
        },

        'graphql.schema.dev': {
            factory: {
                class:
                    '../graphql/schemas/DevSchemaFactory',
                method
            },
            arguments
        }
    }
};
