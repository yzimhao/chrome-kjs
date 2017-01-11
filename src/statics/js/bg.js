(function() {
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
    var mid = "kjs-menu-1";
    var createContextMenus = function() {
        chrome.contextMenus.create({
            id: mid,
            title: chrome.i18n.getMessage("search"),
            contexts: ["page", "frame", "selection", "link", "image", "video", "audio"],
            documentUrlPatterns: ["http://*/*", "https://*/*", "ftp://*/*"]
        })
    };
    chrome.runtime.onInstalled.addListener(function() {
        createContextMenus()
    });

    chrome.contextMenus.onClicked.addListener(function(a, b){
        if(a.menuItemId === mid){
            // 选中文字，打开百度搜索
            if(a.selectionText && a.selectionText.trim() != ''){
                open_new_tab("https://www.baidu.com/s?wd=" + encodeURIComponent(a.selectionText));
            }
        }
    });


})();
