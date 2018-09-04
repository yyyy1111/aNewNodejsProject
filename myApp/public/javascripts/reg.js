//注册对象
var regObj= {
    //元素获取
    //表单元素
    regForm:$('.reg-form'),
    //正则对象
    reg:{
      //用户名
      uname:/^[a-zA-Z_\w]{5,15}$/,
      //密码
      upwd:/^\w{6,16}$/,
      //手机 
      uph:/^1[3578]\d{9}$/ 
    },
    //判断计数对象
    count:{
        un:0,
        up:0,
        uph:0
    },
    //用户名框失焦方法
    userNameBlur:function(){
        var that = this;
        $('#username').on('blur',function(e){
            var value = $(this).val();
            if(that.reg.uname.test(value)){
                // console.log('aaaaa');
                $('label.user').hide();
                $(this).parent().find('p').text('✔').addClass('true').removeClass('false');
               that.theFindAjax(value);
            }else{
                // console.log(1111);
                $('label.user').hide();
                $(this).parent().find('p').text('✘').addClass('false').removeClass('true') ;
            }
        })
    },
    //密码框失焦方法
    userPassWordBlur:function(){
        var that = this;
        $('#userpword').on('blur',function(e){
            var value = $(this).val();
            if(that.reg.upwd.test(value)){
                $(this).parent().find('p').text('✔').addClass('true').removeClass('false');
                that.count.up=1;
            }else{
                $(this).parent().find('p').text('✘').addClass('false').removeClass('true') ;
                that.count.up=0;
            }
        })
    },
    //手机号框失焦方法
    userPhoneBlur:function(){
        var that = this;
        $('#userphnumber').on('blur',function(e){
            var value = $(this).val();
            if(that.reg.uph.test(value)){
                $(this).parent().find('p').text('✔').addClass('true').removeClass('false');
                that.count.uph=1;
            }else{
                $(this).parent().find('p').text('✘').addClass('false').removeClass('true') ;
                that.count.uph=0;
            }
        })
    },
    //注册按钮提交方法
    userSubmit:function(){
        var that = this;
        $('#userSubmit').on('click',function(){
            // e.preventDefault();
            var dataObj = {
                username:$('#username').val(),
                password:$('#userpword').val(),
                phone:$('#userphnumber').val()
            };
            var c = 0;
            for(var i in that.count){
                console.log(that.count[i]);
                
                if(!that.count[i]){
                    c++;
                    
                }
            
            }
            if(c>0){
                var layuiIndex = layui.use('layer',function(){
                    var layer = layui.layer;
                    layer.alert('注册失败！',function(layuiIndex){
                        //do somethings 
                        layer.close(layuiIndex);
                        $('#username').focus();
                       
                    })
               })
            }else{
                that.theSubmitAjax(dataObj);
            }
            

        })
    },
    //注册查询ajax方法
    theFindAjax:function(val){
        var that = this;
        $.ajax({
            url:'/ajax/findUser',
            type:'get',
            data:{
                username:val
            },
            success:function(res){
                console.log(res);
                if(res.code=='0'){
                    $('label.user').css({'display':'inline-block'}).find('div').removeClass('error').addClass('success').text(res.txt);
                    $('#username').parent().find('p').text('✔').addClass('true').removeClass('false');
                    that.count.un=1;
                    // return;
                }else{
                    $('label.user').css({'display':'inline-block'}).find('div').removeClass('success').addClass('error').text(res.txt);
                    $('#username').parent().find('p').text('✘').addClass('false').removeClass('true') ;
                    that.count.un=0;
                }
            }
        })
    },
    //注册提交ajax方法
    theSubmitAjax:function(obj){
        var that = this;
            $.ajax({
               url:'/ajax/reg',
               type:'post',
               data:obj,
               success:function(res){
                   console.log(res);
                   var layuiIndex = layui.use('layer',function(){
                        var layer = layui.layer;
                        layer.alert(res.txt,function(layuiIndex){
                            //do somethings 
                            layer.close(layuiIndex);
                            $('#username').focus();
                            
                        })

                   })
                    
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
    //初始化方法
    init:function(){
        this.userNameBlur();
        this.userPassWordBlur();
        this.userPhoneBlur();
        this.userSubmit();
        this.theGoBackClick();
    }
}
regObj.init();