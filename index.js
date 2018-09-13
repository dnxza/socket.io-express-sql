const express = require("express");
const app = express();
var server = require('http').Server(app);
const configServer = require('./config').configServer;
const slog = configServer.console.express;

// Socket.io ไฟล์ socketio.js
var socketio = require('./socketio');
socketio(server);

if (slog) {
    app.use(function (req, res, next) {
        console.log("[EXPRESS][" + req.method + "]", req.path);
        next()
    })
}

// router path
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// router api ไฟล์ api/index.js
var apis = require('./api/index');
app.use('/api', apis)

// static file
app.use(express.static("public"));

// ** jQuery 3 & Bootstrap 3 **
app.use('/jquery', express.static('node_modules/jquery/dist'))
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))

// ** AdminLTE 2 **
app.use('/admin-lte', express.static('node_modules/admin-lte/dist'))
app.use('/admin-lte/plugins', express.static('node_modules/admin-lte/plugins'))
app.use('/admin-lte/bower_components', express.static('node_modules/admin-lte/bower_components'))

// || ตัวอย่าง AdminLTE 2 [comment ถ้าไม่ใช้] -->
app.get('/admin-lte', function (req, res) { res.sendFile(__dirname + '/node_modules/admin-lte/index.html'); });
app.get('/admin-lte/index.html', function (req, res) { res.sendFile(__dirname + '/node_modules/admin-lte/index.html'); });
app.get('/admin-lte/index2.html', function (req, res) { res.sendFile(__dirname + '/node_modules/admin-lte/index2.html'); });
app.use('/admin-lte/dist', express.static('node_modules/admin-lte/dist'))
app.use('/admin-lte/bower_components', express.static('node_modules/admin-lte/bower_components'))
app.use('/admin-lte/pages', express.static('node_modules/admin-lte/pages'))
// <-- ตัวอย่าง AdminLTE 2 [comment ถ้าไม่ใช้] ||

app.get('*', function (req, res) { res.status(404).sendFile(__dirname + '/public/404.html'); });

server.listen(configServer.port);
console.log("[HTTP] Server listen at Port", configServer.port);