
let isExtensionEnabled = false;

chrome.storage.local.get(['isEnabled'], function(result) {
    console.log(result.isEnabled);
    isExtensionEnabled = result.isEnabled ?? false;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.isEnabled) {
        isExtensionEnabled = changes.isEnabled.newValue;
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async function (details) {
  const bannedUrls = [
    'youtube.com/shorts/',
    'instagram.com/reels/',
    "tiktok.com/",
    "tiktok.com/@",
    "tiktok.com/en/",
  ];

  let isAllowerd = await chrome.storage.local.get("isEnabled");

  console.log(isAllowerd.isEnabled);

  if(isAllowerd.isEnabled) {
    if (bannedUrls.some(url => details.url.includes(url))) {
      chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: blankOutPage
      });
    } 

    if(details.url === "https://www.youtube.com/") {
      chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: removeReelsFromMainPage
      });
    }
  }
});

function blankOutPage() {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = 'white';
}

function removeReelsFromMainPage() {
  document.querySelector("#contents > ytd-rich-section-renderer:nth-child(3)").innerHTML = '';
  document.querySelector("#contents > ytd-rich-section-renderer:nth-child(5)").innerHTML = '';
  document.querySelector("#items > ytd-guide-entry-renderer:nth-child(2)").innerHTML = '';
}