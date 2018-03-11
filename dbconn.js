mysql    = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'service'
  });
  try {
      connection.connect();
      module.exports = connection;
      
  } catch(e) {
      console.log('Database Connetion failed:' + e);
  }