// port ที่ใช้เชื่อมต่อ
// console แสดง log ใน console

exports.configServer = {
    port: 3000,
    console: {
        express: false,
        socketio: false,
        database: false
    },
    mssql: {
        server: 'localhost',
        userName: 'sa',
        password: '',
        database: 'master',
    },
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    }
}