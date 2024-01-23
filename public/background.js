
let isExtensionEnabled = false;

chrome.storage.local.get(['isEnabled'], function(result) {
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

  if(isAllowerd.isEnabled) {
    if (bannedUrls.some(url => details.url.includes(url))) {
      chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: blankOutPage
      });
  } 
  }


});

function blankOutPage() {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = 'white';
}