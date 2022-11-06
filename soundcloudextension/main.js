let deleteStatus;
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

async function delRepost(reposts = true, features = true) {
    let stream = document.querySelector(".soundList__item");
    if (stream != null) {
        if (reposts === true && features === true) {
            while (deleteStatus === true) {
                let repost = document.querySelectorAll(".soundContext__repost")
                repost.forEach((post) => {
                    post.closest(".soundList__item").remove()
                })
                await sleep(1000);
            }
        } else if (reposts === true && features === false) {
            while (deleteStatus === true) {
                let repost = document.querySelectorAll(".soundContext__repost")
                repost.forEach((post) => {
                    let reposter = post.previousElementSibling.textContent.toLowerCase()
                    let artist = post.closest(".sound").querySelector(".soundTitle__usernameText").textContent.toLowerCase()
                    if (artist.includes(reposter)) {
                        post.closest(".soundList__item").remove()
                    }
                })
                await sleep(1000);
            }
        } else if (reposts === false && features === true) {
            while (deleteStatus === true) {
                let repost = document.querySelectorAll(".soundContext__repost")
                repost.forEach((post) => {
                    let artist = post.previousElementSibling.textContent.toLowerCase();
                    if (post.closest(".visualSound") === null) {
                        let title = post.closest(".sound").querySelector(".soundTitle__title").textContent.toLowerCase();
                        if (title.includes(artist)) {
                            post.closest(".soundList__item").remove()
                        }
                    } else {
                        let title = post.closest(".visualSound").querySelector(".soundTitle__title").title.toLowerCase(); // for the songs with special backgrounds
                        if (title.includes(artist)) {
                            post.closest(".soundList__item").remove()
                        }
                    }
                })
                await sleep(1000);
            }
        } else if (reposts === false && features === false) {
            while (deleteStatus === true) {
                let repost = document.querySelectorAll(".soundContext__repost")
                repost.forEach((post) => {
                    let reposter = post.previousElementSibling.textContent.toLowerCase();
                    let artist = post.closest(".sound").querySelector(".soundTitle__usernameText").textContent.toLowerCase()
                    if (post.closest(".visualSound") === null) {
                        let title = post.closest(".sound").querySelector(".soundTitle__title").textContent.toLowerCase();
                        if (title.includes(reposter) || artist.includes(reposter)) {

                        } else {
                            post.closest(".soundList__item").remove()
                        }
                    } else {
                        let title = post.closest(".visualSound").querySelector(".soundTitle__title").title.toLowerCase();
                        if (title.includes(reposter) || artist.includes(reposter)) {

                        } else {
                            post.closest(".soundList__item").remove()
                        }
                    }
                })
                await sleep(1000);
            }
        }
    }
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        deleteStatus = request.settings[0]
        repostStatus = request.settings[1]
        featureStatus = request.settings[2]
        delRepost(repostStatus, featureStatus);
        sendResponse("sent")
    }
);
