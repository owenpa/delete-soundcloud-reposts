let value;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function delRepost() {
    let stream = document.querySelector(".soundList__item");
    if (stream != null) {
        while (value === true) {
            let repost = document.querySelectorAll(".soundContext__repost")
            repost.forEach((post) => {
                post.closest(".soundList__item").remove()
            })
            await sleep(1000);
        }
    } else {
        await sleep(5000);
        delRepost()
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        value = request.greeting;
        sendResponse({ bye: "sent" });
        delRepost();
    }
);
