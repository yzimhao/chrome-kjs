(function() {

    // 获取options选项
    chrome.storage.sync.get(function(opts){
        if(opts.search){
            glo.opts = opts;
        }
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type == 'tabinfo') {
            chrome.tabs.getSelected(null, function(tabs) {
                chrome.runtime.sendMessage({
                    'url': tabs.url,
                    'title': tabs.title,
                    'icon': tabs.favIconUrl
                });
            });
        } else if(message.type == 'update_opts') {
            // 主动修改配置项
            glo.opts = message.data;
        }
    });


    var open_new_tab = function(url){
        chrome.tabs.create({
            url: url
        });
    };


    // contextMenus
    var createContextMenus = function() {
        if(glo.opts.search != '0'){
            if(!glo.iscreateMenu){
                chrome.contextMenus.create({
                    id: glo.contextMenus,
                    title: chrome.i18n.getMessage("search"+ glo.opts.search),
                    contexts: ["page", "frame", "selection", "link", "image", "video", "audio"],
                    documentUrlPatterns: ["http://*/*", "https://*/*", "ftp://*/*"]
                }, function(){

                });
                glo.iscreateMenu = true;
                glo.search.cur = glo.opts.search;
            }
        }

    };
    var removeContextMenus = function(){
        if(glo.opts.search == '0' && glo.iscreateMenu){
            chrome.contextMenus.remove(glo.contextMenus);
            glo.iscreateMenu = false;
        }
        if(glo.search.cur != glo.opts.search && glo.iscreateMenu){
            chrome.contextMenus.remove(glo.contextMenus);
            glo.iscreateMenu = false;
        }
    };

    chrome.tabs.onCreated.addListener(function(){
        removeContextMenus();
        createContextMenus();
    });

    chrome.contextMenus.onClicked.addListener(function(a, b){
        if(a.menuItemId === glo.contextMenus){
            // 选中文字，打开搜索
            if(a.selectionText && a.selectionText.trim() != ''){
                if(glo.opts.search=="1"){
                    open_new_tab("https://www.baidu.com/s?wd=" + encodeURIComponent(a.selectionText));
                }else if(glo.opts.search == "2"){
                    open_new_tab("https://www.google.com/search?q=" + encodeURIComponent(a.selectionText));
                }
            }
        }
    });



    // m3u8
    chrome.webRequest.onBeforeRequest.addListener(function(info){
            if(glo.opts.playhls){
                var playerurl = chrome.extension.getURL('player.html') + "?" + encodeURIComponent(info.url);
                chrome.tabs.update(info.tabId, {url: playerurl});
                return {cancel: true};
            }
        },
        {urls: ["*://*/*.m3u8*"], types:["main_frame"]},
        ['blocking']
    );

})();
