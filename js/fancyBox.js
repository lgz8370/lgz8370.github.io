$(function () {
    // fb = $("img");
    // 页面图片数据
    //var picUrlArr = $.map(fb,function (value,index) {
      //  return value.src;
   // })
   // console.log(picUrlArr);
    // 轮播相关属性
    var opts = {
        prevEffect : 'none',
        nextEffect : 'none',
        helpers : {
            thumbs : {
                width: 75,
                height: 50
            }
        }
    };
    $("img").click(function () {
	fb = $("img");
        // 页面图片数据
        var picUrlArr = $.map(fb,function (value,index) {
            return value.src;
        })
        // 移除最后两张图片
        picUrlArr.pop();
        picUrlArr.pop();
        // 当前点击图片
        var current = 'https://www.lgzblog.com' + $(this).attr("src");
        // 头部
        var top = new Array();
        // 尾部
        var end = new Array();
        $.each(picUrlArr,function (index,element) {
            if (current == element) {
                // 如果是当前点击图片则获取后面所有的图片
                end = picUrlArr.slice(index, picUrlArr.length);
                return false;
            }else {
                top.push(element);
            }
        })
        // 调整图片顺序
        var result =end.concat(top);
	// 启用fancybox插件
        $.fancybox(result, opts);    
      })
})
