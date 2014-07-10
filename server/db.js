var mysql = require('mysql');

var connection;

module.exports = function(callback) {
    var conn = mysql.createConnection(require('./config/db.json'));
    if (connection) return callback(null, connection);
    conn.connect(function(err){
        if (err) return callback(err);
        connection = conn;
        callback(null, connection);
    });
}
