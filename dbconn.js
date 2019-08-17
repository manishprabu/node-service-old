// Load module
var mysql = require('mysql');
// Initialize pool
var pool      =    mysql.createPool({
    connectionLimit : 10,
    host     : 'cloud-db-instance.ckyvnvfapxi1.us-east-1.rds.amazonaws.com',
    port: "3306",
    user     : 'admin',
    password : 'admin1234',
    database : 'service',
    debug    :  false
});    
module.exports = pool;