const configServer = require('../config').configServer;
const slog = configServer.console.database;
const config = configServer.mysql;

var mysql = require('mysql')
var db = mysql.createPool(config);

module.exports = db;
module.exports.query = function (sql, callback) {
    db.getConnection(function (err, conn) {
        if (err) {
            if (slog) console.error(err);
            callback(err, null);
        } else {
            if (slog) console.log("[MySQL][QUERY]", sql);
            conn.query(sql, function (error, results, fields) {
                if (error) {
                    if (slog) console.error(err);
                    callback(err, null);
                }
                callback(null, results);
                results = [];
                conn.release();
                if (error) throw error;
            });
        }
    });

};
