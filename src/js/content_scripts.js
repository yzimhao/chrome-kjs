/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 15:36:57
 * @version $Id$
 */
(function(){

    var loadjs = function(a){
        if(! document.getElementById("inject") ){
            var c = document.getElementsByTagName("head")[0];
            var sc = document.createElement("script");
            sc.id = "inject";
            sc.src = a;
            c.insertBefore(sc, c.firstChild)
        }
    };




    //前台发送消息
    chrome.extension.sendMessage({
        'type':'setting'
    });

    //前台接收消息
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

        if(request.domain){

            for(var i in request.domain){
                console.log(location.href, request.domain[i]);

                if( location.href.indexOf( request.domain[i] ) > -1 ){
                    
                    if(request.cache == 'no'){ //disable cache
                        if(request.inject.indexOf('?') > -1){
                            request.inject = request.inject + "&rnd=" + Math.random();
                        }else{
                            request.inject = request.inject + "?rnd=" + Math.random();
                        }
                        
                    }
                    loadjs(request.inject);
                    
                    break;
                }
            }
        }
    });



})()
