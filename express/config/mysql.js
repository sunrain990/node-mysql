/**
 * Created by kevin on 16/9/5.
 */
//引用mysql库
var mysql = require('mysql')
//定义连接
var conn;

//调用系统服务
var os = require('os');

// 一般是采用开发,正式服务器
// process.env.NODE_DEBUG

//容错处理
function handleError() {
    //定义 ipv4变量
    // 好处: 是代码上传到不同服务器上不需要更改任何设置。通过服务器的ip判断该连哪个操作
    // 存在问题: 用户密码暴露了
    var ipv4;

    //如果存在网卡1...
    if(os.networkInterfaces().eth1){
        for(var i=0;i<os.networkInterfaces().eth1.length;i++){
            if(os.networkInterfaces().eth1[i].family=='IPv4'){
                ipv4=os.networkInterfaces().eth1[i].address;
            }
        }

        //如果ip等于123.456.789.000
        if(ipv4 == '123.456.789.000'){
            conn = mysql.createConnection({
                host: '123.456.789.000',
                user: 'root',
                password: 'root',
                database: 'aa',
                port: 3306
            });
            console.log('informal');
        }else if(ipv4 == '121.41.123.2'){
            conn = mysql.createConnection({
                host: 'rdsvy6jrfrbi2a2.mysql.rds.aliyuncs.com',
                user: 'ecp',
                password: 'CqmygDsx2s_MYSQL',
                database: 'questionnaire',
                port: 3306
            });
            console.log('formal');
        }
    }
    // 如果网卡有lo0(mac下面的网络回路),那么就查本地的mysql
    else if(os.networkInterfaces().lo0){
        for(var i=0;i<os.networkInterfaces().lo0.length;i++){
            if(os.networkInterfaces().lo0[i].family=='IPv4'){
                ipv4=os.networkInterfaces().lo0[i].address;
            }
        }
        // 如果ip等于127.0.0.1
        if(ipv4 == '127.0.0.1'){
            conn = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'node_mysql',
                port: 3306
                //,
                //multipleStatements: true
            });
            console.log('localhost');
        }
    }


    //连接错误，2秒重试
    conn.connect(function (err) {
        // 如果连接出错
        if (err) {
            // 处理出错信息
            console.log('error when connecting to db:', err);
            setTimeout(handleError , 2000);
        }
    });

    //这个连接捕获到'error'这个事件的时候,
    conn.on('error', function (err) {
        console.log('db error', err);
        logger.info(err);
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('connection_lost');
            handleError();
        }
        if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
            console.log(new Date()+'enqueue');
            handleError();
        } else {
            console.log('else');
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
}

//执行
handleError();

var Mysql = {
    conn: conn
}

module.exports = Mysql;