/**
 * Created by Hugo on 2017/1/10.
 */


$(function(){
    var bannerWidth,
        slideDuration=5000,
        animateDuration=500,
        bannerIndex = 0,
        count = $(".cSlide_item").length,
        UL = $('#cSlide_ul'),
        touchX,
        touchendX,
        isSlide = false;

    //����Ӧ�ߴ�
    function set_css() {
        bannerWidth=$('#cSlide').width();

        $('#cSlide_ul').css('width',bannerWidth*(count+2));
        $(".cSlide_item").css('width',bannerWidth);
    }
    $(window).resize(set_css);
    set_css();

    $("#cSlide_ul").css({"margin-left":-bannerWidth})
    //����banner����
    for (var n = 0; n < count; n++) {
        $('#item_point').append('<li></li>')
    }
    $('#item_point>li').eq(0).css({"margin-left": "0", "background": "#fff"});
    

    $('.cSlide_item:last').clone().prependTo(UL);
    $('.cSlide_item').eq(1).clone().appendTo(UL);
    function setTimer() {
       Timer = window.setInterval(function () {
            ++bannerIndex;
            slide();
            /*console.log(bannerIndex);*/
        }, slideDuration);
    }

    function clearTimer() {
        if (window.Timer)
            window.clearInterval(Timer);
    }

    function resetTimer() {
        clearTimer();
        setTimer();
    }

    setTimer();

    //������
    $("#item_point li").click(function () {
        bannerIndex = $(this).index();
        $(this).css("background-color", "#fff");
        slide();
        resetTimer();
    });

    //���Ҽ�ͷ���
    $('#doLeft').click(function () {
        if (isSlide)return;
        --bannerIndex;
        slide();
        resetTimer();
    });
    $('#doRight').click(function () {
        if (isSlide)return;
        ++bannerIndex;
        slide();
        resetTimer();
    });

    //�ֻ�����
    $('#banner_box').on({
        touchstart: function () {
            touchX = touchendX = Number(event.touches[0].clientX);
        },
        touchmove: function () {
            event.preventDefault();
            touchendX = Number(event.touches[0].clientX);
        },
        touchend: function () {
            var moveDistance = touchX - touchendX;
            if (moveDistance < -45) {
                if (isSlide)return;
                --bannerIndex;
                slide();
                resetTimer();
            } else if (moveDistance > 45) {
                if (isSlide)return;
                ++bannerIndex;
                slide();
                resetTimer();
            }
        }
    });

    function slide() {
        if (isSlide)return;
        isSlide = true;

        $("#cSlide_ul").stop(true, true).animate({
                'margin-left': (bannerIndex + 1) * -bannerWidth
            }, animateDuration,
            function () {
                if (bannerIndex > count - 1) {
                    $("#cSlide_ul").css({
                        'margin-left': -bannerWidth
                    });
                    bannerIndex = 0;
                }
                else if (bannerIndex < 0) {
                    $("#cSlide_ul").css({
                        'margin-left': count * -bannerWidth
                    });
                    bannerIndex = count - 1;
                }
                isSlide = false;
            }
        );


        $("#item_point li").css('background', 'rgba(0,0,0,0.4)');
        $("#item_point li").eq(bannerIndex > count - 1 ? 0 : bannerIndex).css("background-color", "#fff");
        /*console.log(bannerIndex);*/
    }
});