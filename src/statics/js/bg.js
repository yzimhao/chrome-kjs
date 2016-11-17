(function(){
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    if(message.type =='tabinfo'){
      chrome.tabs.getSelected(null, function(tabs){
        chrome.runtime.sendMessage({
          'url': tabs.url,
          'title': tabs.title,
          'icon': tabs.favIconUrl
        });
      });
    }
  });

})();
