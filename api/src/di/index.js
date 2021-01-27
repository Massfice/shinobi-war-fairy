const {
    JsFileLoader,
    ContainerBuilder
} = require('node-dependency-injection');
const path = require('path');

const container = new ContainerBuilder();
const loader = new JsFileLoader(container);

loader.load(
    path.join(__dirname, 'graphqlSchemas.js')
);

loader.load(
    path.join(__dirname, 'entrypoints.js')
);

module.exports = container;
