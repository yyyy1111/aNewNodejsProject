var express = require('express');
var router = express.Router();
var userService = require('../service/userService.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//访问用户主页
router.get('/home',function(req,res,next){
  userService.homePage(req,res);
})
//进入注册页
router.get('/register',function(req, res, next){
  userService.regPage(req,res);
})
//进入登录页
router.get('/login',function(req, res, next){
  userService.loginPage(req,res);
})
//进入用户信息页
router.get('/data',function(req, res, next){
  userService.userDataPage(req,res);
})
//访问文章发布页面
router.get('/edit',function(req, res, next){
  userService.userEditPage(req, res);
})
// 访问文章详情页面
router.get('/articleDetail',function(req,res,next){
  userService.articleDetail(req, res);
})
// 访问post页面
router.get('/post',function(req, res){
  userService.postEdit(req, res);
})

module.exports = router;
