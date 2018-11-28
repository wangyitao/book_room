/* spig.js */
//右键菜单
$(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        if (e.which === 3) {
            showMessage("秘密通道:<br /><a href=\"http://www.findtp.com/\" title=\"订阅\">订阅</a>    <a href=\"http://www.findtp.com\" title=\"首页\">首页</a>", 10000);
        }
    });
    $("#spig").bind("contextmenu", function (e) {
        return false;
    });
});

//鼠标在消息上时
$(document).ready(function ($) {
    $("#message").hover(function () {
        $("#message").fadeTo("100", 1);
    });
});


//鼠标在上方时
$(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
        $(".mumu").fadeTo("300", 0.3);
        msgs = ["我隐身了，你看不到我", "我会隐身哦！嘿嘿！", "别动手动脚的，把手拿开！", "把手拿开我才出来！"];
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});

//开始
$(document).ready(function ($) {
    if (isindex) { //如果是主页
        let now = (new Date()).getHours();
        if (now > 0 && now <= 6) {
            showMessage(visitor + ' 你是夜猫子呀？还不睡觉，明天起的来么你？', 6000);
        } else if (now > 6 && now <= 11) {
            showMessage(visitor + ' 早上好，早起的鸟儿有虫吃噢！早起的虫儿被鸟吃，你是鸟儿还是虫儿？嘻嘻！', 6000);
        } else if (now > 11 && now <= 14) {
            showMessage(visitor + ' 中午了，吃饭了么？不要饿着了，饿死了谁来挺我呀！', 6000);
        } else if (now > 14 && now <= 18) {
            showMessage(visitor + ' 中午的时光真难熬！还好有你在！', 6000);
        } else {
            showMessage(visitor + ' 快来逗我玩吧！', 6000);
        }
    } else {
        showMessage('欢迎' + visitor + '来到会议室预定系统', 6000);
    }
    $(".spig").animate({
            top: $(".spig").offset().top + 300,
            left: document.body.offsetWidth - 160
        },
        {
            queue: false,
            duration: 1000
        });
});

//鼠标在某些元素上方时
$(document).ready(function ($) {
    $('#id_username').mouseover(function () {
        showMessage('请输入你的用户名哦');
    });
    $('#id_password').mouseover(function () {
        showMessage('密码可不能输错了，输错了，就登不上去了');
    });
    $('#id_tel').mouseover(function () {
        showMessage('请输入手机号，哈哈哈');
    });
    $('.btn').mouseover(function () {
        showMessage('要提交了哦');
    });
    $('#a-yuding').mouseover(function () {
        showMessage('要去预定会议室嘛？');
    });

});
//预定会议室首页讲点啥
$(document).ready(function ($) {
    window.setInterval(function () {
        if (isindex) { //如果是主页
            msgs = ["点一下，再点一下，预定的会议室就取消了哦", "预定会议室需要登录哦", "被人预定过的会议室，不能在预定了！", "没有账号可以到右上角注册哦", "只能取消自己预定的会议室哦"];
            let i = Math.floor(Math.random() * msgs.length);
            showMessage(msgs[i], 10000);
        }
    }, 35000);
});

//无聊讲点什么
$(document).ready(function ($) {

    window.setInterval(function () {
        msgs = ["一只公鹿,它走着走着,越走越快,最后它变成了高速公路(鹿)!!!! ", "有个人长的像洋葱,走着走着就哭了", "吃葡萄不吐葡萄皮儿，不吃葡萄倒吐葡萄皮儿。我居然说对了！", "陪我聊天吧！", "好无聊哦，你都不陪我玩！", "…@……!………", "^%#&*!@*(&#)(!)(", "我可爱吧！嘻嘻!~^_^!~~", "谁淫荡呀?~谁淫荡?，你淫荡呀!~~你淫荡！~~", "从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲：“从前有座……”"];
        let i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i], 10000);
    }, 45000);
});

//无聊动动
$(document).ready(function ($) {
    window.setInterval(function () {
        msgs = ["师傅，我坚持不住了", "筋斗云，我们走...", "召唤神龙！", "皮皮虾,我们走,吃炸鸡，喝啤酒", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
        let i = Math.floor(Math.random() * msgs.length);
        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
        let i1 = Math.floor(Math.random() * s.length);
        let i2 = Math.floor(Math.random() * s.length);
        $(".spig").animate({
                left: document.body.offsetWidth / 2 * (1 + s[i1]),
                top: document.body.offsetHeight / 2 * (1 + s[i1])
            },
            {
                duration: 2000,
                complete: showMessage(msgs[i])
            });
    }, 55000);
});

//评论资料
$(document).ready(function ($) {
    $("#author").click(function () {
        showMessage("留下你的尊姓大名！");
        $(".spig").animate({
                top: $("#author").offset().top - 70,
                left: $("#author").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#email").click(function () {
        showMessage("留下你的邮箱，不然就是无头像人士了！");
        $(".spig").animate({
                top: $("#email").offset().top - 70,
                left: $("#email").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#url").click(function () {

        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
        $(".spig").animate({
                top: $("#url").offset().top - 70,
                left: $("#url").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
    $("#comment").click(function () {
        showMessage("认真填写哦！不然会被认作垃圾评论的！我的乖乖~");
        $(".spig").animate({
                top: $("#comment").offset().top - 70,
                left: $("#comment").offset().left - 170
            },
            {
                queue: false,
                duration: 1000
            });
    });
});

let spig_top = 50;
//滚动条移动
$(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
                top: $(window).scrollTop() + f + 300
            },
            {
                queue: false,
                duration: 1000
            });
    });
});

//鼠标点击时
$(document).ready(function ($) {
    let stat_click = 0;
    $(".mumu").click(function () {
        if (!ismove) {
            stat_click++;
            if (stat_click > 4) {
                msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！OH，My ladygaga"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            } else {
                msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "别摸我，大男人，有什么好摸的！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉老婆来打你的！", "干嘛动我呀！小心我咬你！"];
                var i = Math.floor(Math.random() * msgs.length);
                //showMessage(msgs[i]);
            }
            s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
            let i1 = Math.floor(Math.random() * s.length);
            let i2 = Math.floor(Math.random() * s.length);
            $(".spig").animate({
                    left: document.body.offsetWidth / 2 * (1 + s[i1]),
                    top: document.body.offsetHeight / 2 * (1 + s[i1])
                },
                {
                    duration: 500,
                    complete: showMessage(msgs[i])
                });
        } else {
            ismove = false;
        }
    });
});

//显示消息函数
function showMessage(a, b) {
    if (b == null) b = 10000;
    $("#message").hide().stop().html(a).fadeIn().fadeTo("1", 1).fadeOut(b);
}

//拖动
let _move = false;
let ismove = false; //移动标记
let _x, _y; //鼠标离控件左上角的相对位置
$(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            let x = e.pageX - _x;
            let y = e.pageY - _y;
            let wx = $(window).width() - $('#spig').width();
            let dy = $(document).height() - $('#spig').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
    });
});