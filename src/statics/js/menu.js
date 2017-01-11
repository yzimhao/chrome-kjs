// contextMenus
var link = chrome.contextMenus.create({
  "title": "链接地址",
  "contexts":["link"],
  "onclick": function(info, tab){
      console.log(info, tab);
  }
});
