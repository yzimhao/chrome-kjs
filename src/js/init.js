/**
 * 
 * @authors yzimhao (bbsey@foxmail.com)
 * @date    2014-05-19 16:25:40
 * @version $Id$
 */



function TransferString(content, flag){
    var string = content;
    try{
        string=string.replace(/\r\n/g, flag)
        string=string.replace(/\n/g, flag);
    }catch(e) {}
    return string;
}

function save_setting(setting){
    localStorage['setting'] = setting;
}

function read_setting(){
    return localStorage['setting'] || '';
}






(function(w, $, undefined){

    $(".livereload").live('blur', function(){
        localStorage['livereload'] = $(this).val();
    });

    $(".setting").live('blur', function(){
        var a = $(this).val();
        a = TransferString(a, '<e>');
        save_setting(a);
    })

    //初始化
    if(localStorage['livereload']){
        $(".livereload").val(localStorage['livereload']);
    }

    var s = read_setting();
    if( s ){
        s = s.replace(/\<e\>/g, "\r\n");
        $(".setting").val(s)
    }




})(window, jQuery)
