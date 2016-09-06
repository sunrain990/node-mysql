/**
 * Created by kevin on 16/9/5.
 */
var Mysql = require('./config/mysql')

//增
// Mysql.conn.query('insert into user values(0,"wangsanpao", "ws", null)', function(err, res) {
//     if(!err) {
//         var parsedRES = JSON.stringify(res[0])
//         console.log(parsedRES)
//     }else {
//         console.log(err);
//     }
// });

var msg = {
    name: 'yoyo',
    password: 'heheda'
}
Mysql.conn.query('insert into user set ?', msg, function(err, res) {
    if(!err) {
        console.log(res)
    } else{
        console.log(err);
    }
})



//删
// Mysql.conn.query('delete from user where id =0', function(err, res) {
//     if(!err) {
//         console.log(res)
//     } else{
//         console.log(err);
//     }
// })


//查
// Mysql.conn.query('select * from node_mysql.user', function(err, res) {
//     if(!err) {
//         console.log(Object.getOwnPropertyNames(res[0]));
//
//         var parsedRES = JSON.stringify(res[0])
//         console.log(parsedRES)
//     }else {
//         console.log(err);
//     }
// });

//改
// function Filtermsg(msg){
//     var tmpstr="";
//     for(var i in msg){
//         if(msg[i] == undefined){
//             continue;
//         }else if(i == 'id'){
//             continue;
//         }else if(i.indexOf('time')>-1){
//             msg[i] = moment(msg[i]).format('YYYY-MM-DD HH:mm:ss');
//         }else if(i.indexOf('$$')>-1){
//             continue;
//         }
//         console.log(i,msg[i]);
//         tmpstr += " `"+i+"`="+"'"+msg[i]+"'"+" ,"
//     }
//     //去and
//     var remtmpstr = tmpstr.slice(0,-1);
//     return remtmpstr;
// }
// var msg = {
//     name: 'name',
//     password: 'password'
// }
//
// var updateSQL = 'update user set ' + Filtermsg(msg) + 'where id = 1';
//
// Mysql.conn.query(updateSQL, function(err,res){
//     if(!err){
//         console.log(res);
//     }else{
//         console.log(err);
//     }
// })