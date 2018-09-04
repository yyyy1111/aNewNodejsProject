var theArticleDetailObj ={
    // 获取浏览器参数函数
    theArticleId: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }

    },
    theAjaxDraw:function(articleId){
        var that= this;
        $.ajax({
            url:'/ajax/articleDetail',
            type:'post',
            data:{
                articleId:articleId
            },
            success:function(res){
                console.log(res.success);
                console.log(res.success[0].articleTitle);
                $('.articleDetail h3').html(res.success[0].articleTitle);
                 var textStr = '<span>author:'+res.success[0].userName+'</span><span>date:'+res.success[0].postTime+'</span>';
                $('.articleDetail p').html(textStr);
                $('.articleDetail div').html(res.success[0].articleContent);
            }
        })
    },
    // 返回点击方法
    theGoBackClick:function(){
        var that =this;
        $('.theGoBack').on('click',function(){
            window.history.go(-1);
        })
    },
    init:function(){
        //获取articleId
        var articleId =this.theArticleId('articleId');
        console.log(articleId);
        //渲染ajax
        this.theAjaxDraw(articleId); 
        this.theGoBackClick();
    }
}
theArticleDetailObj.init();