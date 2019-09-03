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
        // 启用fancybox插件
        $.fancybox(picUrlArr, opts);
    })
})
