/**
 * Created by Administrator on 2016/10/29.
 */
window.onload=function(){
     var oTxt=$("#txt");
     var oPwd=$("#pwd");
     var oForm=$("#form");
    var val1=null;
    var val2=null;

    oTxt.blur(function(){
        val1=oTxt.val();
        if(val1!==getCookie("txt")){
           $(".span1").html("账户名不存在");
           setTimeout(function(){
                $(".span1").html("");
           },2000);
        }
    });
    oPwd.blur(function(){
        val2=oPwd.val();
        if(val2!==getCookie("pwd")){
            $(".span2").html("密码输入错误");
            setTimeout(function(){
                $(".span2").html("");
           },2000);
        }
    });

    oForm.submit(function(){
        if((val1==getCookie("txt"))&&val2==getCookie("pwd")){
            /*window.location.href = "index.html";*/
        }
        else{
            return false
        }
    });


    /*------记住密码--------*/
    $(".sel").click(function(){
        if($(this).data('btn') != true){
            $(".sel").data('btn',true);
            setCookie("tt",val1, 7, '/');
            setCookie("pp",val2, 7, '/');
          //图片对应，不能图片和颜色对应
            $(".sel").css({"background-image":"url(../img/sel.png)"});
        }
        else{
            $(".sel").data('btn',false);
            removeCookie("tt", '/');
            removeCookie("pp", '/');
            $(".sel").css({"background-image":"none"});
        }
    });
    if(getCookie("tt") != 'null' && getCookie("pp") != 'null'){
        $(".sel").css({"background-image":"url(../img/sel.png)"});
        oTxt.val(getCookie("tt"));
        oPwd.val(getCookie("pp"));
    }
};