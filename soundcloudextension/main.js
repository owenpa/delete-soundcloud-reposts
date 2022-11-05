/* The site is constantly refreshing as you scroll down.
 * We want to delete the class "soundList__item" after evaluating whether or not it is a repost (check extension settings as to whether or not to include tracks/playlists that the creator of the song is promoting, whether or not the person reposting is a feature on the song, and whether or not the application is even turned on, before deleting). Turning off/on the application will most likely prompt a refresh considering I don't know how to completely delete a listing, store it, restore it when the extension is disabled, and not blow up the ram
 */
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