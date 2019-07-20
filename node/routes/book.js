var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  db.query('select * from book',function(err,rows){
    if(err){
      res.json({
        code:-1,
        msg:'查询失败'
      });
    }else{
      res.json({
        code:0,
        list:rows
      })
    }
  })
});

//新增
router.post('/add', function (req, res) {
  let name = req.body.bookName;
  let price = req.body.price;
  let desc = req.body.description;
  let author = req.body.author;
  if(!name){
    res.json({
      code:-1,
      msg:'书名不允许为空'
    });
    return
  }
  if(!price){
    res.json({
      code:-1,
      msg:'价格不允许为空'
    });
    return
  }
  //字符串类型的字段要在值前加''
  db.query("insert into book(book_name,price,description,author) values('" + name + "'," + price + ",'"+desc+"','"+author+"')", function (err, rows) {
      if (err) {
        console.log(err)
          res.json({
            code:-1,
            msg:'新增失败'
          });
      } else {
          res.json({
            code:0,
            msg:'成功'
          });
      }
  })
});

//ge你敢信
router.post('/update', function (req, res) {
  let name = req.body.bookName;
  let price = req.body.price;
  let desc = req.body.description;
  let author = req.body.author;
  let id = req.body.id;
  if(!name){
    res.json({
      code:-1,
      msg:'书名不允许为空'
    });
    return
  }
  if(!price){
    res.json({
      code:-1,
      msg:'价格不允许为空'
    });
    return
  }
  //字符串类型的字段要在值前加''
  db.query("update book set book.book_name='"+name+"', book.price="+price+", book.author='"+author+"', book.description='"+desc+"' where book.id = "+id+"", 
  function (err, rows) {
      if (err) {
        console.log(err)
          res.json({
            code:-1,
            msg:'更新失败'
          });
      } else {
          res.json({
            code:0,
            msg:'成功'
          });
      }
  })
});

module.exports = router;
