$(function(){
    initPage();

    setTimeout(function(){
        loadResourse();
    },1);

    var documentHeight = $(document).height();
    $(window).resize(function() {
        var currentDocumentH = $(document).height();
        if(currentDocumentH == documentHeight){
            $('.page-prize').removeClass('change-style');
        }
        if(currentDocumentH < documentHeight){
            $('.page-prize').addClass('change-style');
        }
    });
});

function rotateFunc(awards, angle, text) {  //awards:奖项，angle:奖项对应的角度
    $('#lotteryBtn').stopRotate();
    $("#lotteryBtn").rotate({
        angle: 0,
        duration: 5000,
        animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
        callback: function () {
            showAlert(awards);
        }
    });
};

var prizeAngle = {
    1: 0,
    2: -60,
    3: -120,
    4: -180,
    5: -240,
    6: -300
};

function initPage(){

    $('.J-rule-btn').click(function(){
        var status = $(this).data('status');
        if(status == 1){
            $('.page-rule').show();
        }
        return;
    });

    $('.J-lottery-star').click(function(){
        $("#lotteryBtn").rotate();
        $('.J-rule-btn').data('status', 0);
        var data = [1, 2, 3, 4, 5, 6]; //返回的数组
        data = data[Math.floor(Math.random() * data.length)];
        /*
         *  data = 1 : 是iphone手机
         *  data = 2 / 5 : 是流量包
         *  data = 3 / 6 : 谢谢参与
         *  data = 4 : 小米净化器
         * */
        rotateFunc(data, prizeAngle[data]);
    });

    $('.page-rule .J-close').click(function(){
        $(this).parent().hide();
    });

    $('.page-alert .J-close').click(function(){
        showIndex();
    });

    $('.btn-again').click(function(){
        showIndex();
    });

    $('.btn-achieve').click(function(){
        //提交表单
        var target = $(this).data('target');

        submitInfo(target);
    });

    $('.btn-confirm').click(function(){
        showIndex();
    })
}

function showIndex(){
    $('.page').hide();
    $('.page-index').show();
}
/*
* showAlert对应参数一览表
*  1 : 一等奖（IPHONE6s）
*  2 / 5: 二等奖（30-50M流量）
*  3 / 6 : 谢谢参与（猴哥再送你一次机会 再试一次页）
*  4 : 三等奖（小米净化器）
*  'qr-code' : 二维码页
*  'end' : 两次机会已用完，分享好友页,还可再抽一次
*  'real-end' : 三次机会已用完页
*  'achieve-success' : 获取礼品成功页
* */

function showAlert(index){
    $('.alert-page .alert').hide();
    $('.page-prize .content').hide();
    $('.J-rule-btn').data('status', 1);
    console.log(index);
    if(index == 1){
        $('.page-index').hide();
        $('.page-prize .prize-1').show();
        $('.page-prize').show();
        return;
    }
     if(index == 2 || index == 5){
         $('.page-index').hide();
         $('.page-prize .prize-2').show();
         $('.page-prize').show();
        return;
    }
    if(index == 4){
        $('.page-index').hide();
        $('.page-prize .prize-3').show();
        $('.page-prize').show();
        return;
    }
    if(index == 3 || index == 6){
        $('.page-alert .alert-2').show();
        $('.page-alert').show();
        return;
    }
    if(index == 'qr-code'){
        $('.page-alert .alert-1').show();
        $('.page-alert').show();
        return;
    }
    if(index == 'achieve-success'){
        $('.page-alert .alert-3').show();
        $('.page-alert').show();
        return;
    }
    if(index == 'end'){
        $('.page-alert .alert-4').show();
        $('.page-alert').show();
        return;
    }
    if(index == 'real-end'){
        $('.page-alert .alert-5').show();
        $('.page-alert').show();
        return;
    }
}

function alertError(desc){
    $('.alert-box').html('')
        .append(desc)
        .show();
    setTimeout(function(){
        $('.alert-box').hide();
    },1500)
}

function submitInfo(target){
    var data = {};
    if(target == 'prize-1' || target == 'prize-3'){
        data.phone = $('.' + target + ' .phone').val();
        data.address = $('.' + target + ' .address').val();
        data.name = $('.' + target + ' .name').val();
        data.prize = target == 'prize-1' ? 'IPHONE6s' : '小米净化器';
        console.log(data);
        if(!data.phone || !data.address || !data.name){
            alertError('请将信息填写完整');
            return false;
        }
    }else if(target == 'prize-2'){
        data.phone = $('.' + target + ' .phone').val();
        data.prize = '流量包';
    }else {
        return;
    }
    console.log('data--> ',data);
    if(!/^1\d{10}$/.test(data.phone)){
        alertError('请输入正确的手机号');
        return false;
    }

    $.ajax({
        type: "post",
        url: "test.json",
        data: data,
        dataType: "json",
        success: function(data){
            showAlert('achieve-success');
            return;
        },
        error: function(){
            alertError('网络出错');
            setTimeout(function(){
                showIndex();
            },2000)
        }
    });
}

function  loadResourse(){
    var srcObjs = $('[data-src]');
    for(var i = 0, len = srcObjs.length; i < len; i++){
        srcObjs.eq(i).attr('src', srcObjs.eq(i).data('src'));
    }
}
