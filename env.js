const dotenv = require('dotenv');
dotenv.config();

const enviroment = {
    production: {
        host: process.env.prod_host,
        user: process.env.prod_user,
        port: process.env.prod_port,
        password: process.env.prod_password,
        database: process.env.prod_database
    },
    test: {
        host: process.env.test_host,
        user: process.env.test_user,
        port: process.env.test_port,
        password: process.env.test_password,
        database: process.env.test_database
    }
};

const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = enviroment[nodeEnv];