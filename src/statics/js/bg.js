(function() {
    var glo = {
        contextMenus: 'kjs-menu-1',
        iscreateMenu: false,
        iscloseMenu: false
    };

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type == 'tabinfo') {
            chrome.tabs.getSelected(null, function(tabs) {
                chrome.runtime.sendMessage({
                    'url': tabs.url,
                    'title': tabs.title,
                    'icon': tabs.favIconUrl
                });
            });
        }
    });

    var open_new_tab = function(url){
        chrome.tabs.create({
            url: url
        });
    };


    // contextMenus
    var createContextMenus = function() {
        if(!glo.iscreateMenu && !glo.iscloseMenu){
            chrome.contextMenus.create({
                id: glo.contextMenus,
                title: chrome.i18n.getMessage("search"),
                contexts: ["page", "frame", "selection", "link", "image", "video", "audio"],
                documentUrlPatterns: ["http://*/*", "https://*/*", "ftp://*/*"]
            }, function(){

            });
            glo.iscreateMenu = true;
        }
    };
    var removeContextMenus = function(){
        chrome.storage.sync.get(function(opts){
            if(opts.search == 0){
                glo.iscloseMenu = true;
                glo.iscreateMenu = false;
            }else{
                glo.iscloseMenu = false;
            }

            if(glo.iscloseMenu){
                chrome.contextMenus.remove(glo.contextMenus);
            }

            console.log(glo);
        });
    };

    chrome.tabs.onCreated.addListener(function(){
        removeContextMenus();
        createContextMenus();
    });

    chrome.contextMenus.onClicked.addListener(function(a, b){
        if(a.menuItemId === glo.contextMenus){
            // 选中文字，打开百度搜索
            if(a.selectionText && a.selectionText.trim() != ''){
                open_new_tab("https://www.baidu.com/s?wd=" + encodeURIComponent(a.selectionText));
            }
        }
    });



    // m3u8
    chrome.webRequest.onBeforeRequest.addListener(function(info){
            // var enable = true;
            chrome.storage.sync.get(function(opts){
                if(opts.playhls){
                    var playerurl = chrome.extension.getURL('player.html') + "?" + encodeURIComponent(info.url);
                    chrome.tabs.update(info.tabId, {url: playerurl});
                }
            });

            // if(enable){
            //     var playerurl = chrome.extension.getURL('player.html') + "?" + encodeURIComponent(info.url);
            //     chrome.tabs.update(info.tabId, {url: playerurl});
            //     return {cancel: true}
            // }
        },
        {urls: ["*://*/*.m3u8*"], types:["main_frame"]},
        ['blocking']
    );

})();
