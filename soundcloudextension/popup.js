document.querySelectorAll("input, #running, #notrunning").forEach(event => {
    event.addEventListener("click", function() {
        if (event.id === "notrunning" || event.id === "running") {
            let repost = document.querySelector("#reposter").checked
            let features = document.querySelector("#featuring").checked
            butt = document.querySelector("button:not(.hide)").id
            butt === "running" ? enabled = false : enabled = true
            values = [enabled, repost, features]
            toggleEnabled(values)
        } else if (event.id === "reposter" || event.id === "featuring") {
            let repost = document.querySelector("#reposter").checked
            let features = document.querySelector("#featuring").checked
            butt = document.querySelector("button:not(.hide)").id
            butt === "running" ? enabled = true : enabled = false
            values = [enabled, repost, features]
            toggleEnabled(values, enabled)
        }
    })
})

function toggleEnabled(status, button = null) {
    chrome.storage.local.set({
        enabled: status[0],
        repost: status[1],
        features: status[2]
    })
    if (button === null) {
        chrome.storage.local.get(["enabled", "repost", "features"], function(result) {
            document.querySelector("#running").classList.toggle("hide", !status[0]);
            document.querySelector("#notrunning").classList.toggle("hide", status[0]);
            document.querySelector("#reposter").checked = status[1]
            document.querySelector("#featuring").checked = status[2]
        })
        sendValues(status)
    } else {
        document.querySelector("#reposter").checked = status[1]
        document.querySelector("#featuring").checked = status[2]
        sendValues(status)
    }


    let form = document.querySelectorAll("input");
    let repost = form.item(0).checked
    let features = form.item(1).checked
}

function loadOptions() {
    chrome.storage.local.get({
        enabled: false,
        repost: false,
        features: false
    }, function(storage) {
        values = [storage.enabled, storage.repost, storage.features]
        toggleEnabled(values)
    })
}

function sendValues(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { settings: [message[0], message[1], message[2]] });
    });

}
document.addEventListener("DOMContentLoaded", loadOptions);
