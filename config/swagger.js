const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Node-TDD',
            version: '1.0.0',
            description: 'Node REST API with TDD',
        },
        host: 'localhost:3000',
        basePath: '/'
    },
    apis: ['./api/*/index.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};