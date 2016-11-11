/**
 * Created by Administrator on 2016/10/29.
 */
window.onload=function(){
   var oTxt=$("#txt");
   var oPwd=$("#pwd");
   var oReset=$("#reset");
   var oForm=$("#form");

    var reg1=new RegExp(/^\w{6,20}$/);
    var reg3=/^\s*$/;
    oTxt.blur(function(){
         val1=oTxt.val();
        if(reg3.test(val1)==true){
           $("#span1").html("账号不能为空");
           setTimeout(function(){
                $("#span1").html("");
           },2000);
           return false;
        }else{
            if(reg1.test(val1)==false){
                $("#span1").html("账号格式不正确");
                setTimeout(function(){
                    $("#span1").html("");
                },2000);
            }
        }
    });
    oPwd.blur(function(){
         val2=oPwd.val();
        if(reg3.test(val2)==true){
            $("#span2").html("密码不能为空");
            setTimeout(function(){
                $("#span2").html("");
           },2000);
            return false;
        }else{
            if(reg1.test(val2)==false){
                $("#span2").html("密码长度应在6-20位");
                setTimeout(function(){
                    $("#span2").html("");
                },2000);
            }
        }
    });
    oReset.blur(function(){
        val3=oReset.val();
        if(reg3.test(val3)==true){
            $("#span3").html("重复密码不能为空");
            setTimeout(function(){
                $("#span3").html("");
            },2000);
            return false;
        }else{
            if(val3!==val2){
                $("#span3").html("两次密码不一致");
                setTimeout(function(){
                    $("#span3").html("");
                },2000);
                return false;
            }
        }
    });

    oForm.submit(function(){
        if((reg1.test(val1)==true)&&(reg1.test(val2)==true)&&(val3 ==val2)){
            setCookie('txt',val1, 7, '/');
            setCookie('pwd',val2, 7, '/');
            setCookie('reset',val3, 7, '/');
        }
        else{
            
            return false
        }

    })

};