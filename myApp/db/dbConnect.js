var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var event = require('../events/events.js');
const DB_COON_STR="mongodb://localhost:27017/users";
var dbDo={
    //用户注册数据库数据插入操作
    insert : data=>{
        mongo.connect(DB_COON_STR,(err,db)=>{
            if(err){
             //数据库连接错误事件
             event.emit("DB_CONNECT_ERROR",err)
            }else{
                var uc = db.collection('users');
                    uc.insert(data,(error,data2)=>{
                        if(err){
                            //数据库插入失败事件触发
                            event.emit('DB_USERS_INSERT_ERROR',error)
                        }else{
                            //触发数据插入成功
                            event.emit('DB_USERS_INSERT_SUCCESS',data2)
                            //关闭数据库
                            db.close();
                        }
                    })
               
            }
        })
    },
    //用户信息数据库查询操作
  find : username=>{
        mongo.connect(DB_COON_STR,(err,db)=>{
           if(err){
            //数据库连接错误事件
            event.emit("DB_CONNECT_ERROR",err)
           }else{
            //查询操作(mongodb的相关指令)
            var uc = db.collection('users');
            uc.find({username:username}).toArray((err,data)=>{
                if(err){
                    //触发查询失败
                    event.emit("DB_USERS_FIND_ERROR",err)
                }else{
                    //查询成功
                    event.emit("DB_USERS_FIND_SUCCESS",data)
                    
                }
            })
           }
        })
    },
    //用户文章发布数据库数据插入操作
    textInsert:data => {
        mongo.connect(DB_COON_STR,(err,db)=>{
            if(err){
             //数据库连接错误事件
             event.emit("DB_CONNECT_ERROR",err)
            }else{
                var uc = db.collection('documents');
                    uc.insert(data,(error,data3)=>{
                        if(err){
                            //数据库插入失败事件触发
                            event.emit('DB_TEXTSINFO_INSERT_ERROR',error)
                        }else{
                            //触发数据插入成功
                            event.emit('DB_TEXTS_INSERT_SUCCESS',data3)
                            //关闭数据库
                            db.close();
                        }
                    })
               
            }
        })
    },
    //用户文章列表数据库查询操作
    textListFind:()=>{
        mongo.connect(DB_COON_STR,(err,db)=>{
            if(err){
             //数据库连接错误事件
             event.emit("DB_CONNECT_ERROR",err)
            }else{
             //查询操作(mongodb的相关指令)
             var textList = db.collection('documents');
             textList.find({}).toArray((err,data)=>{
                 if(err){
                     //触发查询失败
                     event.emit("DB_TEXTS_FIND_ERROR",err)
                    //  console.log(err);
                 }else{
                     //查询成功
                     event.emit("DB_TEXTS_FIND_SUCCESS",data)
                     console.log(data);
                 }
             })
            }
         })
    },
    //用户文章详情数据库操作
    textDetailFind : articleId =>{
        console.log(articleId);
        mongo.connect(DB_COON_STR,(err,db)=>{
            if(err){
             //数据库连接错误事件
             event.emit("DB_CONNECT_ERROR",err)
            }else{
             //查询操作(mongodb的相关指令)
             var uc = db.collection('documents');
             
             uc.find({_id:new ObjectID(articleId)}).toArray((err,data)=>{
                 if(err){
                     //触发查询失败
                     event.emit("DB_TEXTS_FIND_ERROR",err)
                 }else{
                     //查询成功
                     event.emit("DB_TEXTS_FIND_SUCCESS",data)
                     console.log(data);
                 }
             })
            }
         })
    }
};
module.exports = dbDo;