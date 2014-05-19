/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 17:06:42
 * @version $Id$
 */
function read_setting(){
    var s = localStorage['setting'] || '';
    return s.split("<e>");
}





//后台接收消息
chrome.extension.onMessage.addListener(function(req, sender, sendResponse) {
    var setting = read_setting();
    var livereload = localStorage['livereload'];


    if(req.getsetting == 'yes'){
        console.log("前端来获取setting");
        chrome.tabs.getSelected(null, function(tabs) {
            chrome.tabs.sendMessage(tabs.id, {'setting': setting, 'livereload': livereload}, function(){ });
        });
    }

});
