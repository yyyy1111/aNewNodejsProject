//登录对象
var logObj={
    //元素获取
    //表单元素
    logForm:$('#userSubmit'),
    //登录提交事件
    theLoginSubmit:function(){
        var that =  this;
        
        $('#userSubmit').on('click',function(e){
            e.preventDefault();
            var dataObj = {
                username:$('#userName').val(),
                password:$('#userPassword').val()
            }
            that.theLoginAjax(dataObj);
        })
    },
    //登录提交事件ajax
    theLoginAjax:function(obj){
        var that =  this;
        $.ajax({
            url:'/ajax/login',
            type:'post',
            data:obj,
            success:function(res){
                console.log(res);
                if(res.code==1){
                        var layuiIndex= layui.use('layer',function(){
                            var layer = layui.layer;
                                layer.alert(res.txt,function(layuiIndex){
                                    //登陆成功以后跳转
                                    layer.close(layuiIndex);
                                    // $('#userName').focus();
                                    //存储登录用户名信息
                                    var userInfo = {
                                        username:obj.username
                                    }
                                    sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
                                    window.location.href='/users/data?username='+obj.username;

                                })
                        })
                        return;
                }else if(res.code==0){
                    var layuiIndex= layui.use('layer',function(){
                        var layer = layui.layer;
                            layer.alert(res.txt,function(layuiIndex){
                                layer.close(layuiIndex);
                                // window.location.href='/users/register';
                                $('#userName').focus();
                            })
                    })
                    return;
                }
            }
        })
    },
    // 返回点击方法
    theGoBackClick:function(){
        var that =this;
        $('.goBack').on('click',function(){
            window.history.go(-1);
        })
    },
    //初始化函数
    init:function(){
        this.theLoginSubmit();
        this.theGoBackClick();
    }
}
logObj.init();