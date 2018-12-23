mysql    = require('mysql');

var connection = mysql.createConnection({
    host     : 'catalog-api-master.cani708p659e.us-east-2.rds.amazonaws.com',
    user     : 'root',
    port     : 3306,
    password : 'mani8126',
    database : 'service',
    acquireTimeout: 1000000
  });
  try {
      connection.connect();
      module.exports = connection;
      
  } catch(e) {
      console.log('Database Connetion failed:' + e);
  }