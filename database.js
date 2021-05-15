const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
    host: env.host,
    user: env.user,
    port: env.port,
    password: env.password,
    database: env.database
});

module.exports = {
    pool: pool
};