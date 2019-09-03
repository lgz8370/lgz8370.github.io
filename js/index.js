(() => {
  window.AD_CONFIG.layer = (() => {
    let cbs = [];
    
    return {
      add: (cb) => {
        if(cbs.includes(cb)) {
          return false;
        }
        cbs.push(cb);
        return true;
      },
      remove: (cb) => {
        let index = cbs.indexOf(cb);
        if(index === -1) {
          return false;
        }
        cbs.splice(index, 1);
        return true;
      },
      // trigger before layer to be closed
      trigger: () => {
        cbs.forEach(cb => cb());
        cbs = [];
      }
    }
  })();

  const loadScript = (src) => {
    let exists = false;
  
    return () => new Promise((resolve) => {
      if(exists) return resolve();
      // 防止没有触发下方的onload时候, 又调用此函数重复加载
      exists = true;
      // 开始加载
      let script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      script.async = 'async';
      script.onerror = (ev) => {
        // 加载失败: 允许外部再次加载
        script.remove();
        exists = false;
        resolve(false);
      };
      script.onload = () => {
        // 加载成功: exists一直为true, 不会多次加载
        resolve(true);
      };
      document.body.appendChild(script);
    });
  };

  const { root } = window.AD_CONFIG;

  // load after DOM built
  const documentSrcs = [
    'js/copy.js',
    'js/layer.js',
    'js/scroll.js',
    'js/backTop.js',
    'js/time.js',
    'js/header.js',
    'js/passage.js',
    'js/share.js',
    'js/reward.js',
  ].map(item => `${root}${item}`);

  // load after all srcs loaded
  const windowSrcs = [
    'js/leancloud.js',
    'js/mathjax.js',
  ].map(item => `${root}${item}`);

  const documentSrcScripts = documentSrcs.map(src => loadScript(src));
  const windowSrcScripts = windowSrcs.map(src => loadScript(src));

  document.addEventListener('DOMContentLoaded', () => {
    documentSrcScripts.forEach(script => script());
  });

  window.addEventListener('load', () => {
    windowSrcScripts.forEach(script => script());
  });

//   伊布复制消息
  document.addEventListener('copy', function(e) {
    showMessage('<span style="color:red;">你都复制了些什么呀，转载要记得加上出处哦~~</span>', 5000);
    var seletedText = window.getSelection()
    if (seletedText.toString().length < 88) {
      return
    }
//    addCopyright(e)
    e.preventDefault()
  })

  function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function(word, slash1, token, slash2) {
      if (slash1 || slash2) {
        return word.replace('\\', '');
      }
      var variables = token.replace(/\s/g, '').split('.');
      var currentObject = context;
      var i, length, variable;
      for (i = 0, length = variables.length; i < length; ++i) {
        variable = variables[i];
        currentObject = currentObject[variable];
        if (currentObject === undefined || currentObject === null) return '';
      }
      return currentObject;
    });
  }

  String.prototype.renderTip = function(context) {
    return renderTip(this, context);
  };


  function initTips() {
    $.ajax({
      cache: true,
      url: `https://www.lgzblog.com/message.json`,
      dataType: "json",
      success: function(  result) {
    console.log(result);
        $.each(result.mouseover, function(index, tips) {
          $(tips.selector).mouseover(function() {
            var text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
              text: $(this).text()
            });
            showMessage(text, 3000);
          });
        });
        $.each(result.click, function(index, tips) {
          $(tips.selector).click(function() {
            var text = tips.text;
            if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
            text = text.renderTip({
              text: $(this).text()
            });
            showMessage(text, 3000);
          });
        });
      }
    });
  }
// 初始化消息
  initTips();

  function showMessage(text, timeout) {
    if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
    $('.message').stop();
    $('.message').html(text).fadeTo(200, 1);
    timeout = timeout || 5000;
    hideMessage(timeout);
  }

  function hideMessage(timeout) {
    $('.message').stop().css('opacity', 1);
    if (timeout === null) timeout = 5000;
    $('.message').delay(timeout).fadeTo(200, 0);
  }
})();
window.setInterval(showHitokoto, 30000);

function showHitokoto() {
  $.getJSON('https://v1.hitokoto.cn/', function(result) {
    showMessage(result.hitokoto, 5000);
  });
}

function showHitokoto() {
  $.getJSON('', function(result) {
    showMessage(result.hitokoto, 5000);
  });
}
