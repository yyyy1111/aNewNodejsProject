
var theMarkDownObj={
     //初始化渲染
     theDrawinit:function(){
        var userName=JSON.parse(sessionStorage.getItem('userInfo')).username;
        $('.author span').text(userName);
    },
    // 多行文本输入框提示文字
    theTextareaNotice:'<pre></pre>',

    //发表事件
    thePostSubmit:function(){
        var that = this;
        $('button').on('click',function (e) {
            e.preventDefault();
            var theObj={
                userName:'',
                articleTitle:'',
                articleContent:''
            }
            var reg = /\n/g;
            var userName=JSON.parse(sessionStorage.getItem('userInfo')).username,
                articleTitle = $.trim($('#articleTitle').val()),
                articleContent = $.trim($('#articleContent').val());
                // console.log(articleTitle,articleContent);
                if(articleTitle && articleContent){
                    theObj.userName = userName;
                    theObj.articleTitle = articleTitle;
                    // theObj.articleContent = articleContent.replace(reg,'');
                    theObj.articleContent = marked(articleContent); 
                    that.thePostAjax(theObj);
                }else{
                    layui.use('layer',function () {
                        var layer = layui.layer;
                        var layerIndex = layer.open({
                            title : '提示',
                            content : '信息不完整!',
                            yes: function () {
                                // xxxxxxx
                                // 自定义的事件
                                layer.close(
                                    layerIndex);
                            }
                        });
                    })
                }
        })
    },
    //发表ajax
    thePostAjax:function(obj){
        var that = this;
            $.ajax({
                url:'/ajax/post',
                type:'post',
                data:obj,
                success:function (res) {
                    console.log(res);
                    layui.use('layer',function () {
                        var layer = layui.layer;
                        var layerIndex = layer.open({
                            title: '提示',
                            content: res.txt,
                            yes: function () {
                                // xxxxxxx
                                // 自定义的事件
                                layer.close(
                                    layerIndex);
                                window.location.href='/users/home';
                                // window.location.reload();
                            }
                        });

                    })
                }
            })
    },
    // 返回点击事件
    theGoBackClick:function(){
        var that =this;
        $('.goBack').on('click',function(){
            window.history.go(-1);
        })
    },
    init:function(){
        this.theDrawinit();
        this.thePostSubmit();
        this.theGoBackClick();
    }
}
theMarkDownObj.init();