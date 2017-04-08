var fleft = $('.filter-left li');
var farr = [];

// 右边内容里添加的html
var dataliHtml = '<a href="#" class="panel-media">\
                    <div class="panel-media-hd">\
                        <img class="panel-media-pic" src="/images/food-img.png">\
                    </div>\
                    <div class="panel-media-bd">\
                        <div class="panel-media-tit text-hide">\
                                商家名称\
                        </div>\
                        <div class="panel-media-subtit text-hide">\
                                规格: 135g\
                        </div>\
                        <span class="panel-tip">新人福利</span>\
                        <div class="panel-media-price">\
                        &yen <i>1.4</i>\
                        </div>\
                        <div class="number">\
                            <b class="reduce"></b>\
                            <input class="input-num" type="number" value="0" readonly="">\
                            <b class="add"></b>\
                        </div>\
                    </div>\
                </a>\
                <a href="#" class="panel-media">\
                    <div class="panel-media-hd">\
                        <img class="panel-media-pic" src="/images/food-img.png">\
                    </div>\
                    <div class="panel-media-bd">\
                        <div class="panel-media-tit text-hide">\
                                商家名称\
                        </div>\
                        <div class="panel-media-subtit text-hide">\
                                规格: 135g\
                        </div>\
                        <span class="panel-tip">新人福利</span>\
                        <div class="panel-media-price">\
                               &yen <i>1.4</i>\
                        </div>\
                        <div class="number">\
                            <b class="reduce"></b>\
                            <input class="input-num" type="number" value="0" readonly="">\
                            <b class="add"></b>\
                        </div>\
                    </div>\
                </a>';

// 左边导航栏获取data-cate 放在farr[]里 append右边内容，
fleft.each(function(index, el) {
    var dataClass = $(el).find('a').attr('data-cate');
    var dataHtml = $(this).find('a').text();
    farr.push(dataClass);

    var catetype = $('.filter-content .cate-types').append('<div class="cate-type">' + dataliHtml + '</div>');
});

// 调用farr[]数组，赋值右边内容的div对应的id
var fright = $('.filter-right');
var frightTop = $('.filter-tip').height() + $('.filter-item').height() + $('.filter-top').height() + 2;
var frightBot = $('.filter-footer').height();
fright.css({ top: frightTop });

// $('.filter-index').css({paddingBottom: frightBot});
var cateType = $('.filter-right .cate-type');
cateType.each(function(i, el) {
    $(this).attr('id', farr[i]);
});

// iscroll
var myScroll, myScrollri;
var $ulLeft;

function pullUpAction() {
    setTimeout(function() {
        myScrollri.refresh();
    }, 200);
}
/**
 * 初始化iScroll控件
 */
function loaded() {
    $ulLeft = $(".filter-left");
    myScroll = new IScroll(".filter-left", {
        mouseWheel: true,
        click: true,
        preventDefault: false,
        preventDefaultException: {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/
        },
    })
    myScrollri = new IScroll(".filter-right", {
        mouseWheel: true,
        click: true,
        interactiveScrollbars: true,
        probeType: 3,
        mouseWheel: true,
        click: true
    });

}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, false);

document.addEventListener('DOMContentLoaded', loaded(), false);

// S 滚动监听
// S 获取右边滚动离页面的高度
var position = [];
$('.cate-type').each(function(index, el) {
    var rtop = parseInt($('.filter-right').offset().top + 18);
    var cateTop = parseInt($('.cate-type').eq(index).offset().top);
    var toltop = parseInt(rtop - cateTop);
    position.push(toltop);
});

/* S 点击左边，右边切换内容 */
// function leftclick() {
$('.filter-left li').on('click', function() {
    var selfIndex = $(this).index();
    var str = ".filter-left li:nth-child(" + (selfIndex + 1) + ")";
    var rt = ".cate-type:nth-child(" + (selfIndex + 1) + ")";
    $(str).addClass('on').siblings().removeClass('on');
    myScroll.scrollToElement(document.querySelector(str), 0, null, null, IScroll.utils.ease.elastic);
    myScrollri.scrollToElement(document.querySelector(rt), 0, null, null, IScroll.utils.ease.elastic);
});
// updatePosition();
// };
// leftclick();
/* E 点击左边，右边切换内容 */

function updatePosition() {
    // return false;
    var pageY = this.y;
    for (var i = 0; i < position.length; i++) {
        if (position[i] > pageY) {
            var str = ".filter-left li:nth-child(" + (i + 1) + ")";
            myScroll.scrollToElement(document.querySelector(str), 0, null, null, IScroll.utils.ease.elastic);
            $(str).addClass('on').siblings('.filter-left li').removeClass('on');
        }
    };
}
myScrollri.on('scroll', updatePosition);
// E 滚动监听

// 增加数量
function addnum() {
    // var limitBuy = $('.limit-buy').html();
    var limitBuy = 5; //限购
    $(".add").on("click", function() {
        $(this).parent('.number').addClass('enter')
        var number = parseInt($(this).prev().val());
        var num = $(this).parent('.number').find('.input-num');
        if (!isNaN(number)) {
            if (number < 1) {
                number = 1;
            } else {
                number += 1;
                if (number >= limitBuy) {
                    number = limitBuy;
                    $(this).css({ backgroundColor: '#ddd' });
                    setTimeout(function() {
                        $.toast('库存不足了,过段时间再来看看吧', 'text');
                    })
                }
            }
        } else {
            number = 1
        }
        $(this).prev().val(number);
        $(num).html(number);
        tot();
    });
};

// 减少数量
function reducenum() {
    $(".reduce").on("click", function() {
        var number = parseInt($(this).next().val());
        if (!isNaN(number)) {
            if (number <= 1) {
                number = 0;
                $(this).parent('.number').removeClass('enter')
            } else {
                number -= 1;
                $(this).siblings('.add').css({ backgroundColor: '#ff6c00' })
            }
        } else {
            number = 1
        }
        $(this).next().val(number);
        tot();
    });
};

// 总价格
// 购物车的总价格
function tot() {
    var sumA = 0; // 数量值
    var sumB = 0; // 总价格
    var input = $("input[type='number']");
    input.each(function() {
        var val = $(this).val();
        // 计算总价格
        var price = $(this).parents('.panel-media').find('.panel-media-price i').html();
        singlePrice = price * val;
        sumB += singlePrice;

        // 计算总数量
        sumA += parseInt(val);
        if (sumA <= 0) {
            $('.weui-badge').addClass('hide');
        } else {
            $('.weui-badge').html(sumA);
            $('.weui-badge').removeClass('hide');
            $(".tol-price").html('&yen;' + (sumB).toFixed(2));
        }
    });

};

addnum();
reducenum();

// 右侧tab标签切换
$('.filter-item li').on('click', function() {
    $(this).addClass('on')
    $(this).siblings().removeClass('on')

})

// 排序
var flag = true;
$('.filter-price').click(function() {
    if (flag) {
        $(this).find('img').attr('src', '../images/up.svg');
        flag = false;
    } else {
        $(this).find('img').attr('src', '../images/down.svg');
        flag = true;
    }
});
// 右侧分类点击
$('.filter-tip li').on('click', function() {
    $(this).addClass('on');
    $(this).siblings().removeClass('on');
})
