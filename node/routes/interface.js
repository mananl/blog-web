var express = require('express');
var router = express.Router();
var db = require('./db');
//引入multer模块  
var multer = require('multer');
var pathLib = require('path');
const fs = require('fs');

//设置上传的目录，  
var upload = multer({ dest: pathLib.join(__dirname, 'temp') }).single('file');

//上传单文件
router.post('/upload', upload, function (req, res, next) {
  console.log(req.file);

  var newName = req.file.path + pathLib.parse(req.file.originalname).ext;
  fs.rename(req.file.path, newName, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({
        code: 0,
        url: req.file.path + pathLib.extname(req.file.originalname)
      })
    }
  });


  // let extname = path.extname(req.file.originalname);
  // req.file.filename = req.file.filename + extname
  // req.file.path = req.file.path +extname
  // console.log(req.body);  
  // res.end("上传成功");  

});

//获取分类列表
router.get('/typelist', function (req, res, next) {
  db.query('select * from type', function (err, rows) {
    if (err) {
      res.json({
        code: -1,
        msg: '查询失败'
      });
    } else {
      res.json({
        code: 0,
        list: rows
      })
    }
  })
});

//获取详情
router.get('/getDetail', function (req, res, next) {
  let id = req.query.id || ''
  db.query('select a.*,b.name from basic as a,type as b where a.id = '+id+' and a.typeid = b.id', function (err, rows) {
    if (err) {
      res.json({
        code: -1,
        msg: '查询失败'
      });
    } else {
      res.json({
        code: 0,
        data: rows[0]
      })
    }
  })
});


/* GET  listing. */
router.get('/list', function (req, res, next) {
  // var param = req.query||{};
  console.log(req)
  var pageNum = parseInt(req.query.pageNum || 1);// 页码
  var pageSize = parseInt(req.query.pageSize || 10);
  var end = pageSize * pageNum; // 默认页数
  var start = (pageNum - 1) * pageSize;
  var id = req.query.typeid;
  var sql = id ? 'SELECT a.*,b.name from basic as a , type as b WHERE a.typeid = b.id and a.typeid = '+id+' order by updatetime desc limit ' + start + ', ' + pageSize + ''
  :'SELECT a.*,b.name from basic as a , type as b WHERE a.typeid = b.id  order by updatetime desc limit ' + start + ', ' + pageSize + '';
  db.query('SELECT count(*) as sum  from basic ', function (err, count) {
    if (err) {
      res.json({
        code: -1,
        msg: '查询失败'
      });
    } else {
      db.query(sql, function (err, rows) {
        if (err) {
          res.json({
            code: -1,
            msg: '查询失败'
          });
        } else {
          res.json({
            code: 0,
            list: rows,
            total: count[0].sum
          })
        }
      })
    }

  })

});

/**
 * 获取所有链接类型的文章
 */
router.get('/linkList', function (req, res, next) {

  db.query('SELECT *  from basic where typeid = 4', function (err, rows) {
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

//新增
router.post('/add', function (req, res) {
  let title = req.body.title;
  let content = req.body.content;
  let typeid = req.body.typeid;
  let createtime = new Date().getTime();
  let updatetime = new Date().getTime();
  if (!title) {
    res.json({
      code: -1,
      msg: '标题不允许为空'
    });
    return
  }
  if (!content) {
    res.json({
      code: -1,
      msg: '内容不允许为空'
    });
    return
  }
  //字符串类型的字段要在值前加''
  db.query("insert into basic(title,`content`,typeid,createtime,updatetime) values('" + title + "','" + content + "','" + typeid + "','" + createtime + "','" + updatetime + "')", function (err, rows) {
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

//更新
router.post('/update', function (req, res) {
  let title = req.body.title;
  let typeid = req.body.typeid;
  let content = req.body.content;
  let id = req.body.id;
  if (!title) {
    res.json({
      code: -1,
      msg: '标题不允许为空'
    });
    return
  }
  if (!content) {
    res.json({
      code: -1,
      msg: '内容不允许为空'
    });
    return
  }
  //字符串类型的字段要在值前加''
  db.query("update basic set title='" + title + "', content='" + content + "', typeid=" + typeid + " where id = " + id + "",
    function (err, rows) {
      if (err) {
        console.log(err)
        res.json({
          code: -1,
          msg: '更新失败'
        });
      } else {
        res.json({
          code: 0,
          msg: '成功'
        });
      }
    })
});

module.exports = router;
