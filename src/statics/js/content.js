(function(){

  var loadjs = function(a){
      var sc = document.getElementById("kjs-inject");
      if(!sc){
        var c = document.getElementsByTagName("head")[0];
        sc = document.createElement('script');
        sc.id = "kjs-inject";
        sc.src = a;
        c.insertBefore(sc, c.firstChild)
      }else{
        sc.src = a;
      }
    };






  //前台接收消息
  chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(location.href, request.domain);
    loadjs('http://gmu.baidu.com/dist/zepto.js');

  });


  //前台发送消息
  chrome.extension.sendMessage({
    'type':'setting'
  });
})()
