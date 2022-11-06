document.querySelector("#running").addEventListener("click", function() {
    toggleEnabled(false);
});

document.querySelector("#notrunning").addEventListener("click", function() {
    toggleEnabled(true);
});
document.querySelectorAll("input").forEach(event => {
    event.addEventListener("click", function(e) {
        toggleEnabled(event.checked, "input")
    })
})

function toggleEnabled(status, inputs = null) {
    if (inputs != null) {
        butt = document.querySelector("button:not(.hide)").id
        butt === "running" ? status = true : status = false

        let form = document.querySelectorAll("input");
        let repost = form.item(0).checked
        let features = form.item(1).checked
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { settings: [status, repost, features] }, function(response) {
                return true;
            });
        });
    } else {
        chrome.storage.sync.set({
            enabled: status
        })
        document.querySelector("#running").classList.toggle("hide", !status);
        document.querySelector("#notrunning").classList.toggle("hide", status);
        let form = document.querySelectorAll("input");
        let repost = form.item(0).checked
        let features = form.item(1).checked

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { settings: [status, repost, features] }, function(response) {
                return true;
            });
        });
    }

}

function restore_options() {
    chrome.storage.sync.get({
        enabled: true
    }, function(storage) {
        toggleEnabled(storage.enabled)
    });
}

document.addEventListener("DOMContentLoaded", restore_options);
