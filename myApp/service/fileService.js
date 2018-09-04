var db = require("../db/dbConnect.js");
var event = require("../events/events.js");
var multiparty = require("multiparty");
var fs = require("fs");
var fileService = {
    upFile:(req,res)=>{
        var form = new multiparty.Form({
            uploadDir:'./userFile/headImg/'
        });
        var status = {
            code:0,
            txt:'文件上传失败!'
        };
        form.parse(req,(err,fields,files) =>{
            if(err) {
                console.log(err);
            } else {
                var inputFile = files.headimg[0];
                //获取临时文件的存储路径
                var uploadPath = inputFile.path;
                console.log(inputFile);
                // 获取原始文件名并拼接路径
                var dstPath = './userFile/headImg/' + inputFile.originalFilename;
                fs.rename(uploadPath,dstPath,err => {
                    if(err) {
                        console.log(status.txt);
                        console.log(`获取临时文件的存储路径为：${uploadPath}`);
                    } else {
                        console.log('上传成功!');
                        // res.render('user',{
                        //     page:'userInfo'
                        // })
                        status.code = 1;
                        status.txt = '文件上传成功!';
                        res.json(status);
                        res.end();
                    }
                })

            }
        })
    }
}
module.exports = fileService;