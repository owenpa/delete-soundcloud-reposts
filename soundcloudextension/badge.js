chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.action.setBadgeText({ text: request.greeting.toString() });
        chrome.action.setBadgeBackgroundColor({ color: "#f8af45" })
    }
);
