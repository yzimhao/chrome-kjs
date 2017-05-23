// Saves options to chrome.storage
function save_options() {
  var search = document.getElementById('search').value;
  var playhls = document.getElementById('playhls').checked;
  chrome.storage.sync.set({
    search: search,
    playhls: playhls
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    search: 1, //默认百度
    playhls: true
  }, function(items) {
    document.getElementById('search').value = items.search;
    document.getElementById('playhls').checked = items.playhls;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
