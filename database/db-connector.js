// Instance of MySQL
var mysql = require('mysql')

// Creates a 'connection pool' 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_vriezej',
    password        : '2925',
    database        : 'cs340_vriezej'
})

// Export
module.exports.pool = pool;
