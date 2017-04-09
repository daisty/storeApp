// 订单结算
$(".weui-cell__bd .weui-btn").on('click', function() {
    $(this).addClass('weui-btn_blue');
    $(this).siblings().addClass('weui-btn_default');
    $(this).siblings().removeClass('weui-btn_blue');
});

// 选择取货时间
$("#time").datetimePicker({
        title: '出发时间',
        min: "1990-12-12",
        max: "2022-12-12 12:12",
        onChange: function (picker, values, displayValues) {
          console.log(values);
        }
      })