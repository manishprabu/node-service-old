mysql    = require('mysql');

var connection = mysql.createConnection({
    host     : 'hyundai-db-instance.cwzsmkxmwszt.us-east-1.rds.amazonaws.com',
    user     : 'mani',
    port     : 3306,
    password : 'smilingmani',
    database : 'service',
    // host     : 'localhost',
    // user     : 'root',
    // port     : 3306,
    // password : 'mani8126',
    // database : 'service',
    // acquireTimeout: 1000000
  });
  try {
      connection.connect();
      module.exports = connection;
      
  } catch(e) {
      console.log('Database Connetion failed:' + e);
  }