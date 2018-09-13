const configServer = require('./config').configServer;
const slog = configServer.console.socketio;

var mydb = require('./db/mydb');
var msdb = require('./db/msdb');

// Socket.io
module.exports = function (server, callback) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {
        if (slog) console.log("[SOCKET]", socket.id, "connected");

        socket.emit('news', { hello: 'สวัสดี' });

        socket.on('getdata', function () {
            // var testdb = require('./api/testdb');
            mydb.query("SELECT * FROM information_schema.SCHEMATA", function (err, content) {
                if (err) {
                    if (slog) console.error("Got an error", err);
                } else {
                    if (slog) console.log("[SOCKET][EMIT] showdata");
                    socket.emit('showdata', content);
                }
            });
        });

        socket.on('disconnect', function () {
            if (slog) console.log("[SOCKET]", socket.id, "disconnected");
        });

    });
};