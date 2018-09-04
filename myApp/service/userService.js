var crypto = require('crypto');
var db = require("../db/dbConnect.js");
var event = require("../events/events.js");
var jm = require("../func/crypto.js").md5;
var path = require('path');
var fs = require('fs');
var upload = require('multer')({
    dest: './public/images/'
});
var userService = {
    //访问用户主页
    homePage: (req, res) => {
        res.render('user', {
            page: 'home'
        })
    },
    //文章列表查询
    textListFind:(req,res) => {
        //删除所有事件监听
        event.removeAllListeners();
        //取出客户端数据对象
        // 客户端数据对象只有在具体条件搜索才需要取出来直接查询整个列表不需要取出来
        // var cDataObj = req.body;
        //发送给客户端的数据对象
        var dataObj = {};
        //触发数据库连接失败
        event.once('DB_CONNECT_ERROR',data =>{
            dataObj.code = -1;
            dataObj.txt = '数据库连接失败！';
            res.json(dataObj);
        })
        //触发数据库信息查询失败
        event.once('DB_TEXTS_FIND_ERROR', data => {
            dataObj.code = -2;
            dataObj.txt = '数据库信息查询失败!';
            res.json(dataObj);
        })
        // 触发数据库信息查询成功
        event.once('DB_TEXTS_FIND_SUCCESS', data => {
            // console.log('这是注册查询方法！！！')
            // console.log(data);
            if(data.length != 0){
                dataObj.code = 2;
                dataObj.txt = '文章列表查询成功!';
                dataObj.success= data;
            }else{
                dataObj.code = 0;
                dataObj.txt = '目前暂无文章发表!';
                dataObj.success= '';
            }
            res.json(dataObj);
        })
        db.textListFind();
    },
    //访问文章详情页面
    articleDetail:(req,res) =>{
        res.render('user', {
            page: 'articleDetail'
        })
    },
    //文章详情查询
    articleDetailFind:(req,res)=>{
        // 删除所有监听
        event.removeAllListeners();
        var articleId = req.body.articleId;
        // 发送给客户端的数据对象
        var theDataObj={};
        //触发数据库连接失败事件
        event.once('DB_CONNECT_ERROR',data=>{
            theDataObj.code = -1;
            theDataObj.txt = '数据库连接失败！';
            res.json(theDataObj);
        })
        //触发文章详情查询失败
        event.once('DB_TEXTS_FIND_ERROR',data=>{
            theDataObj.code = -2;
            theDataObj.txt = '文章详情查询失败!';
            res.json(theDataObj);
        })
        //触发文章详情查询成功 
        event.once('DB_TEXTS_FIND_SUCCESS',data =>{
            console.log(data);
            if (data.length != 0) {
                theDataObj.code = 1;
                theDataObj.txt = '文章查询成功';
                theDataObj.success=data;
            } else {
                theDataObj.code = -3;
                theDataObj.txt = '该文章不存在';
                theDataObj.success='';
            }
            // console.log(data);
            res.json(theDataObj);
        })
        // console.log(req);
        db.textDetailFind(articleId);
        
    },
    //访问文章编辑页面
    userEditPage: (req, res) => {
        res.render('user', {
            page: 'edit'
        })
    },
    //发布文章操作
    userEdit: (req, res) => {
        // 删除所有的监听
        event.removeAllListeners();
        //时间格式化方法
        function timeFormat(ts){
            var date = new Date(ts); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() + ' ';
            h = date.getHours() + ':';
            m = date.getMinutes() + ':';
            s = date.getSeconds();
            return Y + M + D + h + m + s;
        };
        //取出客户端数据对象
        var dObj = req.body;
        //给客户端数据对象添加发布时间字段
        var timeStamp = new Date().getTime(),
            //时间戳格式化
            postTime = timeFormat(timeStamp);
            dObj.postTime=postTime;
            // console.log(this);
        //取出客户端数据对象
        var dataObj = {};
        //数据库连接失败
        event.once('DB_CONNECT_ERROR', data => {
            dataObj.code = -1;
            dataObj.txt = '数据库连接失败！';
            res.json(dataObj);
        })
        //数据库信息插入失败
        event.once('DB_TEXTSINFO_INSERT_ERROR', data => {
            dataObj.code = -3;
            dataObj.txt = '数据库插入信息失败';
            res.json(dataObj);
        })
        //数据插入成功
        event.once('DB_TEXTS_INSERT_SUCCESS', data => {
            dataObj.code = 2;
            dataObj.txt = '文章发布成功';
            res.json(dataObj);
        })
        //数据库信息插入
        db.textInsert(dObj);
    },
    //访问注册页面
    regPage: (req, res) => {
        res.render('user', {
            page: 'register'
        })
    },
    //注册验证查询
    findUser: (req, res) => {
        //删除所有的监听
        // console.log(1111);
        event.removeAllListeners();
        var username = req.query.username;
        //发送给客户端的数据对象
        var dataObj = {};
        //触发数据库连接失败事件
        event.once('DB_CONNECT_ERROR', data => {
            dataObj.code = -1;
            dataObj.txt = '数据库连接失败！';
            res.json(dataObj);
        })
        //触发数据库信息查询失败
        event.once('DB_USERS_FIND_ERROR', data => {
            dataObj.code = -2;
            dataObj.txt = '数据库信息查询失败!';
            res.json(dataObj);
        })
        //触发数据库信息查询成功
        event.once('DB_USERS_FIND_SUCCESS', data => {
            // console.log('这是注册查询方法！！！')
            // console.log(data);
            if (data.length != 0) {
                dataObj.code = 1;
                dataObj.txt = '用户名已存在';
            } else {
                dataObj.code = 0;
                dataObj.txt = '用户名可用';
            }
            res.json(dataObj);
        })
        db.find(username);
    },
    //注册入库操作
    register: (req, res) => {
        // alert(2);
        console.log(2222);
        //删除所有的监听
        event.removeAllListeners();
        //取出客户端数据对象
        var dObj = req.body;
        //对密码加密
        dObj.password = jm(dObj.password);
        //发送给客户端的数据对象
        var dataObj = {};
        //数据库连接失败
        event.once('DB_CONNECT_ERROR', data => {
            dataObj.code = -1;
            dataObj.txt = '数据库连接失败！';
            res.json(dataObj);
        })
        //数据库信息插入失败
        event.once('DB_USERS_INSERT_ERROR', data => {
            dataObj.code = -3;
            dataObj.txt = '数据库插入信息失败';
            res.json(dataObj);
        })
        //注册成功
        event.once('DB_USERS_INSERT_SUCCESS', data => {
            dataObj.code = 2;
            dataObj.txt = '注册成功';
            res.json(dataObj);
        })
        //数据库信息插入再次查询
        event.once('DB_USERS_FIND_SUCCESS', data => {
            if (data.length != 0) {
                dataObj.code = 1;
                dataObj.txt = '用户名已存在!'
                res.json(dataObj);
            } else {
                dataObj.code = 0;
                dataObj.txt = '用户名可用!'
                db.insert(dObj);
            }
        })
        //数据库信息插入成功
        db.find(dObj.username);
    },
    //访问登录页面
    loginPage: (req, res) => {
        res.render('user', {
            page: 'login'
        })

    },
    //登录操作方法
    login: (req, res) => {
        //删除所有的监听
        event.removeAllListeners();
        var dObj = req.body;
        //发送给客户端的数据对象
        var dataObj = {};
        event.once('DB_CONNECT_ERROR', data => {
            dataObj.code = -1;
            dataObj.txt = '数据库连接失败';
            res.json(dataObj);
        })
        //数据库信息查询失败
        event.once('DB_USERS_FIND_ERROR', data => {
            dataObj.code = -2;
            dataObj.txt = '数据库信息查询失败';
            res.json(dataObj);
        })
        //数据库信息查询成功
        event.once('DB_USERS_FIND_SUCCESS', data => {
            dataObj.code = 0;
            dataObj.txt = '用户名或密码错误';
            var cpwd = jm(dObj.password);
            var pwd = null;
            if (data.length != 0) {
                pwd = data[0].password;
                if (pwd == cpwd) {
                    dataObj.code = 1;
                    dataObj.txt = '登录成功!';
                }
            }
            res.json(dataObj);
        })
        db.find(dObj.username);
    },
    //访问用户信息页面
    userDataPage: (req, res) => {
        event.removeAllListeners();
        var username = req.query.username;
        console.log(username);
        var dataObj = {};
        //数据库连接失败
        event.once('DB_CONNECT_ERROR', data => {
            dataObj.code = -1;
            dataObj.txt = "数据库连接失败";
            res.json(dataObj);
        })
        //数据库信息查询失败
        event.once('DB_USERS_FIND_ERROR', data => {
            dataObj.code = -2;
            dataObj.txt = "数据库信息查询失败";
            res.json(dataObj);
        })
        //数据库信息查询成功
        event.once('DB_USERS_FIND_SUCCESS', data => {
            // console.log(1111);
            // console.log(data);
            res.render('user', {
                page: 'userInfo',
                username: data[0].username,
                phone: data[0].phone
            })

        })
        db.find(username);
    },
    //图片上传操作处理
    imgFilePost: (req, res) => {
        var theObj = {};
        if (!req.file) {
            theObj.code = '-1';
            theObj.txt = '没有附带文件!';
            res.json(theObj);
            return;
        }
        //处理文件夹不存在的问题***************************************************

        // 输出文件信息
        console.log('====================================================');
        console.log('fieldname: ' + req.file.fieldname);
        console.log('originalname: ' + req.file.originalname);
        console.log('encoding: ' + req.file.encoding);
        console.log('mimetype: ' + req.file.mimetype);
        console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
        console.log('destination: ' + req.file.destination);
        console.log('filename: ' + req.file.filename);
        console.log('path: ' + req.file.path);

        // 重命名文件
        let oldPath = path.join('E:\\nodeItems\\myApp\\', req.file.path);
        let newPath = path.join('E:\\nodeItems\\myApp\\' + '/public/images/' + req.file.originalname);
        fs.rename(oldPath, newPath, (err) => {
            console.log(oldPath);
            if (err) {
                theObj.code = '0';
                theObj.txt = '保存出错';
                res.json(theObj);
                console.log(err);
            } else {
                theObj.code = '1';
                theObj.txt = '图片上传成功！';
                theObj.imgUrl = req.file.originalname;
                res.json(theObj);
            }
        });
    },
    //访问post页面
    postEdit:(req, res)=>{
        res.render('user', {
            page: 'post'
        })
    },
}
module.exports = userService;