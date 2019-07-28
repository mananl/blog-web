var express = require('express');
var router = express.Router();
var db = require('./db');


//新增评论
router.post('/add', function (req, res) {
    let article_id = req.body.article_id;
    let content = req.body.content;
    let reply_id = req.body.reply_id;
    let reply_user_name = req.body.reply_user_name;
    let create_time = new Date().getTime();
    let comment_name = req.body.comment_name;
    if (!content) {
        res.json({
            code: -1,
            msg: '评论内容不能为空'
        });
        return
    }

    //字符串类型的字段要在值前加''
    db.query("insert into comment(article_id,`content`,reply_id,create_time,comment_name,reply_user_name) values('" + article_id + "','" + content + "','" + reply_id + "','" + create_time + "','" + comment_name + "','"+reply_user_name+"')", function (err, rows) {
        if (err) {
            console.log(err)
            res.json({
                code: -1,
                msg: '新增失败'
            });
        } else {
            res.json({
                code: 0,
                msg: '成功'
            });
        }
    })
});

//查询文章下的所有评论
router.get('/list', function (req, res, next) {
    var id = req.query.article_id || 1;
    db.query(`SELECT *  from comment where article_id = ${id}`, function (err, rows) {
        if (err) {
            res.json({
                code: -1,
                msg: '查询失败'
            });
        } else {
            res.json({
                code: 0,
                list: rows,
            })
        }

    })

});

module.exports = router;
