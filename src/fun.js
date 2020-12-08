export default function slide() {
    function query(selector) {
        return document.querySelectorAll(selector);
    }

    //获取元素的宽度和高度
    function getSize(selector) {
        var ele = query(selector)[0];
        var style = getComputedStyle(ele);

        return {
            width: parseFloat(style.width),
            height: parseFloat(style.height),
        };
    }

    //获取imgbox宽度和高度
    var imgBoxSize = getSize('.img-box');
    // console.log('imgBoxSize ==> ', imgBoxSize);

    //获取拼块的宽度和高度
    var pinSize = getSize('.pin');
    // console.log('pinSize ==> ', pinSize);

    //获取空白块宽度和高度
    var whiteSize = getSize('.white');
    // console.log('whiteSize ==> ', whiteSize);

    //获取滑块宽度和高度
    var blockSize = getSize('.block');
    // console.log('blockSize ==> ', blockSize);

    //随机生成拼块的坐标
    var pin = query('.pin')[0];
    var pinLeft = Math.random() * (imgBoxSize.width / 2 - pinSize.width);
    // console.log('pinLeft ==> ', pinLeft);
    var pinTop = Math.random() * (imgBoxSize.height / 2 - pinSize.height)
    // console.log('pinTop ==> ', pinTop);
    pin.style.left = pinLeft + 'px';
    pin.style.top = pinTop + 'px';


    //随机生成空白块坐标
    var white = query('.white')[0];
    var whiteLeft = Math.random() * (imgBoxSize.width - whiteSize.width);
    whiteLeft = whiteLeft < imgBoxSize.width / 2 ? imgBoxSize.width / 2 : whiteLeft;
    white.style.left = whiteLeft + 'px';
    white.style.top = pinTop + 'px';
    pin.style.backgroundPosition = -whiteLeft + 'px ' + -pinTop + 'px';

    //生成滑块的left
    var block = query('.block')[0];
    block.style.left = pinLeft + 'px';

    var layer = query('.layer')[0];

    //拖动滑块
    var x0 = 0;
    block.onmousedown = function (e) {
        console.log(this);
        var left = parseFloat(getComputedStyle(this).left);
        x0 = e.offsetX + left;

        layer.style.display = 'block';

        // console.log('x0 ==> ', x0);
    }

    layer.onmousemove = function (e) {
        var x = e.offsetX;
        // console.log('x ==> ', x);

        //获取移动距离
        var distance = x - x0;
        // console.log('distance ==> ', distance);
        var left = parseFloat(getComputedStyle(block).left);
        // console.log('left ==> ', left);
        var x1 = left + distance;

        var min = 0;
        var max = imgBoxSize.width - blockSize.width;
        x1 = x1 <= min ? min : x1 >= max ? max : x1;
        block.style.left = x1 + 'px';

        //移动拼块
        pin.style.left = x1 + 'px';

        x0 = x;
    }

    layer.onmouseup = function () {
        this.style.display = 'none';

        //验证是否成功
        //获取拼块的left
        var pinLeft0 = parseFloat(getComputedStyle(pin).left);
        // console.log('pinLeft0 ==> ', pinLeft0);

        //获取空白块的left
        // console.log('whiteLeft ==> ', whiteLeft);

        if (Math.abs(pinLeft0 - whiteLeft) <= 5) {
            alert("验证成功")
            pin.style.left = whiteLeft + 'px';
        } else {
            alert('验证失败');
        }

    }

}