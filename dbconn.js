// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'hyundai-db-instance.cwzsmkxmwszt.us-east-1.rds.amazonaws.com',
    port: "3306",
    user     : 'mani',
    password : 'smilingmani',
    database : 'service',
    debug    :  false
});    
module.exports = pool;