// 注入js
//

function setNewTabBg(url){
    var div;
    div = document.getElementById('chrome_kj_bg');
    if(!div){
        div = document.createElement('div');
        div.id = "chrome_kj_bg";
        div.style.opacity = 0.9
        div.style.zIndex = -1;
        div.style.position = "fixed";
        div.style.top = 0;
        div.style.width = "100%";
        div.style.height =  window.screen.height + 'px';
        document.body.appendChild(div);
    }
    div.style.backgroundImage = "url("+url+")";
    div.style.backgroundRepeat = "no-repeat"
    div.style.backgroundSize = "550px 550px"
    div.style.backgroundColor = "#000";
    div.style.backgroundPosition = "center center";
}

function getBg(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://raw.githubusercontent.com/yzimhao/chrome-kjs/dev/newtabimage/data.json?v="+ Math.random(), false);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            setNewTabBg(result.url);
        }
    };
    xhr.send();
}


function newTab(){
    if (window.location.href.indexOf('chrome/newtab') > -1){
        getBg();
        setInterval(function(){
            getBg();
        }, 60e3);

        var ctr = {
            isview: false,
            init: function(){
                var me = this,
                    div = document.getElementById('chrome_kj_bg');
                document.body.ondblclick = function(){
                    if(!me.isview){
                        div.style.zIndex = 9;
                        div.style.opacity = 1;
                        me.isview = true;
                    }else{
                        div.style.zIndex = -1;
                        div.style.opacity = 0.9;
                        me.isview = false;
                    }
                };
            }
        };
        ctr.init();

    }
}


(function(){
    chrome.runtime.sendMessage({type:'get_opts'}, function(response){
        if(response.newtabbeaut){
            newTab();
        }
    })
})()
