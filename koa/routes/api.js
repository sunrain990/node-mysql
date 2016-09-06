/**
 * Created by kevin on 16/9/6.
 */
var router = require('koa-router')();
let Mysql = require('../config/my')

router.get('/', function *(next) {

    var sql = 'select * from node_mysql.user'
    var data = yield Mysql.conn.query(sql).catch(function(err){
        return this.body = {
            code: -1,
            msg: err
        }
    });

    this.body = data;
});


router.post('/', function *(next) {
    this.body = 'this a users response1111!';
});

module.exports = router;
