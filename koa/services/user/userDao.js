/**
 * Created by kevin on 16/9/6.
 */
let Mysql = require('../../config/db/my')

module.exports = {
    getinfo: function *() {
        let req = this.request.body;
        let uid = req.uid;
        if (!uid) {
            return this.body = {
                code: -1,
                msg: 'do not have uid'
            }
        }
        console.log('has uid!');
        let sql = 'SELECT u.id as uid,u.email,u.nickname as username,p.truename as real_name,u.schoolId as school_id,u.id as student_id FROM user u inner join user_profile p on u.id=p.id where u.id=' + uid;
        var d1;

        var data = yield Mysql.ecp.query(sql).catch(function (err) {
            return this.body = {
                code: -1,
                msg: err
            }
        });

        console.log('here 1', data);
        d1 = data[0];
        d1.admin_type = 0;
        d1.openapi = true;
        this.body = {
            code: 1,
            msg: '获取信息成功',
            data: d1
        }
        // Mysql.ecp.query(sql).then(function(data) {
        //     console.log('here 1',data);
        //     // d1 = data[0];
        //     // d1.admin_type = 0;
        //     // d1.openapi = true;
        //
        // }).catch(function(err) {
        //     console.log(err)
        //     return this.body = {
        //         code: -1,
        //         msg: err
        //     }
        // })
    }
}