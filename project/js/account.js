/**
 * Created by Administrator on 2016/9/28.
 */
$(function () {
    var txtInp = $('.add_edit .txt');
    txtInp.focus(function () {
        $(this).css({borderColor:"red"});
        $(this).next().css({display:"none"});
    });
    txtInp.blur(function () {
        if($(this).attr('id') == 'userName'){
            var reg1 = /^[a-zA-Z ]{1,20}|^[\u4e00-\u9fa5]{1,10}$/;
            var nameValue = $(this).val();
            if(!reg1.test(nameValue)){
                $(this).next().css({display:"inline-block"});
            }
        }
        if($(this).attr('id') == 'idCard'){
            var reg2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            var idValue = $(this).val();
            if(!reg2.test(idValue)){
                $(this).next().css({display:"inline-block"});
            }
        }
        if($(this).attr('id') == 'detailAddress'){
            var addValue = $(this).val();
            if(addValue.length > 120 || addValue.length < 5){
                $(this).next().css({display:"inline-block"});
            }
        }
        if($(this).attr('id') == 'adMobile'){
            var reg3 = /^1[3578]\d{9}$/;
            var phValue = $(this).val();
            if(!reg3.test(phValue)){
                $(this).next().css({display:"inline-block"});
            }
        }
        $(this).css({borderColor:"#ccc"});
    });
});
