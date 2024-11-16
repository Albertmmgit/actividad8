const mysql = require('mysql2')
require('dotenv').config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
    database: 'Blog'
});

module.exports = pool.promise()