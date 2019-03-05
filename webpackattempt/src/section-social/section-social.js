const item = $('.carousel-item');
const arrow = $('.arrow');
let clickCounter = 0;

for (let i = 0, l = item.length; i < l; i++) {
    $(item[i]).attr('id', `${i}`).css('position', 'relative');
}

$(item).hide();

$('#2').show();

arrow.click(function (e) {
    if (clickCounter === 0) {
        clickCounter++;
        let visible = $('.carousel-item:visible')[0];
        let visibleWidth = $(visible).width();
        let offsetTop = $(visible).offset().top;
        let offsetLeft = $(visible).offset().left;
        let idVisible = Number($(visible).attr('id'));
        if ($(e.target).hasClass('arrow-left')) {
            let showItem = $(`#${idVisible + 1}`);
            if (idVisible + 1 === item.length) {
                showItem = $(`#0`);
            }
            let offsetObj = {top: `${offsetTop}`, left: `${$(window).width()}`};
            $(visible).css('position', 'absolute').offset({
                top: offsetTop,
                left: offsetLeft
            }).width(visibleWidth).animate({left: `-=${Number(offsetObj.left) - Number(offsetLeft)}`}, 'slow', function () {
                $(this).css({position: 'relative', width: 'auto'}).hide();
                clickCounter = 0;
            });
            $(showItem).show();
            $(showItem).offset(offsetObj);
            $(showItem).animate({left: `-=${Number(offsetObj.left) - Number(offsetLeft)}`}, 'slow', function () {
                $(this).css('position', 'static');
            });
        } else if ($(e.target).hasClass('arrow-right')) {
            let showItem = $(`#${idVisible - 1}`);
            if (idVisible - 1 === -1) {
                showItem = $(`#${item.length - 1}`);
            }
            let offsetObj = {top: `${offsetTop}`, left: `${-(Number(offsetLeft) + visibleWidth)}`};
            $(visible).css('position', 'absolute').offset({
                top: offsetTop,
                left: offsetLeft
            }).width(visibleWidth).animate({left: `+=${-Number(offsetObj.left) + Number(offsetLeft)}`}, 'slow', function () {
                $(this).css({position: 'relative', width: 'auto'}).hide();
                clickCounter = 0;
            });
            $(showItem).show();
            $(showItem).offset(offsetObj);
            $(showItem).animate({left: `+=${-Number(offsetObj.left) + Number(offsetLeft)}`}, 'slow', function () {
                $(this).css('position', 'static');
            });
        }
    }
});



