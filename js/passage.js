(() => {
  function handleImgClick(event) {
    window.open(event.target.getAttribute('src'), '_blank');
  }

  const { is_post, page_type } = window.AD_CONFIG;

//  document
//    .querySelectorAll('.passage-article')
//    .forEach(
//      passage => 
//        passage
//          .querySelectorAll('img')
//          .forEach(image => image.addEventListener('click', handleImgClick))
//    );

  if(!is_post && ['about', 'friends'].includes(page_type) === false) {
    return;
  }

  const layer = document.querySelector('#site-layer'),
    layerContent = layer.querySelector('.site-layer-content'),
    toc = document.querySelector('#site-toc'),
    tocShowBtn = document.querySelector('#site-toc-show-btn'),
    tocHideBtn = document.querySelector('#site-toc-hide-btn');
    // 默认显示目录
    toc.style.right = '0';
  tocShowBtn && tocShowBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    layer.style.display = 'none';
    layerContent.style.display = 'none';
    toc.style.right = '0';

    window.AD_CONFIG.layer.add(() => {
      toc.style.right = '';
      layer.style.display = 'none';
      layerContent.style.display = '';
    });
  });
  // 隐藏目录
  $("#site-toc-hide-btn").click(function () {
    toc.style.right = '';
  })
  tocHideBtn && tocHideBtn.addEventListener('click', window.AD_CONFIG.layer.trigger);
})();
