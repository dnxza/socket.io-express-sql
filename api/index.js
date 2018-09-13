const configServer = require('../config').configServer;
const slog = configServer.console.express;

var express = require('express')
var router = express.Router()

var mydb = require('../db/mydb');
var msdb = require('../db/msdb');

var users = require('./users');

// เริ่มที่ /api/...
router.get('/user', function (req, res) {
    res.json(users.findAll());
});

router.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

// ทดสอบ database
router.get('/testmy', function (req, res) {
    mydb.query("SELECT * FROM information_schema.SCHEMATA", function (err, content) {
        if (err) {
            if (slog) console.error(err);
            res.status(500).send('Something broke!')
        } else {
            res.json(content);
        }
    });
});

router.get('/testms', function (req, res) {
    msdb.query("SELECT 'Test' AS TEXT", function (err, content) {
        if (err) {
            if (slog) console.error(err);
            res.status(500).send('Something broke!')
        } else {
            res.json(content);
        }
    });
});

module.exports = router