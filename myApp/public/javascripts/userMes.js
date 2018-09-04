//用户信息对象
var userInfo={
    //点击上传按钮时间
    theStartTime:'',
    //ajax成功返回时间
    theEndTime:'',
    //上传提交事件
    thePostSubmit:function(){
        var that=this;
        $('.btn').on('click',function (e) {
            e.preventDefault();
            that.theStartTime=new Date().getTime();
            console.log(that.theStartTime);
            var formData = new  FormData();
            var img_file=$('.file input')[0];
            var fileObj=img_file.files[0];
            var describe=$('.file input').val();
            formData.append('xxx',fileObj);
            that.thePostAjax(formData);
        })
    },
    //进度条
    setProgress:function(){

    },
    //图片预览方法
    previewImage:function(e){
        var reader = new FileReader();
        reader.onload=function (e) {
            $('.imgBox img').prop({'src':e.target.files[0]});
        }
    },
    //上传事件ajax
    thePostAjax:function(formData){
        var that = this;
            $.ajax({
                url:'/ajax/info',
                type:'post',
                processData:false,
                contentType:false,
                async:true,
                data:formData,
                success:function (res) {
                    // console.log(1);
                   if(res.code=='1'){
                        $('.imgBox img').prop({'src':'/images/'+res.imgUrl});
                        that.theEndTime=new Date().getTime();
                        console.log(that.theEndTime);
                   }else {
                       var layuiIndex =  layui.use('layer',function () {
                           var layer = layui.layer;
                           layer.alert(res.txt,function (layuiIndex) {
                               layer.close(layuiIndex);
                           })
                       })
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
    init:function () {
        this.thePostSubmit();
        this.theGoBackClick();
    }
}
userInfo.init();