document.querySelector("#enabled").addEventListener("click", function() {
    toggleEnabled(false);
});

document.querySelector("#disabled").addEventListener("click", function() {
    toggleEnabled(true);
});

function toggleEnabled(status) {
    chrome.storage.sync.set({
        enabled: status
    })
    document.querySelector("#enabled").classList.toggle("hide", !status);
    document.querySelector("#disabled").classList.toggle("hide", status);
    changeUI(status)
}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true
    }, function(storage) {
        toggleEnabled(storage.enabled)
    });
}

function changeUI(input) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: input }, function(response) {
            return true;
        });
    });
}

document.addEventListener("DOMContentLoaded", restore_options);