// Instance of MySQL
var mysql = require('mysql')

// Creates a 'connection pool' 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_mummeram',
    password        : '8272',
    database        : 'cs340_mummeram'
})

// Export
module.exports.pool = pool;
