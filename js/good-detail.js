var stock = 2; // 库存数量
var num = 0;
$('.add-cart').on('click', function(event) {
    if (num >= stock) {
        $.toast('库存不足了,过段时间再来看看吧', 'text');
        return;
    }
    num++;
    $('.weui-badge').removeClass('hide');
    $('.weui-badge').html(num);
});
