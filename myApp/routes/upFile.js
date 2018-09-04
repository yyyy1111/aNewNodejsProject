var express = require('express');
var router = express.Router();
var fileService = require('../service/fileService');
    //创建服务器路由
    router.post('/head',(req,res,next)=>{
        // console.log(req.query.body);
        fileService.upFile(req,res);
    })
    module.exports = router;
