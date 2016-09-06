/**
 * Created by kevin on 16/9/6.
 */
var mysql = require('mysql');
var conn;
var wrapper = require('co-mysql');

var os = require('os');
var wrapperedConn;

function handleError () {

    var ipv4;

    if(os.networkInterfaces().eth1){
        for(var i=0;i<os.networkInterfaces().eth1.length;i++){
            if(os.networkInterfaces().eth1[i].family=='IPv4'){
                ipv4=os.networkInterfaces().eth1[i].address;
            }
        }
        var hostname = os.hostname();
        //console.log(hostname,ipv4);
        if(ipv4 == '0,0,sadfjalksj'){
            conn = mysql.createConnection({

            });
            console.log('informal');
        }
    }else if(os.networkInterfaces().lo0){
        for(var i=0;i<os.networkInterfaces().lo0.length;i++){
            if(os.networkInterfaces().lo0[i].family=='IPv4'){
                ipv4=os.networkInterfaces().lo0[i].address;
            }
        }
        if(ipv4 == '127.0.0.1'){
            conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'ecp',
                port: 3306
                //,
                //multipleStatements: true
            });
            console.log('localhost');
        }
    }

    //连接错误，2秒重试
    conn.connect(function (err) {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    conn.on('error', function (err) {
        console.log('db error', err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleError();
        }
        if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
            handleError();
        } else {
            handleError();
        }
    });

    setInterval(function(){
        conn.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            if (err) throw err;

            console.log('The solution is: ', rows[0].solution);
        });
    },3600000);
    console.log('mysql ready!');

    wrapperedConn = wrapper(conn);
}
handleError();



var Mysql = {
    conn:wrapperedConn
};
module.exports = Mysql;