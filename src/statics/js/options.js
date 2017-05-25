console.log(glo.opts);

// Saves options to chrome.storage
function save_options() {
    var opts = {
        search: document.getElementById('search').value,
        playhls: document.getElementById('playhls').checked,
        newtabbeaut: document.getElementById('newtabbeaut').checked
    };

    chrome.storage.sync.set(opts, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);

        // 配置被修改，主动通知bg.js
        chrome.runtime.sendMessage({'type': 'update_opts', data: opts});
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get(glo.opts, function(items) {
        document.getElementById('search').value = items.search;
        document.getElementById('playhls').checked = items.playhls;
        document.getElementById('newtabbeaut').checked = items.newtabbeaut;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
