var textListObj ={
    //tabIndex
    theTabIndex:'2',
    // 注册点击
    theRegClick:function(){
        var that = this;
       $('.ulTabs li:nth-child(1)').on('click',function(){
           that.theTabIndex=$(this).index().toString();
          
           var obj={
            theTabIndex:that.theTabIndex
           }
           sessionStorage.setItem('theTabIndex',JSON.stringify(obj));
           window.location.href='/users/register';
       }) 
    },
    // 登陆点击
    theLogClick:function(){
        var that = this;
        $('.ulTabs li:nth-child(2)').on('click',function(){
            that.theTabIndex=$(this).index().toString();
            var obj={
                theTabIndex:that.theTabIndex
               }
               sessionStorage.setItem('theTabIndex',JSON.stringify(obj));
            window.location.href='/users/login';
        }) 
    },
    // 个人信息点击
    theUserInfoClick:function(){
        var that = this;
        $('.ulTabs li:nth-child(4)').on('click',function(){
            that.theTabIndex=$(this).index().toString();
            var obj={
                theTabIndex:that.theTabIndex
               }
            sessionStorage.setItem('theTabIndex',JSON.stringify(obj));
            var un = JSON.parse(sessionStorage.getItem('userInfo')).username;
            window.location.href='/users/data?username='+un;
        }) 
    },
    // 文章编辑点击
    theArticleEditClick:function(){
        var that = this;
        $('.ulTabs li:nth-child(5)').on('click',function(){
            that.theTabIndex=$(this).index().toString();
            var obj={
                theTabIndex:that.theTabIndex
               }
            sessionStorage.setItem('theTabIndex',JSON.stringify(obj));
            window.location.href='/users/edit';
        }) 
    },
    // markdown文章编辑点击
    theMarkDownClick:function(){
        $('.ulTabs li:nth-child(6) .theFuncList p').eq(1).on('click',function(){
            window.location.href='/users/post';
        });
    },
    // 初始化ajax渲染
    theTextListAjax:function(){
        var that = this;
            $.ajax({
               url:'/ajax/textList',
               type:'post',
               success:function(res){
                    // console.log(res);
                    var textList= res.success,
                        textListStr = '',
                        val= sessionStorage.getItem('userInfo');
                        // console.log(val);
                        if(val){
                            if(res.code == 2){
                                for(var i = 0;i<textList.length;i++){
                                    textListStr +='<li data-link="'+textList[i]._id+'">' +
                                    '<h3>'+textList[i].articleTitle+'</h3>' +
                                    '<div><span>author:'+textList[i].userName+'</span><span>date:'+textList[i].postTime+'</span></div>' +
                                    '<article>' + 
                                        textList[i].articleContent.substring(0,20)
                                         +
                                    '...</article>' +
                                '</li>' 
                                }
                                $('.theArticle_list ul').html(textListStr);
                            }
                            $('.ulTabs li').eq(2).addClass('chosen').siblings().removeClass('chosen');

                        }else{
                            var layuiIndex= layui.use('layer',function(){
                                var layer = layui.layer;
                                    layer.alert('请登录!',function(layuiIndex){
                                        //登陆成功以后跳转
                                        layer.close(layuiIndex);
                                        window.location.href='/users/login';
                                    })
                            })
                        }
               } 
            })
    },
    // 文章点击
    theTextListClick:function(){
     
        $('.theArticle_list ul').on('click','li',function(){
            var theId = $(this).attr('data-link');
            window.location.href='/users/articleDetail?articleId='+theId;
        })
    },
    // 初始化函数
    init:function(){
        this.theRegClick();
        this.theLogClick();
        this.theTextListAjax();
        this.theUserInfoClick();
        this.theArticleEditClick();
        this.theTextListClick();
        this.theMarkDownClick();
    }
}
textListObj.init();