/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 15:36:57
 * @version $Id$
 */
(function(){

    var creatlivereload = function(a){
        if(! document.getElementById("livereload") ){
            var c = document.getElementsByTagName("head")[0];
            var sc = document.createElement("script");
            sc.id = "livereload";
            sc.src = a;
            // document.body.appendChild(sc);
            c.insertBefore(sc, c.firstChild)
        }
        console.log("加载livereload");
    }



    //前台发送消息
    chrome.extension.sendMessage({'getsetting':'yes'}, function(response) {});

    //前台接收消息
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.setting && request.livereload){
            for(var i in request.setting){
                if(request.setting[i] == window.location.host){
                    creatlivereload( request.livereload );
                    break;
                }
            }
        }
    });



})()
