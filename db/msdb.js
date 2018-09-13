const configServer = require('../config').configServer;
const slog = configServer.console.database;
var config = configServer.mssql;
config.options = { encrypt: false };

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

function connection() {
    return new Promise((resolve, reject) => {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) return reject(err);
            resolve(connection);
        });
        connection.on('error', function (err) {
            if (err) return reject(err);
            resolve(connection);
        });
    });
};
module.exports = connection

module.exports.query = function (sql, callback) {
    var db = connection();
    db.then(function (conn) {
        var result = [];
        request = new Request(sql, function (err, rowCount) {
            if (err) {
                if (slog) console.error(err);
                callback(err, null);
            } else {
                if (slog) console.log("[MSSQL][QUERY]", sql);
                callback(null, result);
                result = [];
            }
        });

        request.on('row', function (columns) {
            var row = {};
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value
            });
            result[result.length] = row;
        });
        conn.execSql(request);
    }, function (err) {
        if (slog) console.error(err);
        callback(err, null);
    })
};