$(function () {
    $('table').each(function (i, e) {
        var $wrap = $('<div>').addClass('highlight-wrap');
        $(e).after($wrap);
        $wrap.append($('<button>').addClass('copy-btn').append('复制').on('click', function (e) {
            var code = $(this).parent().find('.code').find('.line').map(function (i, e) {
                return $(e).text();
            }).toArray().join('\n');
            var ta = document.createElement('textarea');
            var yPosition = window.pageYOffset || document.documentElement.scrollTop;
            ta.style.top = yPosition + 'px'; // Prevent page scroll
            ta.style.position = 'absolute';
            ta.style.opacity = '0';
            ta.readOnly = true;
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            ta.setSelectionRange(0, code.length);
            ta.readOnly = false;
            var result = document.execCommand('copy');
            if (result) $(this).text('复制成功');
            else $(this).text('复制失败');
            ta.blur(); // For iOS
            $(this).blur();
        })).on('mouseleave', function (e) {
            var $b = $(this).find('.copy-btn');
            setTimeout(function () {
                $b.text('复制');
            }, 300);
        }).append(e);
    });
})


