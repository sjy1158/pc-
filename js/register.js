var vue = new Vue({
    el:'#app',
    data:{
        formInline:{
            phoneId:'',
            nickName:'',
            invitationCode:'',
            password:'',
            module:'1',
            headImageUrl:'',
        },
        sendcode:'',
        code:'',
        codeType:'发送验证码',
        postData:{
            token:'',
            key:''
        },
        password:'',
        dialogVisible: false
    },
    methods:{
        getKey:function(){
            var obj = getList('userPage/getQiNiuToken','',false);
            this.postData.token = obj.token;
        },
        // 发送验证码
        sendCode:function(){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(!myreg.test(this.formInline.phoneId)){
                this.$message({
                    type: 'warning',
                    message:'请输入正确的手机号'
                });
            }else{
                var obj = new Object();
                obj.type = 1;
                obj.phone = this.formInline.phoneId;
                var data = getList('userOperation/sendMessage',obj,false);
                if(data.codeString.length!=0&&data.codeString!=null&&data.codeString!=undefined){
                    this.code = data.codeString;
                    this.codeType = '验证码已发送'
                }else{
                    this.$message({
                        type:'error',
                        message:'验证码发送失败'
                    })
                }
            }
        },
        // des加密
        encryptByDES:function(message,key){
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        },
        // 注册
        getRegister(){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/; //手机号码
            var passwordreg = /^[0-9a-zA-Z]{6,16}$/; //密码
            var nickNamereg = /^[\u4E00-\u9FA5]{2,24}$/; //昵称

            if(!myreg.test(this.formInline.phoneId)){
                this.$message({
                    type:'warning',
                    message:'请输入正确手机号'
                })
            }else{
                if(this.sendcode==''||this.sendcode!=this.code){
                    this.$message({
                        type:'warning',
                        message:'请输入正确验证码'
                    })
                }else{
                    if(!passwordreg.test(this.password)){
                        this.$message({
                            type:'warning',
                            message:'请输入正确格式密码'
                        })
                    }else{
                        this.formInline.password = this.encryptByDES(this.formInline.phoneId,this.password);
                        if(!nickNamereg.test(this.formInline.nickName)){
                            this.$message({
                                type:'warning',
                                message:'请输入正确格式昵称'
                            })
                        }else{
                            if(this.formInline.headImageUrl==''){
                                this.$message({
                                    type:'warning',
                                    message:'请点击上传头像'
                                })
                            }else{
                                getList('userOperation/register',this.formInline,false);
                                this.$message({
                                    type:'success',
                                    message:'注册成功,赶紧去登录吧！'
                                })
                                setTimeout(function () {
                                    window.location.href = 'login.html'
                                },2000)
                            }
                        }
                    }
                }
            }
        },
        beforeUpload:function(file) {
            const keyname=Date.parse(new Date());
            this.postData.key=keyname;
        },
        handleSuccess:function(response, file, fileList) {
            this.formInline.headImageUrl="http://pa8vmyrlm.bkt.clouddn.com/"+response.key;
        },
        handleRemove:function(file, fileList) {
            // alert(file, fileList);
        },
        handlePictureCardPreview:function(file) {
            this.formInline.imageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    created:function(){
        this.getKey()
    },
    mounted:function () {
    }
})