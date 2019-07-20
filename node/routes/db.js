// 连接MySQL
let mysql = require('mysql');
let pool = mysql.createPool({
    host: '39.97.162.134',
    user: 'root',
    password: '123456',
    database: 'blog'
});

let query = ((sql,callback)=>{
    pool.getConnection((err,connection)=>{
        connection.query(sql,(err,rows)=>{
            callback(err,rows)
            connection.release();
        })
    })
})
exports.query = query;