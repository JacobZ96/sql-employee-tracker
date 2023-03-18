const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'JzCzBinx!122018!',
      database: 'employee_db'
    },
);

module.exports = db 