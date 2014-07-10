/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 17:06:42
 * @version $Id$
 */
function read_setting(){
    var domain = localStorage['domain'] || '';
    var inject = localStorage['inject'] || '';
    var cache = localStorage['cache'];

    return {
        inject: inject,
        cache: cache,
        domain: domain.split("<e>")
    }
}





//后台接收消息
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.type == 'setting'){
        var setting = read_setting();

        
        chrome.tabs.getSelected(null, function(tabs) {
            chrome.tabs.sendMessage(tabs.id, setting);
        });
    }

});
