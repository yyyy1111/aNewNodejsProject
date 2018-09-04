var express = require('express');
var router = express.Router();
var userService = require('../service/userService.js');
var upload = require('multer')({dest:'./public/images/'});

//接收从客户端传来的数据
//注册查询路由方法
router.get('/findUser',(req,res,next)=>{
    // console.log(0000000);
    userService.findUser(req,res);
})
//配置ajax路由--------注册操作路由方法配置
router.post('/reg',(req,res,next)=>{
    console.log(111);
    userService.register(req,res);
})
//用户登录-------登录操作路由
router.post('/login',(req,res,next)=>{
    userService.login(req,res);
})
//文章发布操作路由
router.post('/post',(req,res,next)=>{
    userService.userEdit(req,res);
})
//用户信息图片上传接口
router.post('/info',upload.single('xxx'),(req,res,next)=>{
    userService.imgFilePost(req,res);
})
//文章列表渲染接口
router.post('/textList',(req,res,next)=>{
    userService.textListFind(req,res);
})
// 文章详情渲染接口
router.post('/articleDetail',(req,res,next)=>{
    userService.articleDetailFind(req,res);
})
module.exports = router;