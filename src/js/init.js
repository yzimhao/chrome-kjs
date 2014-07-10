/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 16:25:40
 * @version $Id$
 */
var DEBUG = true;


function TransferString(content, flag){
    var string = content;
    try{
        string=string.replace(/\r\n/g, flag)
        string=string.replace(/\n/g, flag);
    }catch(e) {}
    return string;
}

function save_setting(){
    var inject = $(".inject").val();
    var cache = $("input[name=cache]:checked").val();
    var domain = $(".domain").val();


    localStorage['inject'] = inject;
    localStorage['cache'] = cache;

    domain = TransferString(domain, '<e>');
    localStorage['domain'] = domain;

    if(DEBUG){
        console.log(localStorage);
    }
}

function read_setting(){
    $(".inject").val(localStorage['inject']);
    var cache = localStorage['cache'] || "no";

    $(".cache-"+ cache).attr('checked', true);



    var domain = localStorage['domain'];
    if(domain){
        domain = domain.replace(/\<e\>/g, "\r\n");
        $(".domain").val(domain);
    }

    if(DEBUG){
        console.log(localStorage);
    }
}






(function(w, $, undefined){

    $(".save").click(function(){
        console.log(this);
        save_setting();
    });



    //init
    if(localStorage['inject']){
        read_setting();
    }




})(window, jQuery)
