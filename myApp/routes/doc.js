const express = require('express');
const router = express.Router();
const fs = require('fs');
const makred = require('marked');

router.get("/:docName",function(req,res,next){
    console.log('name:' + req.params.docName);
    fs.readFile(__dirname+'/../public/doc/'+req.params.docName + '.md',function(err,data){
        if(err){
            console.log("文件不存在!");
            res.send("文件不存在!");
            // console.log(data);
        }else{
            console.log(data);
            htmlStr = makred(data.toString());
            console.log(htmlStr)
            res.render('doc',{doc:htmlStr});
        }
    })
})

module.exports = router;